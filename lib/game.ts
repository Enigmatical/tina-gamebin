import { staticRequest } from "tinacms";
import { ExperimentalGetTinaClient } from "../.tina/__generated__/types";

export const getGame = async (filename: string) => {
  const client = ExperimentalGetTinaClient();
  const game = await client.getGameDocument({
    relativePath: `${filename}.md`,
  });

  return game;
};

export const getGames = async () => {
  const client = ExperimentalGetTinaClient();
  const games = await client.getGameListByName();

  return games;
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
