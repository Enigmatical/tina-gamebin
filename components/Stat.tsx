import { InformationCircleIcon } from "@heroicons/react/solid";

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
