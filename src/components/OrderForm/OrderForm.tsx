import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import cn from "classnames";
import { RootState } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import {
    EStatus,
    getCoords,
    getCrews,
    makeOrder,
    setAddress,
    setCrews,
    setCurrentCrew,
    setError,
} from "../../store/orderSlice";
import { ECodeError } from "../../api/interfaces";
import { ERRORS } from "../../api/constants";
import { debounce, getSourceTime } from "./OrederForm.sevices";
import MapComponent from "../MapComponent/MapComponent";
import CrewsList from "../CrewsList/CrewsList";
import TaxiIcom from "../../images/taxi.svg";

import "./OrderForm.scss";

const OrderForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { address, currentCrew, crews, errorCode, loading } = useSelector(
        (state: RootState) => state.order
    );

    const getCoordsByAddress = useCallback(
        debounce((adr: string) => {
            dispatch(getCoords(adr));
        }, 1000),
        []
    );

    useEffect(() => {
        currentCrew && dispatch(setCurrentCrew(null));
        crews.length && dispatch(setCrews([]));
        if (address.address) {
            const { coords, address: adr } = address;
            if (coords[0] && coords[1] && !errorCode) {
                dispatch(
                    getCrews({
                        addresses: [address],
                        source_time: getSourceTime(),
                    })
                );
            } else {
                !errorCode && getCoordsByAddress(adr);
            }
        }
    }, [address]);

    const handleAddressChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                setAddress({
                    address: e.target.value,
                    coords: [null, null],
                })
            );
            dispatch(setError(null));
        },
        []
    );

    const handleOrderClick = async () => {
        if (!errorCode) {
            if (!address.address) {
                return dispatch(setError(ECodeError.empty));
            }
            if (currentCrew) {
                dispatch(
                    makeOrder({
                        addresses: [address],
                        crew_id: currentCrew.crew_id,
                        source_time: getSourceTime(),
                    })
                );
            }
        }
    };

    return (
        <div>
            <h1 className="order_title">Детали заказа</h1>
            <div
                className={cn("order_input_wrap", {
                    order_error:
                        errorCode === ECodeError.empty ||
                        errorCode === ECodeError.address,
                })}
            >
                <label>Откуда</label>
                <div className="input_wrap">
                    {(errorCode === ECodeError.empty ||
                        errorCode === ECodeError.address) && (
                        <div className="error_message">{ERRORS[errorCode]}</div>
                    )}
                    <input
                        type="text"
                        onChange={handleAddressChange}
                        value={address.address}
                    />
                </div>
            </div>
            {currentCrew && (
                <div className="current_crew">
                    Подходящий экипаж:{" "}
                    <div className="crew_info">
                        <div>
                            <img src={TaxiIcom} alt="Taxi" />
                        </div>
                        <div>
                            <p className="crew_car_model">
                                {currentCrew.car_mark} {currentCrew.car_model}
                            </p>
                            <p className="crew_car_color">
                                {currentCrew.car_color}
                            </p>
                            <div className="crew_car_number">
                                {currentCrew.car_number}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="map_wrap">
                <div className="map">
                    <MapComponent />
                </div>
                <div className="order_crews">
                    <CrewsList />
                </div>
            </div>
            <div className="submit_order">
                <button
                    onClick={handleOrderClick}
                    disabled={!!errorCode || loading !== EStatus.succeeded}
                >
                    Заказать
                </button>
            </div>
        </div>
    );
};

export default OrderForm;
