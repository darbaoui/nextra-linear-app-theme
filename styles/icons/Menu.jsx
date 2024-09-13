import * as React from "react";
import { cn } from "../../lib/utils";
const Menu = ({ size = 14, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={cn("stroke-current", className)}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {" "}
    <path d="M3 7H21" strokeWidth={1.5} strokeLinecap="round" />
    <path d="M3 12H21" strokeWidth={1.5} strokeLinecap="round" />
    <path d="M3 17H21" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);
export default Menu;
