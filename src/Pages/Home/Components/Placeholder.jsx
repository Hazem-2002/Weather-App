import Skeleton from "@mui/material/Skeleton";

export default function Placeholder( props ) {
  console.log(props);
  return (
    <Skeleton
      variant="rounded"
      sx={{
        ...props,
        bgcolor: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
      }}
    />
  );
}
