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

  getAnime = async (query, variables) => {
    try {
      const response = await axios.post('https://graphql.anilist.co', {
        query,
        variables
      });

      // Log the response so we can look at it in the console
      console.log(response.data)

      // Set the data to the state
      this.setState(() => ({
        isLoaded: true,
        items: response.data.data.Page.media
      }));

    } catch (error) {
      // If there's an error, set the error to the state
      this.setState(() => ({ error }))
    }
  }

  componentDidMount() {

    // This is the GraphQL query
    const query = `
    query {
      Page {
        media(isAdult: false, sort: POPULARITY_DESC) {
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

    // These variables are optional, leave empty for now
    const variables = {};

    // We call the method here to execute our async function
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
