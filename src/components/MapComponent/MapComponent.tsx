import React, { useCallback } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAddress } from "../../store/orderSlice";
import { ECodeError } from "../../api/interfaces";
import PlaceMarkerRed from "../../images/place-marker-red.svg";
import PlaceMarkerOrange from "../../images/place-marker-orange.svg";
import TaxiMarker from "../../images/taxi-marker.svg";

const width = "100%";
const height = 500;

const MapComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { crews, address, errorCode } = useAppSelector(
        (state) => state.order
    );

    const handleMapClick = useCallback((e: any) => {
        const coords = e.get("coords") as [number, number];
        dispatch(getAddress(coords));
    }, []);

    return (
        <YMaps>
            <Map
                defaultState={{ center: [56.852676, 53.2069], zoom: 14 }}
                onClick={handleMapClick}
                height={height}
                width={width}
            >
                {crews.map((crew) => (
                    <Placemark
                        key={crew.crew_id}
                        geometry={[crew.lat, crew.lon]}
                        options={{
                            iconLayout: "default#image",
                            iconImageHref: TaxiMarker,
                            iconImageSize: [35, 40],
                            iconImageOffset: [-15, -42],
                        }}
                    />
                ))}
                {address.address && (
                    <Placemark
                        geometry={address.coords}
                        options={{
                            iconLayout: "default#image",
                            iconImageHref: PlaceMarkerOrange,
                            iconImageSize: [30, 42],
                            iconImageOffset: [-16, -38],
                        }}
                    />
                )}
                {errorCode === ECodeError.coords && (
                    <Placemark
                        geometry={address.coords}
                        options={{
                            iconLayout: "default#image",
                            iconImageHref: PlaceMarkerRed,
                            iconImageSize: [30, 42],
                            iconImageOffset: [-16, -38],
                        }}
                    />
                )}
            </Map>
        </YMaps>
    );
};

export default MapComponent;
