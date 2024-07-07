import { DELAY } from "./constants";
import { IAdress, ICrewsInfo, IOrder, IResponse } from "./interfaces";
import { MOCK } from "./MOCK";

export const fetchCrews = async (
    source_time: string,
    addresses: IAdress[]
): Promise<IResponse<ICrewsInfo>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK.CREWS);
        }, DELAY.CREWS);
    });
};

export const fetchOrder = async (
    crew_id: number,
    source_time: string,
    adresses: IAdress[]
): Promise<IResponse<IOrder>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK.ORDER);
        }, DELAY.ORDER);
    });
};

export const fetchCoords = async (
    address: string
): Promise<[number, number] | null> => {
    const geocode = await window.ymaps.geocode(address);
    const firstGeoObject = geocode.geoObjects.get(0);
    if (firstGeoObject && firstGeoObject.geometry) {
        const geometry = firstGeoObject.geometry as any;
        const metaData = firstGeoObject.properties.get(
            "metaDataProperty",
            {}
        ) as {
            GeocoderMetaData?: { kind?: string };
        };

        const kind = metaData?.GeocoderMetaData?.kind;
        if (kind === "house" || kind === "street") {
            const coords = geometry.getCoordinates();
            return coords;
        }
    }
    return null;
};

export const fetchAddress = async (
    coords: [number, number]
): Promise<string> => {
    const geocode = await window.ymaps.geocode(coords);
    const firstGeoObject = geocode.geoObjects.get(0) as any;
    const address = firstGeoObject.getAddressLine();
    return address;
};
