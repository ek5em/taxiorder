import { ECodeError } from "./interfaces";

export const DELAY = {
    CREWS: 1200,
    ORDER: 1000,
};

export const ERRORS = {
    [ECodeError.crew]: "Ошибка при загрузке экипажей",
    [ECodeError.order]: "Ошибка при создании заказа",
    [ECodeError.address]: "Неверный адрес",
    [ECodeError.empty]: "Это поле обязательное",
    [ECodeError.coords]: "Укажите более точный адрес",
};
