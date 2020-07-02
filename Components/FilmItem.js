// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { displayDetailForFilm } from './Search'

class FilmItem extends React.Component {

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      )
    }
  }

  render() {
      const { film, displayDetailForFilm } = this.props
      const albums = this.props.film

      //console.log(this.props)
      var annee = albums.releaseDate
      var shorter = String(annee).substr(0,4) // substring de l'année

      var pochetteSD = albums.artworkUrl100
      var pochetteHD = pochetteSD.replace('100x100bb', '600x600bb')


      //console.log(pochetteHD)
      return (
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailForFilm(film.collectionId)}
        >
          <Image
            style={styles.image}
            source={{uri: pochetteHD}}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
            {this._displayFavoriteImage()}
              <Text style={styles.title_text}> {albums.collectionName} </Text>
            </View>
            <View style={styles.description_container}>
              <Text numberOfLines={6}>{albums.artistName}</Text>
              <Text numberOfLines={6}>{albums.trackCount} pistes</Text>
              <Text style={styles.description_text} numberOfLines={6}>{albums.primaryGenreName}</Text>

              {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>Sorti en {shorter}</Text>
            </View>
          </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})

export default FilmItem