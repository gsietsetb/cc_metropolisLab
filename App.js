import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import type {ParkingState} from "./model/ParkingState";
import type {Car} from "./model/Car";

const input_ex = require('input_ex');

export interface AppProps {

}

export interface AppComponentState {
    parkedCars: Car[]
    freeSlots: ParkingState
    outuputJSON: string
}

export function getFreeSpotsOfKindAtTime(kind: string, timeCheck: Date): number {
    /**First we get the initial free slots*/
    let currentFreeSlots = this.state.freeSlots;

    /**Then we update it with the ones parked in the kind of spot (small/medium/big)*/
    this.state.parkedCars
        .filter( carParked => carParked.type !== kind)
        .filter( carParked => carParked.entry_time+carParked.stay_time < timeCheck)
        .forEach(currentFreeSlots--);

    return currentFreeSlots
}

export default class App extends Component<AppProps, AppComponentState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            parkedCars: null,
            freeSlots: null,
        }
    }

    async componentWillMount(): Promise<void> {
        let result = JSON.parse(input_ex);
        // let parkedCars: Car[];
        let outputJson: string[] = "";

        /**Updates initial parking slots state*/
        this.setState({freeSlots: result.parking_info});

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
                                this.setState({parkedCars: this.state.parkedCars.push(carItem)});
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
                                this.setState({parkedCars: this.state.parkedCars.push(carItem)});
                                outputJson += carItem.id + ', ';
                                break;
                            }
                        }
                        case "big": {
                            if(getFreeSpotsOfKindAtTime("big",timeCheck) > 0){
                                /**We update the car type to 'big' even if it was 'small' or 'medium' so it matches the check afterwards*/
                                carItem.type = "big";
                                /**Assign a big car to a big slot*/
                                this.setState({parkedCars: this.state.parkedCars.push(carItem)});
                                outputJson += carItem.id + ', ';
                                break;
                            }
                        }
                    }
                });
        });

        this.setState({outputJson: outputJson})
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <Text>{this.state.outuputJSON}</Text>
                <Text>Shake your phone to open the developer menu.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
