import Head from "next/head";
import Navigation from "../components/Navigation";
import { ChevronRightIcon, ArchiveIcon } from "@heroicons/react/solid";

const links = [
  {
    title: "Games",
    href: "/game",
    description: "View list of all games",
    icon: ArchiveIcon,
  },
];

const Index = () => {
  return (
    <>
      <Head>
        <title>GameBin</title>
      </Head>
      <div className="bg-white">
        <Navigation />
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto py-16 sm:py-24">
            <div className="flex-shrink-0">
              <ArchiveIcon className="mx-auto block h-32 w-auto text-indigo-500" />
            </div>
            <div className="text-center">
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Welcome.
              </h1>
            </div>
            <div className="mt-12">
              <h2 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
                Sections
              </h2>
              <ul
                role="list"
                className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
              >
                {links.map((link, linkIdx) => (
                  <li
                    key={linkIdx}
                    className="relative py-6 flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0">
                      <span className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-50">
                        <link.icon
                          className="h-6 w-6 text-indigo-700"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-medium text-gray-900">
                        <span className="rounded-sm">
                          <a href={link.href}>
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            {link.title}
                          </a>
                        </span>
                      </h3>
                      <p className="text-base text-gray-500">
                        {link.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
