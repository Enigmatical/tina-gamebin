import { ClockIcon } from "@heroicons/react/solid";
import MarkedContent from "../../../components/MarkedContent";
import Stat from "../../../components/Stat";
import RatingStat from "./RatingStat";

interface Props {
  content: string;
  learnMoreLink?: string;
  dateReleased?: string;
  averageRating?: string;
  averagePlaytime?: string;
}

const GamePageDetails: React.FC<Props> = ({
  content,
  learnMoreLink,
  dateReleased,
  averageRating,
  averagePlaytime,
}) => {
  let localDateReleased;
  if (dateReleased) {
    localDateReleased = new Date(dateReleased).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <>
      <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
        <h2>Details</h2>
      </div>
      {localDateReleased && (
        <p className="text-xs">Released on {localDateReleased}</p>
      )}
      {(averageRating || averagePlaytime) && (
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {averageRating && (
            <RatingStat
              name="Average Rating"
              rating={parseInt(averageRating)}
            />
          )}
          {averagePlaytime && (
            <Stat
              name="Average Playtime"
              stat={`${averagePlaytime} Hrs`}
              Icon={ClockIcon}
            />
          )}
        </dl>
      )}
      <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
        <MarkedContent className="text-justify" content={content} />
      </div>
      {learnMoreLink && (
        <div className="-mt-5 text-right">
          <a
            href={learnMoreLink}
            className="text-sm font-medium text-indigo-600"
          >
            {" "}
            Read More <span aria-hidden="true">&rarr;</span>{" "}
          </a>
        </div>
      )}
    </>
  );
};

export default GamePageDetails;
