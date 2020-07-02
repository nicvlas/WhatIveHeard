// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator, StatusBar } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'

class Search extends React.Component {
  constructor(props){
      super(props)
      this.searchedText = "", // Initialisation de notre donnée searchedText dans le state
      this.state = {
          films: [],
          isLoading: false // false par défaut car pas de chargement à faire
        }
  }

    _searchTextInputChanged(text) {
      this.searchedText = text 
    }

    _searchFilms() {
      this.page = 0
      this.totalPages = 0
      this.setState({
        films: [],
      }, () => {
          this._loadFilms()
      })
    }

    _loadFilms() {
      if (this.searchedText.length > 0) {
        this.setState({ isLoading: true })
        getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
            this.page = data.page
            this.totalPages = data.total_pages
            this.setState({
              films: [ ...this.state.films, ...data.results ],
              isLoading: false
            })
        })
      }
    }

    _displayLoading(){
      if (this.state.isLoading){
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large'/>
          </View>
        )
      }
    }

    _displayDetailForFilm = (idAlbum) => {
      console.log("Display album with id " + idAlbum)
      this.props.navigation.navigate("AlbumDetail", { idAlbum: idAlbum })
    }

    render() {
      //console.log(this.state)
        return (
            //on rend à l'écran ces éléments
            <View style={styles.main_container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
              <TextInput
                style={styles.textinput}
                placeholder='Nom de l&#39;album'
                onChangeText={(text) => this._searchTextInputChanged(text)}
                onSubmitEditing={() => this._searchFilms()}
              />
              <Button
                title='Rechercher'
                onPress={() => this._searchFilms()}
              />
              <FlatList
                  data={this.state.films}
                  // On utilise la prop extraData pour indiquer à notre FlatList que d’autres données doivent être prises en compte si on lui demande de se re-rendre
                  extraData={this.props.favoritesFilm}
                  keyExtractor={(item) => item.collectionId.toString()}
                  renderItem={({item}) =>
                    <FilmItem
                      film={item}
                      isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.collectionId === item.collectionId) !== -1) ? true : false}
                      displayDetailForFilm={this._displayDetailForFilm} />}
                  onEndReachedThreshold={0.5}
                  onEndReached={() => {
                  console.log("onEndReached")
                  }}
              />
              {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  textinput: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
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

export default connect(mapStateToProps)(Search)