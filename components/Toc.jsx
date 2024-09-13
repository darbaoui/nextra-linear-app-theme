import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { cn } from "../lib/utils";

const Toc = ({ headings, className }) => {
  const [activeSection, setActiveSection] = useState("");

  const [topOffset, setTopOffset] = useState(0); // To track the position of the active item
  const tocRef = useRef(null);
  const router = useRouter(); // Hook for managing routing

  useEffect(() => {
    const domHeadings = document.querySelectorAll("h2, h3");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: "0px 0px -70%",
        threshold: 1,
      }
    );

    domHeadings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    if (activeSection && tocRef.current) {
      const activeItem = tocRef.current.querySelector(`li a.active`);
      if (activeItem) {
        const containerRect = tocRef.current.getBoundingClientRect();
        const activeItemRect = activeItem.getBoundingClientRect();
        const offsetTop = activeItemRect.top - containerRect.top;
        setTopOffset(offsetTop); // Update the top offset
      }
    }
  }, [activeSection]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          const offset = 40;
          const elementPosition =
            targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 200);
      }
    }
  }, []);

  const handleClick = (event) => {
    event.preventDefault();

    const targetId = event.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      router.push(`#${targetId}`, undefined, { shallow: true });
      setTimeout(() => {
        const offset = 40;
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 0);
    }
  };

  return (
    <ul
      ref={tocRef}
      className={cn("TableOfContents_ul", className)}
      style={{ "--top": `${topOffset}px`, "--height": "18px" }}
    >
      {headings &&
        headings.map((heading, index) => (
          <li
            style={{
              marginLeft: (heading.depth - 2) * 20 + "px",
            }}
            className={cn(
              "font-normal",
              heading.id === activeSection ? "text-title" : "text-description"
            )}
            key={heading.id}
            onClick={handleClick}
          >
            <a
              href={`#${heading.id}`}
              className={heading.id === activeSection ? "active" : ""}
            >
              {heading.value}
            </a>
          </li>
        ))}
    </ul>
  );
};

export default Toc;
