import React, { useCallback } from "react";

import "./OrderConfirmModal.scss";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks";
import { clearState } from "../../store/orderSlice";
const OrderConfirmModal: React.FC = () => {
    const { currentCrew, order } = useSelector(
        (state: RootState) => state.order
    );

    const dispatch = useAppDispatch();

    const handlSubmit = useCallback(() => {
        dispatch(clearState());
    }, []);
    if (currentCrew && order) {
        const { car_color, car_mark, car_model, car_number, driver_name } =
            currentCrew;
        return (
            <div className="modal">
                <div className="modal_confirm">
                    <h2>Ваш заказ №{order}</h2>
                    <p>
                        Водитель {driver_name} подъедет через пару минут на{" "}
                        {car_color} {car_mark} {car_model} с номером{" "}
                        {car_number} <br /> <span>Ожидайте</span>
                    </p>
                    <button onClick={handlSubmit}>Ок</button>
                </div>
            </div>
        );
    }
    return <></>;
};

export default OrderConfirmModal;
