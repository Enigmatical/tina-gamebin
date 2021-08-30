import {
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import { INTEREST_STRONG } from "../../../.tina/constants";
import MarkedContent from "../../../components/MarkedContent";
import Stat from "../../../components/Stat";

interface Props {
  content?: string;
  interest?: string;
}

const InterestStat: React.FC<{ interest: string }> = ({ interest }) => {
  let Icon;
  let color;
  if (interest === INTEREST_STRONG) {
    Icon = ExclamationCircleIcon;
    color = "text-green-600";
  } else {
    Icon = QuestionMarkCircleIcon;
    color = "text-yellow-600";
  }

  return <Stat name="My Interest" color={color} stat={interest} Icon={Icon} />;
};

const GamePageBacklog: React.FC<Props> = ({ content, interest }) => {
  return (
    <>
      <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
        <h2>Backlog</h2>
      </div>
      {interest && (
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <InterestStat interest={interest} />
        </dl>
      )}
      <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
        {content && (
          <MarkedContent className="text-justify" content={content} />
        )}
      </div>
    </>
  );
};

export default GamePageBacklog;
