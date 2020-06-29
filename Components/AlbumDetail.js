// Components/FilmDetail.js

import React from 'react'
import { Button, StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

class AlbumDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      album: undefined,
      isLoading: true
    }
  }

  //#region FONCTIONS

  getAlbumDetailFromApi(id) {
    return fetch('https://itunes.apple.com/lookup?id='+this.props.navigation.state.params.idAlbum)
      .then(response => response.json())
      .then(data => {
        // set the state here 
        this.setState({album: data.results[0]})
        })
    .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getAlbumDetailFromApi(this.props.navigation.state.params.idAlbum);
  }

  componentDidUpdate() {
    console.log("componentDidUpdate : ")
    console.log(this.props.favoritesFilm)
  }

  _toggleFavorite() {
    // l'album sélectionné sera l'album mis dans le tableau d'albums favoris
    const action = { type: "TOGGLE_FAVORITE", value: this.state.album }
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    //Par défaut, l'album n'est pas favoris
    var sourceImage = require('../Images/ic_favorite_border.png')
    // Si l'id de l'album dans le tableau correspond à l'id de l'album affiché
    if (this.state.findIndex(item => item.collectionId === this.state.album.collectionId) !== -1) {
      // Affichage de l'icône correspondant à un favoris
      sourceImage = require('../Images/ic_favorite.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
  }

  /**
   * Enregistre un album dans le stockage du téléphone
   * @param {*ID de l'album} idAlbum 
   * @param {*Nom de l'album} nameAlbum 
   */
  saveListenedAlbum(idAlbum, nameAlbum){
    let id = idAlbum.toString()
    var name = nameAlbum.toString()
    AsyncStorage.setItem(id, name)
  }

  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      
      console.log(result)
      //return result.map(req => JSON.stringify(req)).forEach(console.log);
    } catch (error) {
      console.error(error)
    }
  }

  async checkListened(idAlbum){
    let context = this;
    const check = false;
    try {
       let value = await AsyncStorage.getItem(idAlbum);
       if (value != null){
         check = true;
       }
       else {
          check = false;
      }

      return check;
    } catch (error) {
        console.log(error);
    }
}

  renderAlbum() {
    // si on a un album, on le display 
    if (this.state.album) {
      var pochetteSD = this.state.album.artworkUrl100
      var pochetteHD = pochetteSD.replace('100x100bb', '600x600bb')

      var annee = this.state.album.releaseDate
      var anneeshorter = String(annee).substr(0,4) // substring de l'année

      if (this.state.album.collectionExplicitness == "explicit"){
        var explicit = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABDUlEQVRoge2ZQQ6CMBBFn8al8QR6IiEcypB4IncqB/A0wh4XhAQIhNa"+
                      "WdtLMS2bDgv7HpAMpoCjKvxRABTRAG7ka4A3kthJ3AeGXqjSVKASEXavMRKQSEHStXtPQuxmRGjiaGEekBk7DC3MibZgszoyy72Ol8I2KDHgAF7pWu5R3bCfIOdK6I3xsdl9P02ndZPbIYYN7RhnfyXR"+
                      "ERaShItJIRmSL8Wv6gvQ6ppPpiIpIQz9RpKEi0lARaSQjEvMTZYrT2E6mIz5EfB0Hecf2fKk/oAu97gg9xJZG0iJN8BT2fKcX5kQ+AYK4YpQxJ/4/wrW6mhqXAsIu1c1Uoiej+3taCwhfA08sOqEoypgf62dPTUWsMGIAAAAASUVORK5CYII="
      }
      else{
        var explicit = ""
      }

      //console.log(typeof(this.state.album.collectionId.toString()))

      return (
        <ScrollView>
          <Image style={styles.image} source={{uri: pochetteHD}} />
          <Text> {this.state.album.collectionName} <Image style={styles.tiny_logo} source={{uri: explicit}}/> </Text>
          <Text> {this.state.album.artistName}</Text>
          <Text> {this.state.album.trackCount} pistes</Text>
          <Text> {anneeshorter}</Text>

          <Button
            title="J&#39;ai écouté cet album"
            onPress={() => this.saveListenedAlbum(this.state.album.collectionName, this.state.album.artworkUrl100)}>
          </Button>

        </ScrollView>
      );
    }
  }
  
  //#endregion


  render() {
    //console.log('state', this.state);
    //console.log(this.props)
    return (
    <View style={styles.container}>
        {this.renderAlbum()}
    </View>
  );
  }
  
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  favorite_container: {
    alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 200,
    width: 200,
    margin: 5
  },
  tiny_logo: {
    height: 10,
    width: 10
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_image: {
    width: 40,
    height: 40
  },
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(AlbumDetail)