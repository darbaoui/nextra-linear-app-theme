"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn, Flexsearch } from "../lib/utils";
import Logo from "../styles/icons/Logo";
const BarTop = ({ pageOpts }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    if (theme) {
      setIsDark(theme == "dark");
      setIsLight(theme == "light");
    }
  }, [theme]);
  return (
    <>
      <div className="md:mb-6 items-center w-full flex justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="bg-input w-px h-4" style={{ width: "1px" }}></div>
          <span className="font-semibold text-description text-sm">Docs</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="border flex items-center rounded-full px-1  h-8">
            <Button
              variant="outline"
              className={cn(
                "h-6 rounded-full px-2  border-none shadow-none",
                isDark ? "bg-accent text-description" : "text-title"
              )}
              size="icon"
              onClick={() => setTheme("dark")}
            >
              <svg
                width="14"
                viewBox="0 0 24 24"
                fill="none"
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.5287 15.9294C21.3687 15.6594 20.9187 15.2394 19.7987 15.4394C19.1787 15.5494 18.5487 15.5994 17.9187 15.5694C15.5887 15.4694 13.4787 14.3994 12.0087 12.7494C10.7087 11.2994 9.90873 9.40938 9.89873 7.36938C9.89873 6.22938 10.1187 5.12938 10.5687 4.08938C11.0087 3.07938 10.6987 2.54938 10.4787 2.32938C10.2487 2.09938 9.70873 1.77938 8.64873 2.21938C4.55873 3.93938 2.02873 8.03938 2.32873 12.4294C2.62873 16.5594 5.52873 20.0894 9.36873 21.4194C10.2887 21.7394 11.2587 21.9294 12.2587 21.9694C12.4187 21.9794 12.5787 21.9894 12.7387 21.9894C16.0887 21.9894 19.2287 20.4094 21.2087 17.7194C21.8787 16.7894 21.6987 16.1994 21.5287 15.9294Z" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-6 rounded-full px-2 border-none shadow-none",
                isLight ? "bg-accent text-description" : "text-title"
              )}
              onClick={() => setTheme("light")}
            >
              <svg
                width="14"
                viewBox="0 0 24 24"
                fill="none"
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" />
                <path d="M12 22.96C11.45 22.96 11 22.55 11 22V21.92C11 21.37 11.45 20.92 12 20.92C12.55 20.92 13 21.37 13 21.92C13 22.47 12.55 22.96 12 22.96ZM19.14 20.14C18.88 20.14 18.63 20.04 18.43 19.85L18.3 19.72C17.91 19.33 17.91 18.7 18.3 18.31C18.69 17.92 19.32 17.92 19.71 18.31L19.84 18.44C20.23 18.83 20.23 19.46 19.84 19.85C19.65 20.04 19.4 20.14 19.14 20.14ZM4.86 20.14C4.6 20.14 4.35 20.04 4.15 19.85C3.76 19.46 3.76 18.83 4.15 18.44L4.28 18.31C4.67 17.92 5.3 17.92 5.69 18.31C6.08 18.7 6.08 19.33 5.69 19.72L5.56 19.85C5.37 20.04 5.11 20.14 4.86 20.14ZM22 13H21.92C21.37 13 20.92 12.55 20.92 12C20.92 11.45 21.37 11 21.92 11C22.47 11 22.96 11.45 22.96 12C22.96 12.55 22.55 13 22 13ZM2.08 13H2C1.45 13 1 12.55 1 12C1 11.45 1.45 11 2 11C2.55 11 3.04 11.45 3.04 12C3.04 12.55 2.63 13 2.08 13ZM19.01 5.99C18.75 5.99 18.5 5.89 18.3 5.7C17.91 5.31 17.91 4.68 18.3 4.29L18.43 4.16C18.82 3.77 19.45 3.77 19.84 4.16C20.23 4.55 20.23 5.18 19.84 5.57L19.71 5.7C19.52 5.89 19.27 5.99 19.01 5.99ZM4.99 5.99C4.73 5.99 4.48 5.89 4.28 5.7L4.15 5.56C3.76 5.17 3.76 4.54 4.15 4.15C4.54 3.76 5.17 3.76 5.56 4.15L5.69 4.28C6.08 4.67 6.08 5.3 5.69 5.69C5.5 5.89 5.24 5.99 4.99 5.99ZM12 3.04C11.45 3.04 11 2.63 11 2.08V2C11 1.45 11.45 1 12 1C12.55 1 13 1.45 13 2C13 2.55 12.55 3.04 12 3.04Z" />
              </svg>
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-6 md:hidden rounded-full px-2 border-none shadow-none"
            )}
            onClick={() => setOpen(true)}
          >
            <Search size={14} />
          </Button>
        </div>
      </div>
      <div
        className="cursor-pointer hidden md:flex group text-13 text-title hover:border-input rounded-lg px-2 border bg-accent items-center h-9"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <div className="flex flex-grow items-center gap-2 group-hover:text-title-secondary">
          <Search size={14} />
          Search Docs
        </div>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 text-[10px] font-medium text-muted-foreground group-hover:text-title-secondary opacity-100">
          <span className="text-xs">⌘</span>k
        </kbd>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 w-140 dialog overflow-hidden">
          <Flexsearch
            className="flex flex-col w-full !mt-0"
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default BarTop;
