// Components/Settings.js

import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

class Settings extends React.Component {

    render() {
        return(
            <View style={styles.main_container}>
              <View style={styles.btn}>
                <TouchableOpacity>
                  <Button title="Je souhaite supprimer mes données" onPress={() => AsyncStorage.clear()} type="outline"></Button>
                </TouchableOpacity>
              </View>
                <View style={styles.wrap}>
                    <Text style={styles.textinput}>© Copyright Nicolas Vite</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  wrap: {
      flex: 1,
  },
  btn: {
    marginTop: 150,
  },
  textinput: {
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

// On connecte le store Redux, ainsi que les films favoris du state au component Search
const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Settings)