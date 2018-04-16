var query = `
query {
  Page {
    media(
      isAdult: false
      seasonYear: 2018
      season: SPRING
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

var variables = {};

var payload = {
  query: query,
  variables: variables
};

export const api = {
  getAnime: async function() {
    try {
      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });
      const parsedResponse = await response.json();
      return parsedResponse.data;
    } catch (error) {
      throw new Error(error);
    }
  }
};
