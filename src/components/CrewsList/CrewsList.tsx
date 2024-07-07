import React from "react";
import cn from "classnames";
import { useAppSelector } from "../../store/hooks";
import { EStatus } from "../../store/orderSlice";
import TaxiIcon from "../../images/taxi.svg";

import "./CrewsList.scss";

const CrewsList: React.FC = () => {
    const { crews, loading } = useAppSelector((state) => state.order);

    if (crews.length) {
        return (
            <ul className="crew_list">
                {crews.map((crew) => (
                    <li key={crew.crew_id}>
                        <img src={TaxiIcon} alt="Taxi" />
                        <div className="crew_info">
                            <div>
                                <p className="crew_car_model">
                                    {crew.car_mark} {crew.car_model}
                                </p>
                                <p>{crew.car_color}</p>
                            </div>
                            <div className="crew_distance">
                                <span>{crew.distance} м</span>{" "}
                                <span className="arrow">{">"}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className={cn("crew_list", "empty")}>
            {loading === EStatus.succeeded ? (
                <p>Пожалуйста, введите адрес или выберите точку на карте</p>
            ) : (
                <div className="loader" />
            )}
        </div>
    );
};

export default CrewsList;
