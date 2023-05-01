import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IndianRailways from "../assets/Indian_Railway.png";
import { useNavigate } from "react-router";
import { Routes } from "../routes/routes";
import UserContext from "../context/UserContext/UserContext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remeberMe, setRememberMe] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoginLoading, setIsLogInLoading] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async () => {
    if (email && password) {
      setIsLogInLoading(true);
      const res = await userContext.signin(email, password);
      if (res.status === "success") {
        navigate(Routes.DashboardScreen);
      } else {
        setIsLoginError(true);
        setResponse(res);
      }
      setIsLogInLoading(false);
    } else {
      setIsError(true);
    }
  };

  const handleDontHaveAccountClick = () => {
    navigate(Routes.SignupScreen);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Dialog open={isLoginLoading}>
        <DialogContent>
          <Box
            width="100%"
            p="1rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress sx={{ mr: "1rem" }} />
            <Typography>Signing in, Please wait...</Typography>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={isLoginError}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{response?.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setIsLoginError(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box mb="2rem">
          <img
            src={IndianRailways}
            alt="Indian Railways Logo"
            height={"100rem"}
          />
        </Box>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={isError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            error={isError}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                checked={remeberMe}
                onChange={handleRememberMeChange}
              />
            }
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body2"
              sx={{
                "&:hover": { textDecoration: "underline", cursor: "pointer" },
              }}
              onClick={handleDontHaveAccountClick}
            >
              {"Don't have an account? Sign Up"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginScreen;
