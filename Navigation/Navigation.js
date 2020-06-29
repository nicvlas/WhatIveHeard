// Navigation/Navigation.js
import React from 'react' 
import {StyleSheet, Image } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import Search from '../Components/Search'
import AlbumDetail from '../Components/AlbumDetail'
import Favorites from '../Components/Favorites'
import Settings from '../Components/Settings'

/**
 * Vues pages search
 */
const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  AlbumDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
    screen: AlbumDetail,
    navigationOptions:{
      title: "Détails"
    }
  },
})

/** Vue Listened */
const ListenedStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions:{
      title: "Albums écoutés"
    }
  }
})

/** Vue Settings */
const SettingsStackNavigator = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions:{
      title: "Paramètres"
    }
  }
})

/** Bottom bars  */
const AlbumTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
        return <Image
          source={require('../Images/ic_search.png')}
          style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
      }
    }
  },
  Favorites: {
    screen: ListenedStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/ic_listened.png')}
          style={styles.icon}/>
      }
    }
  },
  Settings: {
    screen: SettingsStackNavigator,
    navigationOptions:{
      tabBarIcon: () => {
        return <Image
          source={require('../Images/settings.png')}
          style={styles.icon}/>
      }
    }
  }
},
{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
    inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
    showLabel: false, // On masque les titres
    showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
  }
},
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})


export default createAppContainer(AlbumTabNavigator)