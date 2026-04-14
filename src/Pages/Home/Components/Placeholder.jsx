import React from "react";
import Skeleton from "@mui/material/Skeleton";

function Placeholder(props) {
  console.log(props);
  return (
    <Skeleton
      variant="rounded"
      sx={{
        ...props,
        bgcolor: "rgb(var(--foreground-rgb)/.15)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
      }}
    />
  );
}

export default React.memo(Placeholder);
