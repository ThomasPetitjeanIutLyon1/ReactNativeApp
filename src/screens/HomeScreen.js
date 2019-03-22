import React, { Component } from 'react'
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { Text, Searchbar, ActivityIndicator } from 'react-native-paper';
import SuperHeroList from '../components/SuperHeroList';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        offset:0,
        listCharac: [],
        query: '',
        isSearchActive: false,  
        isLoading: true
    };
  }

  handleInputChange = (searchValue) => {
    var emptyList = [];
    if (searchValue === undefined || searchValue === "") {
      this.setState({
        isSearchActive: false,
        offset: 0,
        query: searchValue,
        listCharac: emptyList
      }, () => {        
        this.getAllHeroes();
      })
    } else {
      this.setState({
        query: searchValue,
        isSearchActive: true
      }, () => {
        this.getHeroesByQuery();
      }) 
    }
  }

  // REQUETES API
  componentDidMount() {
    this.getAllHeroes();
  }

  getHeroesByQuery(){
    fetch('https://gateway.marvel.com/v1/public/characters?nameStartsWith=' + this.state.query + '&apikey=02ee3d93e987a3a5be62d77604e7d8da' + '&limit=30', {
      headers: {
        Referer: 'localhost'
      }
    }).then(responseJson =>
      responseJson.json()
 ).then(json => 
  this.setState({
    listCharac: json.data.results
  })
  )
}

getAllHeroes() {
  console.log("getAllHeroes")
  fetch('https://gateway.marvel.com/v1/public/characters?apikey=02ee3d93e987a3a5be62d77604e7d8da' + "&offset=" + this.state.offset, {
    headers: {
      Referer: 'localhost'
    }
  }).then(responseJson =>
     responseJson.json()
).then(json =>
  this.setState({
    isLoading: false,      
    listCharac: this.state.listCharac ? this.state.listCharac.concat(json.data.results) : json.data.results
  })
);
}

loadMore() {
  if (this.state.isSearchActive === false) {
      this.getAllHeroes();

      this.setState({
        offset: this.state.offset + 20
      })
  }
  
}


  render() {
    var styles = StyleSheet.create({
      loader: {
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          flex:1,
          alignItems:'center',
          justifyContent: 'center'
      }
    })

    var queryHasResults;
    if(this.state.listCharac.length === 0) {
      queryHasResults = false;
    } else {
      queryHasResults = true;
    }

    if (this.state.isLoading){
      return <ActivityIndicator animating={true} style={styles.loader} />
   }
      
    return (
      <ScrollView stickyHeaderIndices={[0]}>

        <View>
            <Searchbar
              placeholder="Rechercher"
              onChangeText={ query => { this.handleInputChange(query); }  }
              ref={input => this.search = input}
            />
        </View>

        <SuperHeroList
        list = {this.state.listCharac}
        navigation = {this.props.navigation}
        onPress = {() => this.props.navigation.navigate('Details', {
          charac: charac
         })}
        />
        
        {queryHasResults === false &&
            <View style={styles.loader}>
              <Text>Aucun résultat trouvé</Text>
            </View>
        }

      </ScrollView>
    )
  }

}

export default HomeScreen;
