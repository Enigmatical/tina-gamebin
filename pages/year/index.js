import * as React from "react";
import Head from "next/head";
import { getGames, getStarString, getStarColor } from "../../lib/game";
import { ArchiveIcon, CalendarIcon, ClockIcon } from "@heroicons/react/solid";
import Navigation from "../../components/Navigation";
import Stat from "../../components/Stat";

/**
 * Sorts games by their finished date in descending order
 */
const sortGames = (games) => {
  return games.sort(
    (
      {
        node: {
          data: { sections: a },
        },
      },
      {
        node: {
          data: { sections: b },
        },
      }
    ) => {
      const aReview = a.filter(
        (section) => section.__typename === "GameSectionsReview"
      );
      const bReview = b.filter(
        (section) => section.__typename === "GameSectionsReview"
      );
      const aFinished = aReview[0].dateFinished;
      const bFinished = bReview[0].dateFinished;

      if (!aFinished || !bFinished) {
        return 0;
      }

      if (aFinished < bFinished) {
        return -1;
      }

      if (bFinished > aFinished) {
        return 1;
      }

      if (aFinished === bFinished) {
        return 0;
      }
    }
  );
};

const YearsList = (props) => {
  const {
    data: {
      getGameList: { edges: games },
    },
  } = props;

  /**
   * Loops through all games, separating them into keyed arrays by finished year
   */
  const gamesByYear = {};

  games.forEach((game) => {
    const name = game.node.data.name;
    const status = game.node.data.status;
    if (status === "Finished") {
      try {
        const sectionReview = game.node.data.sections?.filter(
          (section) => section.__typename === "GameSectionsReview"
        );
        const dateFinished = sectionReview[0].dateFinished;
        const yearFinished = new Date(dateFinished).getFullYear();
        if (!gamesByYear[yearFinished]) {
          gamesByYear[yearFinished] = { games: [], totalPlaytime: 0 };
        }

        const playtime = parseInt(sectionReview[0].playtime);
        if (playtime !== "NaN") {
          gamesByYear[yearFinished].totalPlaytime += playtime;
        }

        gamesByYear[yearFinished].games.push({
          ...game,
          review: sectionReview[0],
          dateFinished,
        });
        return;
      } catch (err) {
        console.warn(
          `[YearsList] Unable to display "${name}": "${err}", Check to make sure the game has a "Review" Section and "Finished On" is filled out.`
        );
        return;
      }
    }
    return;
  });

  /**
   * Sorts years in descending order
   */
  const sortedYears = Object.keys(gamesByYear).sort((a, b) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    if (a === b) {
      return 0;
    }
  });

  return (
    <>
      <Head>
        <title>GameBin &gt; By Year</title>
      </Head>
      <div className="bg-white overflow-hidden">
        <Navigation active="/year" />
        <div className="relative mt-8 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                List
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                By Year
              </span>
            </h1>
          </div>
          {sortedYears.map((year) => {
            const { games, totalPlaytime } = gamesByYear[year];
            const sortedGames = sortGames(games);

            return (
              <React.Fragment key={`year-${year}`}>
                <dl className="mx-auto mt-5 grid grid-cols-1 sm:grid-cols-5 gap-5">
                  <Stat
                    className="sm:col-start-2"
                    name="Year"
                    stat={year}
                    Icon={CalendarIcon}
                  />
                  <Stat name="Total" stat={games.length} Icon={ArchiveIcon} />
                  <Stat
                    name="Playtime"
                    stat={`${totalPlaytime} Hrs`}
                    Icon={ClockIcon}
                  />
                </dl>
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="table-fixed min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Finished On
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Name
                              </th>

                              <th
                                scope="col"
                                className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                My Rating
                              </th>
                              <th
                                scope="col"
                                className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Platform
                              </th>
                              <th
                                scope="col"
                                className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Genre
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {sortedGames.map(
                              (
                                { node: { sys, data }, review, dateFinished },
                                idx
                              ) => {
                                const localDateFinished = new Date(
                                  dateFinished
                                ).toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                });
                                const starsNumber = parseInt(review.stars);
                                const starString = getStarString(starsNumber);
                                const starColor = getStarColor(starsNumber);

                                return (
                                  <tr
                                    key={data.name}
                                    className={
                                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    }
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {localDateFinished}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-md text-indigo-600 font-bold underline">
                                      {data.name && (
                                        <a
                                          href={`/${
                                            sys.collection.slug
                                          }/${sys.breadcrumbs.join("/")}`}
                                        >
                                          {data.name}
                                        </a>
                                      )}
                                    </td>

                                    <td
                                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${starColor}`}
                                    >
                                      {starString}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {(data?.meta?.platform ||
                                        data?.meta?.medium) &&
                                        [
                                          data?.meta?.platform,
                                          data?.meta?.medium,
                                        ].join(", ")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {data?.meta?.genre && (
                                        <>{data.meta.genre}</>
                                      )}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const games = await getGames();

  return {
    props: {
      ...games,
    },
  };
};

export default YearsList;
