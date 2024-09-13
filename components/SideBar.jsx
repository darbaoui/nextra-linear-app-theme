import Item from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DEFAULT_LOCALE } from "nextra/constants";
import { useFSRoute } from "nextra/hooks";
import { normalizePages } from "nextra/normalize-pages";
import { useEffect, useMemo, useState } from "react";
import { Collapse } from "react-collapse";

import { cn } from "../lib/utils";
import Menu from "../styles/icons/Menu";
import Icon from "./Icon";

const Simple = ({ item, activeIndex, activePath, className, closeMenu }) => {
  const routes = activePath.map((item) => item.route);
  const active = routes.includes(item.route);
  return (
    <Link href={item.route} onClick={() => closeMenu()}>
      <Item
        className={cn(
          "h-8 hover:bg-accent !text-13 font-normal px-2",
          active ? "bg-accent text-title" : "text-description",
          className
        )}
        icon={item?.icon}
      >
        {item.title}
      </Item>
    </Link>
  );
};

const Folder = ({ item, activeIndex, activePath, closeMenu }) => {
  const routes = activePath.map((item) => item.route);
  const root = activePath[0];
  const activeChild = routes.includes(item.route);
  const activeRoot = root.route == item.route;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (activeChild && !open) {
      setOpen(true);
    }
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          "flex  flex-1 relative cursor-pointer items-center hover:bg-accent justify-between rounded-md !text-13 font-medium transition-all  [&[data-state=open]>svg]:rotate-90"
        )}
        onClick={() => {
          setOpen(!open);
          if (item.withIndexPage) {
            closeMenu();
          }
        }}
      >
        {item.withIndexPage ? (
          <Link href={item.route} className="w-full hover:!no-underline">
            <Item
              className={cn(
                "h-8 !text-13 font-normal",
                activeRoot ? "text-title" : "!text-description"
              )}
            >
              {item.title}
            </Item>
          </Link>
        ) : (
          <Item
            className={cn(
              "h-8 !text-13 font-normal",
              activeRoot ? " text-title" : "!text-description"
            )}
          >
            {item.title}
          </Item>
        )}
        <ChevronRightIcon
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open ? "rotate-90" : ""
          )}
        />
      </div>

      <Collapse isOpened={open} className="Collapsible_list">
        {item.children.map((itemChild, index) => {
          if (itemChild.kind === "MdxPage") {
            return (
              <Simple
                item={itemChild}
                activeIndex={activeIndex}
                activePath={activePath}
                closeMenu={() => closeMenu()}
                key={index}
              />
            );
          }
          return null;
        })}
      </Collapse>
    </div>
  );
};

const SideBar = ({ pageOpts }) => {
  const { pageMap } = pageOpts;
  const { locale = DEFAULT_LOCALE, defaultLocale } = useRouter();
  const fsPath = useFSRoute();
  const [open, setOpen] = useState(false);

  const { activeIndex, activePath, docsDirectories, flatDocsDirectories } =
    useMemo(
      () =>
        normalizePages({
          list: pageMap,
          locale,
          defaultLocale,
          route: fsPath,
        }),
      [pageMap, locale, defaultLocale, fsPath]
    );

  const activeLink = flatDocsDirectories[activeIndex];

  return (
    <>
      <div className="w-full md:hidden min-h-12 flex items-center justify-between text-title px-6 border-b">
        <div className="flex items-center gap-1.5">
          {activeLink?.icon && <Icon iconName={activeLink.icon} />}
          <span>{activeLink.title}</span>
        </div>
        <div id="docs-menu" data-status={open ? "open" : "close"}>
          <Menu size={16} onClick={() => setOpen(!open)} />
        </div>
      </div>
      <input
        id="docs-menu"
        type="checkbox"
        checked={open}
        onChange={(val) => setOpen(val)}
        className="hidden"
      />
      <ScrollArea
        className={cn(
          "Sidebar_contentContainer flex-grow mt-4 w-full relative md:h-full  max-h-[calc(100vh_-_7rem)]"
        )}
      >
        <div className={cn("px-6")}>
          <div className="mt-4 flex flex-col gap-1 Sidebar_listInner">
            {docsDirectories.map((item, index) => {
              if (item.kind === "MdxPage") {
                if (item.withIndexPage) {
                  return (
                    <Folder
                      item={item}
                      activeIndex={activeIndex}
                      activePath={activePath}
                      docsDirectories={docsDirectories}
                      flatDocsDirectories={flatDocsDirectories}
                      closeMenu={() => setOpen(false)}
                      key={index}
                    />
                  );
                }
                return (
                  <Simple
                    activeIndex={activeIndex}
                    activePath={activePath}
                    docsDirectories={docsDirectories}
                    flatDocsDirectories={flatDocsDirectories}
                    closeMenu={() => setOpen(false)}
                    item={item}
                    key={index}
                  />
                );
              }
              if (item.kind === "Folder") {
                return (
                  <Folder
                    activeIndex={activeIndex}
                    activePath={activePath}
                    docsDirectories={docsDirectories}
                    flatDocsDirectories={flatDocsDirectories}
                    closeMenu={() => setOpen(false)}
                    item={item}
                    key={index}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default SideBar;
