import Head from "next/head";
import { staticRequest, gql } from "tinacms";
import { CameraIcon } from "@heroicons/react/solid";

import { getGame } from "../../lib/game";
import MarkedContent from "../../components/MarkedContent";
import Navigation from "../../components/Navigation";

import GamePageTags from "./components/GamePageTags";
import GamePageBacklog from "./components/GamePageBacklog";
import GamePageReview from "./components/GamePageReview";
import GamePageDetails from "./components/GamePageDetails";

const GamePage = (props) => {
  const {
    data: {
      getGameDocument: { data: game },
    },
  } = props;
  const { name, deck, status, sections, meta, boxart } = game;

  return (
    <>
      <Head>
        <title>GameBin &gt; Games &gt; {name}</title>
      </Head>
      <div className="bg-white overflow-hidden">
        <Navigation active="/games" />
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
          <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
            <div>
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                Game
              </h2>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {name}
              </h3>
              <GamePageTags
                status={status}
                genre={meta?.genre}
                medium={meta?.medium}
                platform={meta?.platform}
              />
            </div>
          </div>
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <svg
                className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
                />
              </svg>
              <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                {boxart && (
                  <figure>
                    <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                      <img
                        className="rounded-lg shadow-lg object-cover object-center"
                        src={boxart}
                        alt="boxart"
                        width={1184}
                        height={1376}
                      />
                    </div>
                    <figcaption className="mt-3 flex text-sm text-gray-500">
                      <CameraIcon
                        className="flex-none w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2">Boxart</span>
                    </figcaption>
                  </figure>
                )}
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <MarkedContent
                  className="text-lg text-gray-500"
                  content={deck}
                ></MarkedContent>
              </div>

              {sections &&
                sections.map((section) => {
                  if (section.__typename === "GameSectionsReview") {
                    return (
                      <GamePageReview
                        key={`${name}.${section.__typename}`}
                        {...section}
                      />
                    );
                  }
                  if (section.__typename === "GameSectionsDetails") {
                    return (
                      <GamePageDetails
                        key={`${name}.${section.__typename}`}
                        {...section}
                      />
                    );
                  }
                  if (section.__typename === "GameSectionsBacklog") {
                    return (
                      <GamePageBacklog
                        key={`${name}.${section.__typename}`}
                        {...section}
                      />
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const game = await getGame(params.filename);

  return {
    props: {
      ...game,
    },
  };
};

export const getStaticPaths = async () => {
  const gamesList = await staticRequest({
    query: gql`
      query GetGamesList {
        getGameList {
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }
    `,
  });

  return {
    paths: gamesList.getGameList.edges.map((game) => ({
      params: { filename: game.node.sys.filename },
    })),
    fallback: false,
  };
};

export default GamePage;
