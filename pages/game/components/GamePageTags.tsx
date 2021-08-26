import {
  ClipboardCheckIcon,
  ClipboardCopyIcon,
  ClipboardListIcon,
  DesktopComputerIcon,
  CubeIcon,
  CubeTransparentIcon,
  BookOpenIcon,
} from "@heroicons/react/solid";

interface Props {
  status?: string;
  genre?: string;
  medium?: string;
  platform?: string;
}

const StatusTag = ({ status }: { status: string }) => {
  let Icon;
  let colors;

  switch (status) {
    case "Finished":
      Icon = ClipboardCheckIcon;
      colors = "bg-green-100 text-green-800";
      break;
    case "Playing":
      Icon = ClipboardCopyIcon;
      colors = "bg-yellow-100 text-yellow-800";
      break;
    default:
    case "Backlog":
      Icon = ClipboardListIcon;
      colors = "bg-red-100 text-red-800";
      break;
  }
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors}`}
    >
      <Icon className="mr-1 h-5 w-5" />
      {status}
    </span>
  );
};

const GenreTag = ({ genre }: { genre: string }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800`}
    >
      <BookOpenIcon className="mr-1 h-5 w-5" />
      {genre}
    </span>
  );
};

const PlatformTag = ({ platform }: { platform: string }) => {
  let colors;

  if (platform.search(/^nintendo/i) !== -1) {
    colors = "bg-red-100 text-red-800";
  } else if (platform.search(/^xbox/i) !== -1) {
    colors = "bg-green-100 text-green-800";
  } else if (platform.search(/^playstation/i) !== -1) {
    colors = "bg-blue-100 text-blue-800";
  } else {
    colors = "bg-gray-100 text-gray-800";
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors}`}
    >
      <DesktopComputerIcon className="mr-1 h-5 w-5" />
      {platform}
    </span>
  );
};

const MediumTag = ({ medium }: { medium: string }) => {
  let Icon;

  switch (medium) {
    case "Physical":
      Icon = CubeIcon;
      break;
    default:
      Icon = CubeTransparentIcon;
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800`}
    >
      <Icon className="mr-1 h-5 w-5" />
      {medium}
    </span>
  );
};

const GamePageTags: React.FC<Props> = ({ status, genre, medium, platform }) => {
  return (
    <div className="mt-2 space-x-2">
      {status && <StatusTag status={status} />}
      {genre && <GenreTag genre={genre} />}
      {platform && <PlatformTag platform={platform} />}
      {medium && <MediumTag medium={medium} />}
    </div>
  );
};

export default GamePageTags;
