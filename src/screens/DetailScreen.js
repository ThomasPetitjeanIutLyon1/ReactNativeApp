import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";
import ComicDescription from "../Components/ComicDescription";
import Carousel from "react-native-snap-carousel";
import { Image } from "react-native-elements";

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://gateway.marvel.com:443/v1/public/characters/",
      apiKey: "?apikey=6a67faed22e2c578c2744e2b0ab8c3fd", //ATTENTION A NE PAS PUSHER
      datas: {
        picUrl:
          "https://images-na.ssl-images-amazon.com/images/I/41XX8Bzd4vL._SX425_.jpg",
        title: "Captain America",
        description: "The first avenger"
      },
      character: undefined,
      charaLoaded: false,
      comicsLoading: false,
      comicImgs: [],
      comics: []
    };
  }

  componentDidMount() {
    this.fetchCharacter();
  }

  async fetchCharacter() {
    let carac = this.props.navigation.getParam("charac");
    console.log("async", carac.id);
    await fetch(this.state.url + carac.id + this.state.apiKey, {
      headers: {
        Referer: "localhost"
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          character: json.data.results,
          charaLoaded: true
        });
      });
  }

  fetchComic(comics) {
    this.setState({ comicsLoading: true });
    comics.map(async item => {
      await fetch(item.resourceURI + this.state.apiKey, {
        headers: {
          Referer: "localhost"
        }
      })
        .then(response => response.json())
        .then(json =>
          json.data.results[0].images.map(img => {
            this.setState({
              comicImgs: this.state.comicImgs.concat(
                img.path + "." + img.extension
              )
            });
          })
        );
    });
  }

  clickBack = () => {
    this.props.navigation.navigate("Home");
  };

  _renderItem({ item, index }) {
    console.log("items", item);

    return (
      <View>
        <Image source={{ uri: item }} style={{ width: 250, height: 250 }} />
      </View>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.character != this.state.character &&
      this.state.character != undefined
    ) {
      if (
        Object.keys(this.state.character).length != 0 &&
        this.state.comicsLoading === false
      ) {
        this.fetchComic(this.state.character[0].comics.items);
      }
    }
  }

  render() {
    console.log("state", this.state.character);

    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ComicDescription
          character={
            this.state.character != undefined ? this.state.character : {}
          }
        />

        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.comicImgs}
          renderItem={this._renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width - 150}
        />
      </View>
    );
  }
}

export default DetailScreen;
