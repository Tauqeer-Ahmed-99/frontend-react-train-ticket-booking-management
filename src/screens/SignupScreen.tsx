import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate } from "react-router";
import { Routes } from "../routes/routes";
import CircularProgress from "@mui/material/CircularProgress";
import IndianRailways from "../assets/Indian_Railway.png";
import UserContext from "../context/UserContext/UserContext";
import { DialogContent } from "@mui/material";

const SignupScreen = () => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    // username: "",
    email: "",
    phone: "",
    password: "",
    addressLine1: "",
    addressLine2: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({
    firstName: false,
    lastName: false,
    // username: false,
    email: false,
    phone: false,
    password: false,
    addressLine1: false,
    addressLine2: false,
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isTermsError, setIsTermsError] = useState(false);
  const [isSigningUpLoading, setIsSigningUpLoading] = useState(false);
  const [isSigningUpError, setIsSigningUpError] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
    setIsTermsError(!event.target.checked);
  };

  const handleSignup = async () => {
    const isEmailValid = (email: string) => {
      return !new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(
        email
      );
    };

    const errors: { [key: string]: boolean } = {
      firstName: false,
      lastName: false,
      // username: false,
      email: false,
      phone: false,
      password: false,
      addressLine1: false,
      addressLine2: false,
    };

    for (const fieldName in formValues) {
      // setFormErrors((prevErrors) => ({
      //   ...prevErrors,
      //   [fieldName]:
      //     fieldName === "email"
      //       ? isEmailValid(formValues[fieldName])
      //       : !formValues[fieldName],
      // }));
      errors[fieldName] =
        fieldName === "email"
          ? isEmailValid(formValues[fieldName])
          : fieldName === "password"
          ? formValues[fieldName].length <= 8
          : formValues[fieldName].length <= 4;
    }

    setFormErrors(errors);
    setIsTermsError(!termsAccepted);

    const isError =
      Object.values(errors).some((error) => error) && termsAccepted;

    if (!isError) {
      setIsSigningUpLoading(true);
      const username =
        formValues.firstName.trim() + " " + formValues.lastName.trim();
      const email = formValues.email.trim();
      const password = formValues.password.trim();
      const phone = formValues.phone.trim();
      const address =
        formValues.addressLine1.trim() + " " + formValues.addressLine2.trim();
      const res = await userContext.signup(
        username,
        email,
        password,
        phone,
        address
      );
      setIsSigningUpLoading(false);
      if (res.status === "success") {
        navigate(Routes.DashboardScreen);
      } else {
        setIsSigningUpError(true);
        setResponse(res);
      }
    }
  };

  const handleAlreadyHaveAnAccountClick = () => {
    navigate(Routes.LoginScreen);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Dialog open={isSigningUpLoading}>
        <DialogContent>
          <Box
            width="100%"
            p="1rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress sx={{ mr: "1rem" }} />
            <Typography>Signing up, Please wait...</Typography>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={isSigningUpError}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{response?.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setIsSigningUpError(false)}
          >
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
          Sign up
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formValues.firstName}
                error={formErrors.firstName}
                helperText={
                  formErrors.firstName
                    ? "Firstname must be atleast 4 characters long."
                    : ""
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formValues.lastName}
                error={formErrors.lastName}
                helperText={
                  formErrors.lastName
                    ? "Lastname must be atleast 4 characters long."
                    : ""
                }
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formValues.username}
                error={formErrors.username}
                helperText={
                  formErrors.username
                    ? "Username must be atleast 4 characters long."
                    : ""
                }
                onChange={handleChange}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formValues.email}
                error={formErrors.email}
                helperText={
                  formErrors.email ? "Please enter a valid email address." : ""
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Contact No"
                name="phone"
                autoComplete="phone"
                value={formValues.phone}
                error={formErrors.phone}
                type="number"
                helperText={
                  formErrors.phone ? "Please enter a valid Contact no." : ""
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formValues.password}
                error={formErrors.password}
                helperText={
                  formErrors.password
                    ? "Password must be atleast 8 characters long."
                    : ""
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="addressLine1"
                label="Address Line 1"
                type="text"
                id="addressLine1"
                value={formValues.addressLine1}
                error={formErrors.addressLine1}
                helperText={
                  formErrors.addressLine1
                    ? "Must be atleast 4 characters long."
                    : ""
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="addressLine2"
                label="Address Line 2"
                type="text"
                id="addressLine2"
                value={formValues.addressLine2}
                error={formErrors.addressLine2}
                helperText={
                  formErrors.addressLine2
                    ? "Must be atleast 4 characters long."
                    : ""
                }
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                checked={termsAccepted}
                onChange={handleTermsChange}
              />
            }
            sx={{ mt: "1rem" }}
            label="By Signing up, I accept the Terms & Conditions."
          />
          {isTermsError && (
            <Typography sx={{ color: "red" }}>
              Please accept Terms & Conditions.
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSignup}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body2"
              sx={{
                "&:hover": { textDecoration: "underline", cursor: "pointer" },
              }}
              onClick={handleAlreadyHaveAnAccountClick}
            >
              {"Already have an account? Login"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupScreen;
