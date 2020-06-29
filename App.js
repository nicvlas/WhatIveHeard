// App.js

import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

import { AsyncStorage, View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Navigation/>
      </Provider>
      
      /*
      <View style={styles.container}>
        <TouchableOpacity onPress={this.saveData}>
          <Text>Click me to save data</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.importData}>
          <Text>Click me to display data</Text>
        </TouchableOpacity>
      </View>
      */
    )
  }
  saveData(){
    let user = "John Doe";
    AsyncStorage.setItem('user', user)

    let user2 = "Nicolas Vite";
    AsyncStorage.setItem('user2', user2);

  }

  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
  
      return result.map(req => JSON.stringify(req)).forEach(console.log);
    } catch (error) {
      console.error(error)
    }
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

