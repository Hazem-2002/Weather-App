import Skeleton from "@mui/material/Skeleton";

export default function Placeholder({ height, width }) {
  return (
    <Skeleton
      variant="rounded"
      sx={{
        height: `${height}`,
        width: `${width}`,
        bgcolor: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
      }}
    />
  );
}
