import Head from "next/head";

import BarTop from "./components/BarTop";
import NavLink from "./components/NavLink";
import SideBarComponent from "./components/SideBar";
import Toc from "./components/Toc";

export default function Layout({ children, pageOpts }) {
  const { title, route, frontMatter, headings, pageMap } = pageOpts;
  const htmlTitle = `${title} - Acme docs`;
  return (
    <div className="w-full md:flex md:flex-row h-screen  max-h-screen md:min-h-screen py-28 md:py-0 md:pl-70">
      <Head>
        <title>{htmlTitle}</title>
        <meta name="og:image" content={frontMatter.img} />
        <meta name="description" content={frontMatter.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={htmlTitle} />
        <meta property="og:description" content={frontMatter.description} />
        <meta property="og:image" content={frontMatter.img} />
        <meta property="og:url" content={route} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={htmlTitle} />
        <meta name="twitter:description" content={frontMatter.description} />
        <meta name="twitter:image" content={frontMatter.img} />
        <meta name="author" content="Darbaoui imad" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="https://nextjs.org/favicon.ico" />
        <meta name="robots" content="index,follow" />
      </Head>
      <nav className="Sidebar_container fixed bottom-auto top-0 left-0 right-0 w-full  items-center md:w-70 md:min-w-70 flex flex-col  md:h-screen md:max-h-screen overflow-hidden border-r">
        <header className="Sidebar_header md:flex-col flex w-full md:px-6 md:pt-6 h-16 px-6 md:h-auto">
          <BarTop pageOpts={pageOpts} />
        </header>
        <SideBarComponent pageOpts={pageOpts} />
      </nav>
      <div className="h-[calc(100vh_-_7rem)] md:h-screen flex-grow">
        <div className="layout_content pt-12 px-6 md:pt-12 md:pl-6 md:pb-0">
          <div className="flex flex-col w-full flex-grow">
            <div className="DocsArticle_article">
              {children}
              <NavLink pageOpts={pageOpts}></NavLink>
            </div>
          </div>
          <aside className="TableOfContents_aside toc-minimap md:block hidden">
            <div className="TableOfContents_container">
              <div className="Minimap_header gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  focusable="false"
                  aria-hidden="true"
                  className="fill-current"
                >
                  <path d="M2 3.5a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 2 3.5ZM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm.75 3.75a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Z"></path>
                </svg>
                <span className="text-title">On this page</span>
              </div>
              <Toc headings={headings} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
