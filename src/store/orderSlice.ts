import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    ECodeError,
    IAdress,
    ICar,
    ICrewsInfo,
    IOrder,
} from "../api/interfaces";
import { fetchAddress, fetchCoords, fetchCrews, fetchOrder } from "../api";

export enum EStatus {
    pending = "pending",
    succeeded = "succeeded",
    failed = "failed",
}

interface OrderState {
    address: IAdress;
    currentCrew: ICar | null;
    crews: ICar[];
    order: number | null;
    errorCode: ECodeError | null;
    loading: EStatus;
}

const initialState: OrderState = {
    address: {
        address: "",
        coords: [null, null],
    },
    currentCrew: null,
    crews: [],
    errorCode: null,
    loading: EStatus.succeeded,
    order: null,
};

export const getCrews = createAsyncThunk(
    "orders/fetchCrews",
    async (data: { source_time: string; addresses: IAdress[] }) => {
        const { source_time, addresses } = data;
        const response = await fetchCrews(source_time, addresses);
        return response.data;
    }
);

export const makeOrder = createAsyncThunk(
    "orders/fetchOrder",
    async (data: {
        source_time: string;
        addresses: IAdress[];
        crew_id: number;
    }) => {
        const { source_time, addresses, crew_id } = data;
        const response = await fetchOrder(crew_id, source_time, addresses);
        return response.data;
    }
);

export const getAddress = createAsyncThunk(
    "orders/fetchAddress",
    async (coords: [number, number]) => {
        const address = (await fetchAddress(coords))
            .split(", ")
            .slice(2)
            .join(", ");
        return { address, coords };
    }
);

export const getCoords = createAsyncThunk(
    "orders/fetchCoords",
    async (address: string) => {
        const coords = await fetchCoords(address);
        return { address, coords };
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setAddress(state, action: PayloadAction<IAdress>) {
            state.address = action.payload;
        },
        setCurrentCrew(state, action: PayloadAction<ICar | null>) {
            state.currentCrew = action.payload;
        },
        setCrews(state, action: PayloadAction<ICar[]>) {
            state.crews = action.payload;
        },
        setError(state, action: PayloadAction<number | null>) {
            state.errorCode = action.payload;
        },
        setLoading(state, action: PayloadAction<EStatus>) {
            state.loading = action.payload;
        },
        clearState() {
            return {
                ...initialState,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getCrews.fulfilled,
            (state, action: PayloadAction<ICrewsInfo>) => {
                state.loading = EStatus.succeeded;
                const sortedCrews = [...action.payload.crews_info].sort(
                    (a, b) => a.distance - b.distance
                );
                state.crews = sortedCrews;
                state.currentCrew = sortedCrews[0];
            }
        );
        builder.addCase(getCrews.pending, (state) => {
            state.loading = EStatus.pending;
            state.errorCode = null;
        });
        builder.addCase(getCrews.rejected, (state) => {
            state.loading = EStatus.failed;
            state.errorCode = ECodeError.crew;
        });

        builder.addCase(
            makeOrder.fulfilled,
            (state, action: PayloadAction<IOrder>) => {
                state.order = action.payload.order_id;
            }
        );
        builder.addCase(makeOrder.pending, (state) => {
            state.loading = EStatus.pending;
            state.errorCode = null;
        });
        builder.addCase(makeOrder.rejected, (state) => {
            state.loading = EStatus.failed;
            state.errorCode = ECodeError.order;
        });

        builder.addCase(
            getAddress.fulfilled,
            (
                state,
                action: PayloadAction<{
                    address: string;
                    coords: [number, number];
                }>
            ) => {
                state.loading = EStatus.succeeded;
                const { address, coords } = action.payload;
                if (!address) {
                    state.errorCode = ECodeError.coords;
                }
                state.address = {
                    address,
                    coords,
                };
            }
        );
        builder.addCase(getAddress.pending, (state) => {
            state.loading = EStatus.pending;
            state.errorCode = null;
        });
        builder.addCase(getAddress.rejected, (state) => {
            state.loading = EStatus.failed;
            state.errorCode = ECodeError.address;
        });

        builder.addCase(
            getCoords.fulfilled,
            (
                state,
                action: PayloadAction<{
                    address: string;
                    coords: [number, number] | null;
                }>
            ) => {
                state.loading = EStatus.succeeded;
                const { address, coords } = action.payload;
                if (!coords) {
                    state.errorCode = ECodeError.address;
                }
                state.address = {
                    address,
                    coords: coords ? coords : [null, null],
                };
            }
        );
        builder.addCase(getCoords.pending, (state) => {
            state.loading = EStatus.pending;
            state.errorCode = null;
        });
        builder.addCase(getCoords.rejected, (state) => {
            state.loading = EStatus.failed;
            state.errorCode = ECodeError.address;
        });
    },
});

export const {
    setAddress,
    setCurrentCrew,
    setCrews,
    setError,
    setLoading,
    clearState,
} = orderSlice.actions;

export default orderSlice.reducer;
