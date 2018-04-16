import React, { Component } from 'react';
import './App.css';

import { api } from './utils/api';

const GridItem = (props) => (
  <div className="grid__flex">
    <img className="grid__img" src={props.image} />
  </div>
)

class App extends Component {

  state = {
    isLoaded: false,
    items: []
  }

  componentDidMount() {
    api.getAnime().then((anime) => {

      console.log(anime)

      this.setState(() => ({
        isLoaded: true,
        items: anime.Page.media
      }))

    }).catch((error) => {
      console.log(error)
    });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="grid">
          {items.map(item => (
            <GridItem key={item.id} image={item.coverImage.large} />
          ))}
        </div>
      );
    }
  }

}

export default App;
