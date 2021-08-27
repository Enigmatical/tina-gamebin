import * as React from "react";
import Head from "next/head";
import {
  getGames,
  countStars,
  getStarString,
  getStarColor,
} from "../../lib/game";
import {
  ArchiveIcon,
  ClockIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import Navigation from "../../components/Navigation";
import Stat from "../../components/Stat";

const InterestColumn = ({ interest }) => {
  let Icon;
  let colors;

  switch (interest) {
    case "Strong":
      Icon = ExclamationCircleIcon;
      colors = "text-green-600";
      break;
    case "Weak":
    default:
      Icon = QuestionMarkCircleIcon;
      colors = "text-yellow-600";
      break;
  }

  return (
    <span className={`inline-flex text-base ${colors}`}>
      <Icon className="mr-1 h-5 w-5" /> {interest}
    </span>
  );
};

const BacklogList = (props) => {
  const {
    data: {
      getGameList: { edges: games },
    },
  } = props;

  /**
   * Loops through all games, filtering for Playing and Backlog
   */
  const filterGames = [];
  let totalAveragePlaytime = 0;

  games.forEach((game) => {
    const status = game.node.data.status;
    if (status === "Playing" || status === "Backlog") {
      const sectionDetails = game.node.data.sections?.filter(
        (section) => section.__typename === "GameSectionsDetails"
      );
      const sectionBacklog = game.node.data.sections?.filter(
        (section) => section.__typename === "GameSectionsBacklog"
      );

      if (sectionDetails && sectionDetails.length > 0) {
        const averagePlaytime = parseInt(sectionDetails[0].averagePlaytime);
        if (averagePlaytime !== "NaN") {
          totalAveragePlaytime += averagePlaytime;
        }
      }

      filterGames.push({
        ...game,
        details: sectionDetails ? sectionDetails[0] : {},
        backlog: sectionBacklog ? sectionBacklog[0] : {},
      });
      return;
    }
    return;
  });

  /**
   * Sorts games alphabetically
   */
  const sortedGames = filterGames.sort(
    (
      {
        node: {
          data: { name: a },
        },
      },
      {
        node: {
          data: { name: b },
        },
      }
    ) => {
      if (a < b) {
        return -1;
      }
      if (b > a) {
        return 1;
      }
      if (a === b) {
        return 0;
      }
    }
  );

  return (
    <>
      <Head>
        <title>GameBin &gt; Backlog</title>
      </Head>
      <div className="bg-white overflow-hidden">
        <Navigation active="/backlog" />
        <div className="relative mt-8 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                List
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Backlog
              </span>
            </h1>
          </div>

          <dl className="mx-auto mt-5 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Stat
              className="sm:col-start-2"
              name="Total"
              stat={sortedGames.length}
              Icon={ArchiveIcon}
            />
            <Stat
              name="Playtime"
              stat={`${totalAveragePlaytime} Hrs`}
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
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Interest
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
                        <th
                          scope="col"
                          className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Avg Rating
                        </th>
                        <th
                          scope="col"
                          className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Avg Playtime
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedGames.map(
                        ({ node: { sys, data }, details, backlog }, idx) => {
                          const starsNumber = countStars(
                            parseInt(details.averageRating)
                          );
                          const starString = getStarString(starsNumber);
                          const starColor = getStarColor(starsNumber);

                          return (
                            <tr
                              key={data.name}
                              className={
                                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
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
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {backlog.interest ? (
                                  <InterestColumn interest={backlog.interest} />
                                ) : (
                                  ""
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {(data?.meta?.platform || data?.meta?.medium) &&
                                  [
                                    data?.meta?.platform,
                                    data?.meta?.medium,
                                  ].join(", ")}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {data?.meta?.genre && <>{data.meta.genre}</>}
                              </td>
                              <td
                                className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                                  starColor || "text-gray-900"
                                }`}
                              >
                                {details.averageRating ? starString : ""}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {details.averagePlaytime
                                  ? `${details.averagePlaytime} Hrs`
                                  : ""}
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

export default BacklogList;
