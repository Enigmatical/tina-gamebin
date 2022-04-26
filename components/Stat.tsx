import { InformationCircleIcon } from "@heroicons/react/solid";

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

interface Props {
  name: string;
  stat: string;
  color?: string;
  Icon?: React.FC;
  className?: string;
}

const Stat: React.FC<Props> = ({
  name,
  stat,
  color = "text-gray-900",
  Icon = InformationCircleIcon,
  className,
}) => {
  return (
    <div
      className={`relative bg-white py-3 px-3 shadow rounded-lg overflow-hidden ${className}`}
    >
      <dt>
        <div className="absolute bg-indigo-500 rounded-md p-3">
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <p className="ml-16 text-sm font-medium text-gray-500 truncate">
          {name}
        </p>
      </dt>
      <dd className="ml-16 flex items-baseline">
        <p className={`text-2xl font-semibold leading-7 ${color}`}>{stat}</p>
      </dd>
    </div>
  );
};

export default Stat;
