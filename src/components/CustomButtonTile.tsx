import { Button, Typography } from "@mui/material";
import { Mode } from "../utils/utility";

const CustomButtonTile = ({
  label,
  icon,
  onClick,
  isActive,
}: {
  label: Mode;
  icon: React.ReactNode;
  onClick: (label: Mode) => void;
  isActive: boolean;
}) => {
  return (
    <Button
      sx={{
        height: "4rem",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      variant={isActive ? "contained" : "text"}
      onClick={() => onClick(label)}
    >
      {icon}
      <Typography sx={{ fontSize: "12px" }}>{label}</Typography>
    </Button>
  );
};

export default CustomButtonTile;
