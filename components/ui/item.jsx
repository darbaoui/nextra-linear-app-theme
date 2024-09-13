import { cn } from "@/lib/utils";
import Icon from "../Icon";

const Item = ({ className, children, icon, ...props }) => {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-center rounded-md gap-1.5 px-2 h-7.5 outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      {icon && <Icon iconName={icon} />}
      <span className="flex grow overflow-hidden">{children}</span>
    </div>
  );
};

export default Item;
