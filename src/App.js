import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

const GridItem = (props) => (
  <div className="grid__flex">
    <img className="grid__img" src={props.image} />
  </div>
)

class App extends Component {

  state = {
    error: null,
    isLoaded: false,
    items: []
  }

  async getAnime(query, variables) {
    try {
      const response = await axios.post('https://graphql.anilist.co', {
        query,
        variables
      });
      console.log(response)
      this.setState(() => ({
        isLoaded: true,
        items: response.data.data.Page.media
      }));
    } catch (error) {
      this.setState(() => ({ error }))
    }
  }

  componentDidMount() {

    const query = `
    query {
      Page {
        media(
          isAdult: false
          sort: POPULARITY_DESC
        ) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
        }
      }
    }
    `;
    const variables = {};

    this.getAnime(query, variables)
  }

  render() {

    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>{error.message}</div>;
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
