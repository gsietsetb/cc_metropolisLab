import {ParkingState} from "../App";
import {Car} from "./Car";

export interface GlobalInfo {
    parking_info: ParkingState
    daily_cars: Car
}