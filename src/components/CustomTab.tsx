import { Box, Typography, Paper } from "@mui/material";
import { Routes } from "../routes/routes";
import { useNavigate } from "react-router";

const CustomTab = ({
  path,
  name,
  icon,
}: {
  path: Routes;
  name: String;
  icon: React.ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <Paper
      variant="outlined"
      sx={{
        height: "4rem",
        width: "100%",
        padding: "0.25rem",
        cursor: "pointer",
      }}
      onClick={() => navigate(path)}
    >
      <Box
        height="4rem"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
        <Typography variant="caption" sx={{ fontSize: "12px", mt: "0.3rem" }}>
          {name}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CustomTab;
