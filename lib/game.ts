import { getStaticPropsForTina, gql } from "tinacms";

export const getGame = async (filename: string) => {
  return await getStaticPropsForTina({
    query: gql`
      query GetGameDocument($relativePath: String!) {
        getGameDocument(relativePath: $relativePath) {
          data {
            name
            deck
            status
            sections {
              __typename
              ... on GameSectionsDetails {
                content
                learnMoreLink
                dateReleased
                averagePlaytime
                averageRating
              }
              ... on GameSectionsBacklog {
                content
                interest
              }
              ... on GameSectionsReview {
                content
                dateFinished
                playtime
                stars
              }
            }
            boxart
            meta {
              medium
              platform
              genre
            }
          }
        }
      }
    `,
    variables: { relativePath: `${filename}.md` },
  });
};

export const getGames = async () => {
  return await getStaticPropsForTina({
    query: gql`
      query getGameList {
        getGameList {
          edges {
            node {
              sys {
                collection {
                  slug
                }
                breadcrumbs
              }
              data {
                name
                status
                sections {
                  __typename
                  ... on GameSectionsDetails {
                    averageRating
                    averagePlaytime
                  }
                  ... on GameSectionsBacklog {
                    interest
                  }
                  ... on GameSectionsReview {
                    dateFinished
                    stars
                    playtime
                  }
                }
                meta {
                  medium
                  platform
                  genre
                }
              }
            }
          }
        }
      }
    `,
    variables: {},
  });
};

export const countStars = (rating: number) => {
  return Math.floor(rating / 20);
};

export const getStarString = (stars: number) => {
  const FILLED = "★";
  const EMPTY = "☆";

  let str = "";
  for (let i = 0; i < 5; i++) {
    if (stars > i) {
      str += FILLED;
    } else {
      str += EMPTY;
    }
  }

  return str;
};

export const getStarColor = (stars: number) => {
  switch (stars) {
    case 1:
      return "text-gray-600";
    case 2:
      return "text-red-600";
    case 3:
      return "text-yellow-600";
    case 4:
      return "text-green-600";
    case 5:
      return "text-blue-600";
  }
};
