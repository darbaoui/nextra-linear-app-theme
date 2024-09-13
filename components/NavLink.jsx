"use client";
import { cn } from "../lib/utils";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useFSRoute } from "nextra/hooks";
import { normalizePages } from "nextra/normalize-pages";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
const DEFAULT_LOCALE = "en-US";

const NavLinks = ({ flatDirectories, currentIndex }) => {
  let prev = flatDirectories[currentIndex - 1];
  let next2 = flatDirectories[currentIndex + 1];

  if (prev && !prev.isUnderCurrentDocsTree) prev = false;
  if (next2 && !next2.isUnderCurrentDocsTree) next2 = false;
  if (!prev && !next2) return null;

  return (
    <div className={cn("my-8 flex gap-6")}>
      {prev && (
        <Link
          href={prev.route}
          title={prev.title}
          className={cn("Navigation_prev  hover:bg-accent")}
        >
          <div className="flex flex-col gap-1 text-title text-sm  items-start">
            <div className="flex  items-center text-description gap-1 -ml-1">
              <ChevronLeft size={14} />
              <span className="text-description">Previous</span>
            </div>
            {prev.title}
          </div>
        </Link>
      )}

      {next2 && (
        <Link
          href={next2.route}
          title={next2.title}
          className={cn("Navigation_next flex hover:bg-accent")}
        >
          <div className="flex flex-col gap-1 text-title text-sm items-end">
            <div className="flex flex-row-reverse items-center text-description gap-1 -mr-1">
              <ChevronLeft size={14} className="rotate-180" />
              <span className="text-description">Next</span>
            </div>
            {next2.title}
          </div>
        </Link>
      )}
    </div>
  );
};

const NavLink = ({ pageOpts }) => {
  const { pageMap } = pageOpts;
  const { locale = DEFAULT_LOCALE, defaultLocale } = useRouter();
  const fsPath = useFSRoute();

  const { activeIndex, flatDocsDirectories } = useMemo(
    () =>
      normalizePages({
        list: pageMap,
        locale,
        defaultLocale,
        route: fsPath,
      }),
    [pageMap, locale, defaultLocale, fsPath]
  );

  //   const { activeIndex: currentIndex, flatDocsDirectories: flatDocs } =
  //     normalizePages({
  //       list: pageMap,
  //       locale,
  //       defaultLocale,
  //       route: fsPath,
  //     });
  //   console.log("normalizedPages-->", currentIndex, flatDocs);

  return (
    <NavLinks
      flatDirectories={flatDocsDirectories}
      currentIndex={activeIndex}
    />
  );
};

export default NavLink;
