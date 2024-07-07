export interface IResponse<T> {
    code: number;
    descr: string;
    data: T;
}

export interface ICar {
    crew_id: number;
    car_mark: string;
    car_color: string;
    car_model: string;
    car_number: string;
    driver_name: string;
    driver_phone: string;
    lat: number;
    lon: number;
    distance: number;
}

export interface IOrder {
    order_id: number;
}

export interface ICrewsInfo {
    crews_info: ICar[];
}

export interface IAdress {
    address: string;
    coords: [number, number] | [null, null];
}

export enum ECodeError {
    crew = 1,
    order,
    address,
    coords,
    empty
}
