// Components/Favorites.js

import React from 'react'
import { StyleSheet, Image, AsyncStorage, View, Fragment, TouchableOpacity, Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listened: [],
      isLoading: true,
    }
  }

  clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }

  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      
      //console.log(result)
      //le state prend les noms des albums
      this.setState({listened: result.map(req => (req[1]))});
    } catch (error) {
      console.error(error)
    }
  }

  componentDidMount(){
    this.importData();
  }

  /**
   * Rend les pochettes et update le component à chaque load
   */
  renderArtwork() {
    this.componentDidMount()
    if(AsyncStorage.getAllKeys() != false)
    {
      return this.state.listened.map((url) => (
        <>
        <Image
          style={{
            width: 160,
            height: 160,
          }}
          source={{
            uri: url = url.replace('100x100bb', '600x600bb'),
          }}
        />
        <Text>{}</Text>
        </>
      ));
    }
    else{
      return(
        <>
        <Text>{'Aucun album écouté'}</Text>
        </>
      );
    }
  }
  
  render() {
    return(
      <View style={styles.main_container}>
        <ScrollView>
          {this.renderArtwork()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container:{
    marginTop: 2
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.listened
  }
}

export default connect(mapStateToProps)(Favorites)