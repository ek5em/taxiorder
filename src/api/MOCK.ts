import { ICrewsInfo, IOrder, IResponse } from "./interfaces";
export const MOCK: {
    ORDER: IResponse<IOrder>;
    CREWS: IResponse<ICrewsInfo>;
} = {
    CREWS: {
        code: 0,
        descr: "OK",
        data: {
            crews_info: [
                {
                    crew_id: 123,
                    car_mark: "Chevrolet",
                    car_model: "Lacetti",
                    car_color: "синий",
                    car_number: "Е234КУ",
                    driver_name: "Деточкин",
                    driver_phone: "7788",
                    lat: 56.855532,
                    lon: 53.217462,
                    distance: 300,
                },
                {
                    crew_id: 125,
                    car_mark: "Hyundai",
                    car_model: "Solaris",
                    car_color: "белый",
                    car_number: "Ф567АС",
                    driver_name: "Петров",
                    driver_phone: "8899",
                    lat: 56.860581,
                    lon: 53.209223,
                    distance: 600,
                },
                {
                    crew_id: 127,
                    car_mark: "Toyota",
                    car_model: "Camry",
                    car_color: "черный",
                    car_number: "О789МН",
                    driver_name: "Иванов",
                    driver_phone: "5566",
                    lat: 56.858422,
                    lon: 53.218202,
                    distance: 450,
                },
                {
                    crew_id: 128,
                    car_mark: "Ford",
                    car_model: "Focus",
                    car_color: "серебристый",
                    car_number: "А123ВС",
                    driver_name: "Сидоров",
                    driver_phone: "6677",
                    lat: 56.857132,
                    lon: 53.213462,
                    distance: 500,
                },
                {
                    crew_id: 130,
                    car_mark: "Nissan",
                    car_model: "Qashqai",
                    car_color: "красный",
                    car_number: "К456ЕЕ",
                    driver_name: "Кузнецов",
                    driver_phone: "7788",
                    lat: 56.849532,
                    lon: 53.225562,
                    distance: 550,
                },
            ],
        },
    },
    ORDER: {
        code: 0,
        descr: "OK",
        data: {
            order_id: 12345,
        },
    },
};
