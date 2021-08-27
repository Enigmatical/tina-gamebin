import Head from "next/head";
import Navigation from "../../components/Navigation";
import Stat from "../../components/Stat";
import { getGames } from "../../lib/game";
import {
  ArchiveIcon,
  ClipboardCheckIcon,
  ClipboardCopyIcon,
  ClipboardListIcon,
} from "@heroicons/react/solid";

const StatusColumn = ({ status }) => {
  let Icon;
  let colors;

  switch (status) {
    case "Finished":
      Icon = ClipboardCheckIcon;
      colors = "text-green-600";
      break;
    case "Playing":
      Icon = ClipboardCopyIcon;
      colors = "text-yellow-600";
      break;
    default:
    case "Backlog":
      Icon = ClipboardListIcon;
      colors = "text-red-600";
      break;
  }

  return (
    <span className={`inline-flex text-base ${colors}`}>
      <Icon className="mr-1 h-5 w-5" /> {status}
    </span>
  );
};

const GameList = (props) => {
  const {
    data: {
      getGameList: { edges: games },
    },
  } = props;

  const sortGames = games.sort(
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

  const backlogGames = games.filter(
    ({
      node: {
        data: { status },
      },
    }) => {
      return status === "Backlog";
    }
  );

  const playingGames = games.filter(
    ({
      node: {
        data: { status },
      },
    }) => {
      return status === "Playing";
    }
  );

  const finishedGames = games.filter(
    ({
      node: {
        data: { status },
      },
    }) => {
      return status === "Finished";
    }
  );

  const stats = [
    { name: "Total", stat: games.length, Icon: ArchiveIcon },
    {
      name: "Backlog",
      stat: backlogGames.length,
      color: "text-red-600",
      Icon: ClipboardListIcon,
    },
    {
      name: "Playing",
      stat: playingGames.length,
      color: "text-yellow-600",
      Icon: ClipboardCopyIcon,
    },
    {
      name: "Finished",
      stat: finishedGames.length,
      color: "text-green-600",
      Icon: ClipboardCheckIcon,
    },
  ];

  return (
    <>
      <Head>
        <title>GameBin &gt; Games</title>
      </Head>
      <div className="bg-white overflow-hidden">
        <Navigation active="/game" />
        <div className="relative mt-8 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                List
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Games
              </span>
            </h1>
          </div>
          <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
              {stats.map((stat) => (
                <Stat key={`${stat.name}`} {...stat} />
              ))}
            </dl>
          </div>

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
                          Status
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
                      {sortGames.map(({ node: { sys, data } }, idx) => (
                        <tr
                          key={data.name}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                            <StatusColumn status={data.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {(data?.meta?.platform || data?.meta?.medium) &&
                              [data?.meta?.platform, data?.meta?.medium].join(
                                ", "
                              )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {data?.meta?.genre && <>{data.meta.genre}</>}
                          </td>
                        </tr>
                      ))}
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

export default GameList;
