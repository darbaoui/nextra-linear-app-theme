import dynamic from "next/dynamic";
import React from "react";

const Icon = ({ iconName }) => {
  const DynamicIcon = dynamic(() => import(`@/styles/icons/${iconName}`), {
    ssr: false,
  });

  return <DynamicIcon />;
};

export default Icon;
