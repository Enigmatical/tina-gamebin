import { ClockIcon } from "@heroicons/react/solid";
import MarkedContent from "../../../components/MarkedContent";
import Stat from "../../../components/Stat";
import RatingStat from "./RatingStat";

interface Props {
  content: string;
  dateFinished: string;
  playtime?: string;
  stars?: string;
}

const GamePageReview: React.FC<Props> = ({
  content,
  dateFinished,
  playtime,
  stars,
}) => {
  let localDateFinished;
  if (dateFinished) {
    localDateFinished = new Date(dateFinished).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <>
      <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
        <h2>Review</h2>
      </div>
      {localDateFinished && (
        <p className="text-xs">Finished on {localDateFinished}</p>
      )}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {stars && <RatingStat name="My Rating" stars={parseInt(stars)} />}
        {playtime && (
          <Stat name="My Playtime" stat={`${playtime} Hrs`} Icon={ClockIcon} />
        )}
      </dl>
      <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
        <MarkedContent className="text-justify" content={content} />
      </div>
    </>
  );
};

export default GamePageReview;
