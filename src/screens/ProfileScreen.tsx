import React, { useContext } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IndianRailways from "../assets/Indian_Railway.png";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import UserContext from "../context/UserContext/UserContext";

const ProfileScreen = () => {
  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <>
      <ResponsiveAppBar />
      <Container component="main" maxWidth="xs">
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
            Profile
          </Typography>
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar> */}
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
                  disabled
                  value={userContext.user?.username.split(" ")[0]}
                  // error={formErrors.firstName}
                  // helperText={
                  //   formErrors.firstName
                  //     ? "Firstname must be atleast 4 characters long."
                  //     : ""
                  // }
                  // onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="last-name"
                  disabled
                  value={userContext.user?.username.split(" ")[1]}
                  // error={formErrors.lastName}
                  // helperText={
                  //   formErrors.lastName
                  //     ? "Lastname must be atleast 4 characters long."
                  //     : ""
                  // }
                  // onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userid"
                  label="UserID"
                  name="userid"
                  autoComplete="userid"
                  disabled
                  value={userContext.user?.userId}
                  // error={formErrors.username}
                  // helperText={
                  //   formErrors.username
                  //     ? "Username must be atleast 4 characters long."
                  //     : ""
                  // }
                  // onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  disabled
                  value={userContext.user?.username}
                  // error={formErrors.username}
                  // helperText={
                  //   formErrors.username
                  //     ? "Username must be atleast 4 characters long."
                  //     : ""
                  // }
                  // onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  disabled
                  value={userContext.user?.email}
                  // error={formErrors.email}
                  // helperText={
                  //   formErrors.email ? "Please enter a valid email address." : ""
                  // }
                  // onChange={handleChange}
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
                  disabled
                  value={userContext.user?.address}
                  // error={formErrors.addressLine1}
                  // helperText={
                  //   formErrors.addressLine1
                  //     ? "Must be atleast 4 characters long."
                  //     : ""
                  // }
                  // onChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="addressLine2"
                label="Address Line 2"
                type="text"
                id="addressLine2"
                disabled
                value={formValues.addressLine2}
                // error={formErrors.addressLine2}
                // helperText={
                //   formErrors.addressLine2
                //     ? "Must be atleast 4 characters long."
                //     : ""
                // }
                // onChange={handleChange}
              />
            </Grid> */}
            </Grid>
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: "1rem" }}
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ProfileScreen;
