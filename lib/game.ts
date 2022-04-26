import { ExperimentalGetTinaClient } from "../.tina/__generated__/types";

export const getGame = async (filename: string) => {
  const client = ExperimentalGetTinaClient();
  const game = await client.game({
    relativePath: `${filename}.md`,
  });

  return game;
};

export const getGames = async () => {
  const client = ExperimentalGetTinaClient();
  const games = await client.gamesByName();

  return games;
};

export const getBacklog = async () => {
  const client = ExperimentalGetTinaClient();
  const games = await client.backlogGamesByName();

  return games;
};

export const getFinished = async () => {
  const client = ExperimentalGetTinaClient();
  const games = await client.finishedGamesByName();

  return games;
};
