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
                  ... on GameSectionsBacklog {
                    interest
                  }
                  ... on GameSectionsReview {
                    dateFinished
                    stars
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
