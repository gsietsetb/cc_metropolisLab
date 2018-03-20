import {Car} from "./Car";

export interface ParkingInput {
    parking_info: ParkingInfo
    daily_cars: Car[]
    check_times: Date[]
}