import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';


export interface AppProps {
    navigation: any
    user: IUser
    city: ICity
    dispatch: Function
}
export interface AppComponentState {
    isLoading: boolean
    redirectTo: string
    webViewUrl: string
}


export default class App extends Component<AppProps, AppComponentState> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
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
