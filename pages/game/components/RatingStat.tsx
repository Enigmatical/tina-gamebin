import { StarIcon } from "@heroicons/react/solid";
import Stat from "../../../components/Stat";

interface Props {
  name?: string;
  stars?: number;
  rating?: number;
}

const countStars = (rating: number) => {
  return Math.floor(rating / 20);
};

const getStarString = (stars: number) => {
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

const getStarColor = (stars: number) => {
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

const RatingStat: React.FC<Props> = ({ name = "My Rating", stars, rating }) => {
  let starsNumber = 0;
  if (stars) {
    starsNumber = stars;
  } else if (rating) {
    starsNumber = countStars(rating);
  } else {
    console.error(`[RatingStat] stars or rating is required.`);
  }

  if (starsNumber <= 0) {
    starsNumber = 1;
  }

  const stat = {
    name: name,
    stat: getStarString(starsNumber),
    color: getStarColor(starsNumber),
    Icon: StarIcon,
  };

  return <Stat {...stat} />;
};

export default RatingStat;
