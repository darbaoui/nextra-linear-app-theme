import { Transition } from "@headlessui/react";
import { clsx } from "clsx";
import escapeStringRegexp from "escape-string-regexp";
import FlexSearch from "flexsearch";
import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import next from "next/package.json";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import { useMounted } from "nextra/hooks";
import { InformationCircleIcon, SpinnerIcon } from "nextra/icons";

import {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";
export const DEFAULT_LOCALE = "en-US";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
export const __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
export const __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) =>
      x.done
        ? resolve(x.value)
        : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

export function renderComponent(ComponentOrNode, props) {
  if (!ComponentOrNode) return null;
  if (typeof ComponentOrNode !== "function") return ComponentOrNode;
  return /* @__PURE__ */ jsx(ComponentOrNode, __spreadValues({}, props));
}
function renderString(stringOrFunction, props = {}) {
  const result =
    typeof stringOrFunction === "function"
      ? stringOrFunction(props)
      : stringOrFunction;
  return result || "";
}

var MenuContext = createContext({
  menu: false,
  setMenu: () => false,
});

export const useMenu = () => useContext(MenuContext);
var Input = forwardRef((_a, forwardedRef) => {
  var _b = _a,
    { className, suffix } = _b,
    props = __objRest(_b, ["className", "suffix"]);
  return (
    <div
      className={cn(
        "relative w-full flex gap-2 p-2 px-4 items-center text-title",
        _a.hasResult ? " border-b" : "border-transparent"
      )}
    >
      <SearchIcon size={16} className="text-description" />
      <input
        spellCheck={false}
        className={cn(
          className,
          "block focus-visible:outline-none focus-visible:ring-none flex-grow w-full appearance-none rounded-lg py-2 transition-colors text-base leading-tight md:text-sm bg-transparent placeholder:text-description  contrast-more:border contrast-more:border-current"
        )}
        {...props}
      />
      {suffix}
    </div>
  );
});
Input.displayName = "Input";

var HighlightMatches = memo(function HighlightMatches2({ value, match }) {
  if (!value) {
    return null;
  }
  const splitText = value.split("");
  const escapedSearch = escapeStringRegexp(match.trim());
  const regexp = new RegExp(escapedSearch.replaceAll(/\s+/g, "|"), "ig");
  let result;
  let index = 0;
  const content = [];
  while ((result = regexp.exec(value))) {
    if (result.index === regexp.lastIndex) {
      regexp.lastIndex++;
    } else {
      const before = splitText.splice(0, result.index - index).join("");
      const after = splitText
        .splice(0, regexp.lastIndex - result.index)
        .join("");
      content.push(
        before,
        /* @__PURE__ */ jsx(
          "span",
          { className: "text-primary", children: after },
          result.index
        )
      );
      index = regexp.lastIndex;
    }
  }
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [content, splitText.join("")],
  });
});
var nextVersion = Number(next.version.split(".")[0]);
export const Anchor = forwardRef(function (_a, forwardedRef) {
  var _b = _a,
    { href = "", children, newWindow } = _b,
    props = __objRest(_b, ["href", "children", "newWindow"]);
  const config = useConfig();
  if (newWindow) {
    return /* @__PURE__ */ jsxs(
      "a",
      __spreadProps(
        __spreadValues(
          {
            ref: forwardedRef,
            href,
            target: "_blank",
            rel: "noreferrer",
          },
          props
        ),
        {
          children: [
            children,
            /* @__PURE__ */ jsx("span", {
              className: "sr-only select-none",
              children: " (opens in a new tab)",
            }),
          ],
        }
      )
    );
  }
  if (!href) {
    return /* @__PURE__ */ jsx(
      "a",
      __spreadProps(__spreadValues({ ref: forwardedRef }, props), { children })
    );
  }
  if (nextVersion > 12 || config.newNextLinkBehavior) {
    return /* @__PURE__ */ jsx(
      Link,
      __spreadProps(__spreadValues({ ref: forwardedRef, href }, props), {
        children,
      })
    );
  }
  return /* @__PURE__ */ 12(Link, {
    href,
    passHref: true,
    children: /* @__PURE__ */ 12(
      "a",
      __spreadProps(__spreadValues({ ref: forwardedRef }, props), { children })
    ),
  });
});
Anchor.displayName = "Anchor";

var INPUTS = ["input", "select", "button", "textarea"];

function Search({
  className,
  overlayClassName,
  value,
  onChange,
  onActive,
  loading,
  error,
  results,
  onClose,
}) {
  const [show, setShow] = useState(false);
  const config = useConfig();
  const [active, setActive] = useState(0);
  const router = useRouter();
  const { setMenu } = useMenu();
  const input = useRef(null);
  const ulRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [composition, setComposition] = useState(true);
  useEffect(() => {
    setActive(0);
  }, [value]);
  useEffect(() => {
    const down = (e) => {
      const activeElement = document.activeElement;
      const tagName =
        activeElement == null ? void 0 : activeElement.tagName.toLowerCase();
      if (
        !input.current ||
        !tagName ||
        INPUTS.includes(tagName) ||
        (activeElement == null ? void 0 : activeElement.isContentEditable)
      )
        return;
      if (
        e.key === "/" ||
        (e.key === "k" && (e.metaKey /* for non-Mac */ || e.ctrlKey))
      ) {
        e.preventDefault();
        input.current.focus({ preventScroll: true });
      } else if (e.key === "Escape") {
        setShow(false);
        input.current.blur();
      }
    };
    window.addEventListener("keydown", down);
    return () => {
      window.removeEventListener("keydown", down);
    };
  }, []);
  const finishSearch = useCallback(() => {
    var _a;
    (_a = input.current) == null ? void 0 : _a.blur();
    onChange("");
    setShow(false);
    onClose();
    setMenu(false);
  }, [onChange, setMenu]);
  const handleActive = useCallback((e) => {
    const { index } = e.currentTarget.dataset;
    setActive(Number(index));
  }, []);
  const handleKeyDown = useCallback(
    function (e) {
      var _a, _b, _c;
      switch (e.key) {
        case "ArrowDown": {
          if (active + 1 < results.length) {
            const el =
              (_a = ulRef.current) == null
                ? void 0
                : _a.querySelector(`li:nth-of-type(${active + 2}) > a`);
            if (el) {
              e.preventDefault();
              handleActive({ currentTarget: el });
              el.focus();
            }
          }
          break;
        }
        case "ArrowUp": {
          if (active - 1 >= 0) {
            const el =
              (_b = ulRef.current) == null
                ? void 0
                : _b.querySelector(`li:nth-of-type(${active}) > a`);
            if (el) {
              e.preventDefault();
              handleActive({ currentTarget: el });
              el.focus();
            }
          }
          break;
        }
        case "Enter": {
          const result = results[active];
          if (result && composition) {
            void router.push(result.route);
            finishSearch();
          }
          break;
        }
        case "Escape": {
          setShow(false);
          (_c = input.current) == null ? void 0 : _c.blur();
          break;
        }
      }
    },
    [active, results, router, finishSearch, handleActive, composition]
  );
  const mounted = useMounted();
  const renderList = show && Boolean(value);
  const icon = /* @__PURE__ */ jsx(Transition, {
    show: mounted && (!show || Boolean(value)),
    enter: "transition-opacity",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "transition-opacity",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0",
    children: null,
  });

  const handleComposition = useCallback((e) => {
    setComposition(e.type === "compositionend");
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: cn("relative", className),
    children: [
      renderList &&
        /* @__PURE__ */ jsx("div", {
          className: "",
          onClick: () => setShow(false),
        }),
      /* @__PURE__ */ jsxs(Input, {
        ref: input,
        value,
        hasResult: results.length,
        onChange: (e) => {
          const { value: value2 } = e.target;
          onChange(value2);
          setShow(Boolean(value2));
        },
        onFocus: () => {
          onActive == null ? void 0 : onActive(true);
          setFocused(true);
        },
        onBlur: () => {
          setFocused(false);
        },
        onCompositionStart: handleComposition,
        onCompositionEnd: handleComposition,
        type: "text",
        placeholder: renderString("Search documentation..."),
        onKeyDown: handleKeyDown,
        suffix: icon,
      }),
      /* @__PURE__ */ jsx(Transition, {
        show: renderList,
        as: Transition.Child,
        leave: "transition-opacity duration-100",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        className: cn("flex-grow dialog-content-h overflow-scroll"),
        children: /* @__PURE__ */ jsx("ul", {
          className: cn(
            // Using bg-white as background-color when the browser didn't support backdrop-filter
            "px-2 w-[calc(35rem_-_2px)] bg-white text-gray-100",
            "overflow-auto overscroll-contain bg-background py-2.5 ",
            "inset-x-0 ltr:md:left-auto rtl:md:right-auto",

            overlayClassName
          ),
          ref: ulRef,
          style: {
            transition: "max-height .2s ease",
            // don't work with tailwindcss
          },
          children: error
            ? /* @__PURE__ */ jsxs("span", {
                className:
                  "flex select-none justify-center nx-gap-2 p-8 text-center text-sm text-destructive",
                children: [
                  /* @__PURE__ */ jsx(InformationCircleIcon, {
                    className: "h-5 w-5",
                  }),
                  renderString(config.search.error),
                ],
              })
            : loading
            ? /* @__PURE__ */ jsxs("span", {
                className:
                  "flex select-none justify-center gap-2 p-8 text-center text-sm text-description",
                children: [
                  /* @__PURE__ */ jsx(SpinnerIcon, {
                    className: "h-5 w-5 animate-spin",
                  }),
                  renderComponent(null),
                ],
              })
            : results.length > 0
            ? results.map(({ route, prefix, children, id }, i) =>
                /* @__PURE__ */ jsxs(
                  Fragment,
                  {
                    children: [
                      prefix,
                      /* @__PURE__ */ jsx("li", {
                        className: cn(
                          "break-words rounded-md px-2",
                          "contrast-more:border",
                          i === active
                            ? "bg-accent text-primary contrast-more:border-primary-500"
                            : "text-gray-800 contrast-more:border-transparent dark:text-gray-300"
                        ),
                        children: /* @__PURE__ */ jsx(Anchor, {
                          className: "block scroll-m-12 py-2",
                          href: route,
                          "data-index": i,
                          onFocus: handleActive,
                          onMouseMove: handleActive,
                          onClick: finishSearch,
                          onKeyDown: handleKeyDown,
                          children,
                        }),
                      }),
                    ],
                  },
                  id
                )
              )
            : renderComponent(null),
        }),
      }),
    ],
  });
}

var indexes = {};
var loadIndexesPromises = /* @__PURE__ */ new Map();

function loadIndexes(basePath, locale) {
  const key = `${basePath}@${locale}`;

  // If the indexes are already being loaded, return the existing promise
  if (loadIndexesPromises.has(key)) {
    return loadIndexesPromises.get(key);
  }

  // Load the indexes and store the promise
  const promise = loadIndexesImpl(basePath, locale);
  loadIndexesPromises.set(key, promise);
  return promise;
}

async function loadIndexesImpl(basePath, locale) {
  try {
    // Fetch the search data
    const response = await fetch(
      `${basePath}/_next/static/chunks/nextra-data-${locale}.json`
    );
    const searchData = await response.json();

    // Initialize FlexSearch.Document instances
    const pageIndex = new FlexSearch.Document({
      cache: 100,
      tokenize: "full",
      document: {
        id: "id",
        index: "content",
        store: ["title"],
      },
      context: {
        resolution: 9,
        depth: 2,
        bidirectional: true,
      },
    });

    const sectionIndex = new FlexSearch.Document({
      cache: 100,
      tokenize: "full",
      document: {
        id: "id",
        index: "content",
        tag: "pageId",
        store: ["title", "content", "url", "display"],
      },
      context: {
        resolution: 9,
        depth: 2,
        bidirectional: true,
      },
    });

    let pageId = 0;

    // Populate indexes with search data
    for (const [route, structurizedData] of Object.entries(searchData)) {
      let pageContent = "";
      ++pageId;

      for (const [key, content] of Object.entries(structurizedData.data)) {
        const [headingId, headingValue] = key.split("#");
        const url = route + (headingId ? `#${headingId}` : "");
        const title = headingValue || structurizedData.title;
        const paragraphs = content.split("\n");

        sectionIndex.add({
          id: url,
          url,
          title,
          pageId: `page_${pageId}`,
          content: title,
          ...(paragraphs[0] && { display: paragraphs[0] }),
        });

        paragraphs.forEach((paragraph, i) => {
          sectionIndex.add({
            id: `${url}_${i}`,
            url,
            title,
            pageId: `page_${pageId}`,
            content: paragraph,
          });
        });

        pageContent += ` ${title} ${content}`;
      }

      pageIndex.add({
        id: pageId,
        title: structurizedData.title,
        content: pageContent,
      });
    }

    // Store the indexes for the locale
    indexes[locale] = [pageIndex, sectionIndex];
  } catch (error) {
    console.error("Failed to load search indexes:", error);
  }
}

export function Flexsearch({ className, onClose }) {
  const { locale = DEFAULT_LOCALE, basePath } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const doSearch = (search2) => {
    var _a, _b;
    if (!search2) return;
    const [pageIndex, sectionIndex] = indexes[locale];
    const pageResults =
      ((_a = pageIndex.search(search2, 5, {
        enrich: true,
        suggest: true,
      })[0]) == null
        ? void 0
        : _a.result) || [];
    const results2 = [];
    const pageTitleMatches = {};
    for (let i = 0; i < pageResults.length; i++) {
      const result = pageResults[i];
      pageTitleMatches[i] = 0;
      const sectionResults =
        ((_b = sectionIndex.search(search2, 5, {
          enrich: true,
          suggest: true,
          tag: `page_${result.id}`,
        })[0]) == null
          ? void 0
          : _b.result) || [];
      let isFirstItemOfPage = true;
      const occurred = {};
      for (let j = 0; j < sectionResults.length; j++) {
        const { doc } = sectionResults[j];
        const isMatchingTitle = doc.display !== void 0;
        if (isMatchingTitle) {
          pageTitleMatches[i]++;
        }
        const { url, title } = doc;
        const content = doc.display || doc.content;
        if (occurred[url + "@" + content]) continue;
        occurred[url + "@" + content] = true;
        results2.push({
          _page_rk: i,
          _section_rk: j,
          route: url,
          prefix:
            isFirstItemOfPage &&
            /* @__PURE__ */ jsx("div", {
              className: cn(
                "px-2 mb-2 mt-6 select-none border-b  pb-1.5 text-xs nx-font-semibold uppercase  first:mt-0 text-description",
                "contrast-more:border-gray-600 contrast-more:text-gray-900 contrast-more:dark:border-gray-50 "
              ),
              children: result.doc.title,
            }),
          children: /* @__PURE__ */ jsxs(Fragment, {
            children: [
              /* @__PURE__ */ jsx("div", {
                className: "text-sm font-semibold leading-5",
                children: /* @__PURE__ */ jsx(HighlightMatches, {
                  match: search2,
                  value: title,
                }),
              }),
              content &&
                /* @__PURE__ */ jsx("div", {
                  className:
                    "excerpt mt-1 text-xs  font-normal leading-[1.35rem] text-description contrast-more:dark:text-gray-50",
                  children: /* @__PURE__ */ jsx(HighlightMatches, {
                    match: search2,
                    value: content,
                  }),
                }),
            ],
          }),
        });
        isFirstItemOfPage = false;
      }
    }
    setResults(
      results2
        .sort((a, b) => {
          if (a._page_rk === b._page_rk) {
            return a._section_rk - b._section_rk;
          }
          if (pageTitleMatches[a._page_rk] !== pageTitleMatches[b._page_rk]) {
            return pageTitleMatches[b._page_rk] - pageTitleMatches[a._page_rk];
          }
          return a._page_rk - b._page_rk;
        })
        .map((res) => ({
          id: `${res._page_rk}_${res._section_rk}`,
          route: res.route,
          prefix: res.prefix,
          children: res.children,
        }))
    );
  };
  const preload = useCallback(
    (active) =>
      __async(this, null, function* () {
        if (active && !indexes[locale]) {
          setLoading(true);
          try {
            yield loadIndexes(basePath, locale);
          } catch (e) {
            setError(true);
          }
          setLoading(false);
        }
      }),
    [locale, basePath]
  );
  const handleChange = (value) =>
    __async(this, null, function* () {
      setSearch(value);
      if (loading) {
        return;
      }
      if (!indexes[locale]) {
        setLoading(true);
        try {
          yield loadIndexes(basePath, locale);
        } catch (e) {
          setError(true);
        }
        setLoading(false);
      }
      doSearch(value);
    });
  return /* @__PURE__ */ jsx(Search, {
    loading,
    error,
    value: search,
    onChange: handleChange,
    onActive: preload,
    className,
    overlayClassName:
      "w-screen min-h-[100px] max-w-[min(calc(100vw-2rem),calc(100%+20rem))]",
    results,
    onClose,
  });
}
