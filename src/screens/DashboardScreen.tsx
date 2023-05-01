import React, { useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Typography,
  colors,
} from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import TrainIcon from "@mui/icons-material/Train";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import HistoryIcon from "@mui/icons-material/History";
import StyleIcon from "@mui/icons-material/Style";
import { Routes } from "../routes/routes";
import CustomButtonTile from "../components/CustomButtonTile";
import CustomTab from "../components/CustomTab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Mode, PageType } from "../utils/utility";
import BookTicket from "../components/BookTicket";
import DetailsForm from "../components/DetailsForm";
import TicketSummary from "../components/TicketSummary";

const DashboardScreen = () => {
  const [page, setPage] = useState(PageType.BookingPage);
  const [mode, setMode] = useState(Mode.NormalBooking);

  const [bookingDetails, setBookingDetails] = useState({
    sourceStation: "",
    destinationStation: "",
    platformTicketStation: "",
    platformPersonCount: "1",
    adultTravellersCount: "1",
    childTravellersCount: "0",
    ticketType: "",
    class: "",
  });

  const handleCustomButtonClick = (mode: Mode) => {
    clearBookingDetails();
    setMode(mode as Mode);
    setPage(0);
    if (mode === Mode.PlatformBooking) {
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        ticketType: "PLT",
      }));
    }
  };

  const getFirstPage = () => {
    setPage(0);
  };

  const getNextPage = () => {
    if (mode !== Mode.PlatformBooking) {
      setPage((prevPage) => prevPage + 1);
    } else {
      setPage((prevPage) => prevPage + 2);
    }
  };

  const getPreviousPage = () => {
    if (mode !== Mode.PlatformBooking) {
      setPage((prevPage) => prevPage - 1);
    } else {
      setPage((prevPage) => prevPage - 2);
    }
  };

  const clearBookingDetails = (isPLatformTicketReset?: boolean) => {
    setBookingDetails({
      sourceStation: "",
      destinationStation: "",
      platformTicketStation: "",
      platformPersonCount: "1",
      adultTravellersCount: "1",
      childTravellersCount: "0",
      ticketType: isPLatformTicketReset ? "PLT" : "",
      class: "",
    });
  };

  const handleSourceStationChange = (sourceStation: string) => {
    setBookingDetails((prevDetails) => ({ ...prevDetails, sourceStation }));
  };

  const handleDestinationStationChange = (destinationStation: string) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      destinationStation,
    }));
  };

  const handleAdultCountChange = (adultCount: string) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      adultTravellersCount: adultCount,
    }));
  };

  const handleChildCountChange = (childCount: string) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      childTravellersCount: childCount,
    }));
  };

  const handlePlatformTicketStationChange = (platformStation: string) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      platformTicketStation: platformStation,
    }));
  };

  const handlePlatformPersonCountChange = (personCount: string) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      platformPersonCount: personCount,
    }));
  };

  const handleTicketTypeChange = (ticketType: string) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      ticketType: ticketType,
    }));

    if (ticketType === "SSN") {
      setMode(Mode.SeasonBooking);
    } else if (ticketType === "PLT") {
      clearBookingDetails(true);
      setMode(Mode.PlatformBooking);
      setPage(0);
    }
  };

  const handleClassChange = (ticketClass: string) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      class: ticketClass,
    }));
  };

  return (
    <Box>
      <ResponsiveAppBar />
      <Container component="main" maxWidth="xs">
        <Box
          mt="2rem"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <CustomButtonTile
            label={Mode.NormalBooking}
            onClick={handleCustomButtonClick}
            isActive={mode === Mode.NormalBooking}
            icon={<ConfirmationNumberIcon />}
          />
          <CustomButtonTile
            label={Mode.PlatformBooking}
            onClick={handleCustomButtonClick}
            isActive={mode === Mode.PlatformBooking}
            icon={<TrainIcon />}
          />
          <CustomButtonTile
            label={Mode.SeasonBooking}
            onClick={handleCustomButtonClick}
            isActive={mode === Mode.SeasonBooking}
            icon={<LocalActivityIcon />}
          />
        </Box>
        <Box
          mt="1rem"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          gap={1}
        >
          <CustomTab
            path={Routes.CancelTicketScreen}
            name="Cancel Ticket"
            icon={<CancelPresentationIcon color="info" />}
          />
          <CustomTab
            path={Routes.BookingHistoryScreen}
            name="Booking History"
            icon={<HistoryIcon color="info" />}
          />
          <CustomTab
            path={Routes.ShowTicketsScreen}
            name="Show Ticket"
            icon={<StyleIcon color="info" />}
          />
        </Box>
        <Paper
          sx={{
            mt: "2rem",
            width: "100%",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          }}
        >
          <Typography
            sx={{
              p: "0.5rem",
              pl: "1rem",
              background: colors.blue[700],
              color: "#ffffff",
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {page === 2 ? "Ticket Summary" : mode}
            <IconButton disabled={page === 0} onClick={getPreviousPage}>
              {
                <ArrowBackIcon
                  sx={{ color: page !== 0 ? "#ffffff" : "#1976d2" }}
                />
              }
            </IconButton>
          </Typography>
          <Box
            mt="1rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            {page === 0 ? (
              <BookTicket
                mode={mode}
                getNextPage={getNextPage}
                selectedSourceStn={bookingDetails.sourceStation}
                selectedDestStn={bookingDetails.destinationStation}
                selectedPlatformTicketStn={bookingDetails.platformTicketStation}
                selectedPlatformPersonCount={bookingDetails.platformPersonCount}
                handleDestinationStationChange={handleDestinationStationChange}
                handleSourceStationChange={handleSourceStationChange}
                handlePlatformTicketStationChange={
                  handlePlatformTicketStationChange
                }
                handlePlatformPersonCountChange={
                  handlePlatformPersonCountChange
                }
              />
            ) : page === 1 ? (
              <DetailsForm
                getNextPage={getNextPage}
                bookingDetails={bookingDetails}
                selectedAdultCount={bookingDetails.adultTravellersCount}
                selectedChildCount={bookingDetails.childTravellersCount}
                selectedTicketType={bookingDetails.ticketType}
                selectedClass={bookingDetails.class}
                handleAdultCountChange={handleAdultCountChange}
                handleChildCountChange={handleChildCountChange}
                handleTicketTypeChange={handleTicketTypeChange}
                handleTicketClassChange={handleClassChange}
              />
            ) : (
              <TicketSummary
                bookingDetails={bookingDetails}
                getFirstPage={getFirstPage}
                clearBookingDetails={clearBookingDetails}
              />
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default DashboardScreen;
