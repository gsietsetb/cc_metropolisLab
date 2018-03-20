import type {Car} from "../model/Car";

export let parkedCars: Car[] = "";
const input_ex = require('input_ex');
let result = JSON.parse(input_ex);

export function checkParkingSlot(): string {
    let outputJson: string[] = "";

    /**For each timeslot to check*/
    result.check_times.forEach((index, timeCheck) => {
        outputJson[index] += timeCheck + ' - ';
        /**For each car who enters before the checktime*/
        result.daily_cars
            .filter( carItem => carItem.entry_time > timeCheck)
            .forEach((carItem) => {
                switch (carItem.type){
                    case "small": {
                        if(getFreeSpotsOfKindAtTime("small",timeCheck) > 0) {
                            /**Assign a small car to a small slot*/
                            parkedCars.push(carItem);
                            outputJson += carItem.id + ', ';
                            break;
                        }
                        /**else: Intentionally don't break() so it continues the flow*/
                    }
                    case "medium": {
                        if(getFreeSpotsOfKindAtTime("medium",timeCheck) > 0) {
                            /**We update the car type to 'medium' even if it was 'small' so it matches the check afterwards*/
                            carItem.type = "medium";
                            /**Assign a medium car to a medium slot*/
                            parkedCars.push(carItem);
                            outputJson += carItem.id + ', ';
                            break;
                        }
                    }
                    case "big": {
                        if(getFreeSpotsOfKindAtTime("big",timeCheck) > 0){
                            /**We update the car type to 'big' even if it was 'small' or 'medium' so it matches the check afterwards*/
                            carItem.type = "big";
                            /**Assign a big car to a big slot*/
                            parkedCars.push(carItem);
                            outputJson += carItem.id + ', ';
                            break;
                        }
                    }
                }
            });
    });
    return outputJson
}

export function getFreeSpotsOfKindAtTime(kind: string, timeCheck: Date): number {
    /**First we get the initial free slots*/
    let currentFreeSlots = result.;

    /**Then we update it with the ones parked in the kind of spot (small/medium/big)*/
    parkedCars
        .filter( carParked => carParked.type !== kind)
        .filter( carParked => carParked.entry_time+carParked.stay_time < timeCheck)
        .forEach(currentFreeSlots--);

    return currentFreeSlots
}