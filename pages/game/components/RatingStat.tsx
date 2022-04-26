import { StarIcon } from "@heroicons/react/solid";
import Stat, {
  countStars,
  getStarString,
  getStarColor,
} from "../../../components/Stat";

interface Props {
  name?: string;
  stars?: number;
  rating?: number;
}

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
