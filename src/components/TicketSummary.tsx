import React, { useContext, useState } from "react";
import { Box, Typography, colors, Button } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";
import TicketsContext from "../context/TicketsContext/TicketsContext";
import { useNavigate } from "react-router";
import { Routes } from "../routes/routes";

const TicketSummary = ({
  bookingDetails,
  getFirstPage,
  clearBookingDetails,
}: {
  bookingDetails: {
    sourceStation: string;
    destinationStation: string;
    platformTicketStation: string;
    platformPersonCount: string;
    adultTravellersCount: string;
    childTravellersCount: string;
    ticketType: string;
    class: string;
  };
  getFirstPage: () => void;
  clearBookingDetails: (isPlatformBooking?: boolean) => void;
}) => {
  const [isBookingTicket, setIsBookingTicket] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [isBookingError, setIsBookingError] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const ticketContext = useContext(TicketsContext);

  const navigate = useNavigate();

  const ticketType = ticketContext.availableTicketTypes?.find(
    (type) => type.ticket_type_id === ticketContext.fareDetails?.type
  )?.ticket_type_name;

  const bookTicket = async () => {
    setIsBookingTicket(true);
    let res;
    if (bookingDetails.ticketType === "PLT") {
      res = await ticketContext.bookTicket(bookingDetails);
    } else {
      res = await ticketContext.bookTicket();
    }
    setIsBookingTicket(false);

    if (res.status === "success") {
      setIsBookingSuccess(true);
      setResponse(res.ticketDetails);
    } else {
      setIsBookingError(false);
    }
  };

  const handleShowTicketClick = () => {
    setIsBookingSuccess(false);
    clearBookingDetails(bookingDetails.ticketType === "PLT");
    getFirstPage();
    ticketContext.resetFareDetails();
    navigate(`${Routes.ShowTicketsScreen}/view/${response.ticket_id}`);
  };

  const platformTicketName = ticketContext.availableStations.find(
    (stn) => stn.station_id === bookingDetails.platformTicketStation
  )?.station_name;

  return (
    <>
      <Dialog open={isBookingTicket}>
        <DialogContent>
          <Box
            width="100%"
            p="1rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress sx={{ mr: "1rem" }} />
            <Typography>Booking ticket...</Typography>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={isBookingError}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Box
            width="100%"
            p="1rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography>{response?.message}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsBookingError(false);
              clearBookingDetails(true);
              ticketContext.resetFareDetails();
              getFirstPage();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isBookingSuccess} fullWidth>
        <DialogTitle>Ticket Booked</DialogTitle>
        <DialogContent>
          <Box px="1rem" display="flex">
            <Typography
              sx={{
                color: colors.blue[700],
                fontSize: "x-small",
                fontWeight: "bolder",
                display: "flex",
                alignItems: "center",
                mr: "0.5rem",
              }}
            >
              Ticket No:
            </Typography>
            <Typography>{response?.ticket_id}</Typography>
          </Box>
          <Box
            px="1rem"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                sx={{
                  color: colors.blue[700],
                  fontSize: "x-small",
                  fontWeight: "bolder",
                }}
              >
                {bookingDetails.ticketType === "PLT"
                  ? "Station"
                  : "Source Station"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "small",
                }}
              >
                {bookingDetails.ticketType === "PLT"
                  ? ticketContext.availableStations.find(
                      (stn) => stn.station_id === response?.start_station
                    )?.station_name
                  : ticketContext.fareDetails?.src_station.station_name}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: colors.blue[700],
                  fontSize: "x-small",
                  fontWeight: "bolder",
                }}
              >
                {bookingDetails.ticketType === "PLT"
                  ? "Ticket Type"
                  : "Destination"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "small",
                }}
              >
                {bookingDetails.ticketType === "PLT"
                  ? "PLATFORM"
                  : ticketContext.fareDetails?.dest_station.station_name}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsBookingSuccess(false);
              clearBookingDetails(bookingDetails.ticketType === "PLT");
              getFirstPage();
            }}
          >
            Close
          </Button>
          <Button variant="contained" onClick={handleShowTicketClick}>
            Show Ticket
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        px="1rem"
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography
            sx={{
              color: colors.blue[700],
              fontSize: "x-small",
              fontWeight: "bolder",
            }}
          >
            {bookingDetails.ticketType === "PLT" ? "Station" : "Source Station"}
          </Typography>
          <Typography>
            {bookingDetails.ticketType === "PLT"
              ? platformTicketName
              : ticketContext.fareDetails?.src_station.station_name}
          </Typography>
        </Box>
        {bookingDetails.ticketType !== "PLT" && (
          <Box>
            <Typography
              sx={{
                color: colors.blue[700],
                fontSize: "x-small",
                fontWeight: "bolder",
              }}
            >
              Destination
            </Typography>
            <Typography>
              {ticketContext.fareDetails?.dest_station.station_name}
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        px="1rem"
        mt="1rem"
        width="100%"
        display="flex"
        justifyContent="space-between"
      >
        <Box display="flex">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mr="1rem"
          >
            <Typography
              sx={{
                color: colors.blue[700],
                fontSize: "x-small",
                fontWeight: "bolder",
                mr: "0.5rem",
              }}
            >
              Adult:
            </Typography>
            <Typography>
              {bookingDetails.ticketType === "PLT"
                ? bookingDetails.platformPersonCount
                : ticketContext.fareDetails?.adult}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography
              sx={{
                color: colors.blue[700],
                fontSize: "x-small",
                fontWeight: "bolder",
                mr: "0.5rem",
              }}
            >
              Child:
            </Typography>
            <Typography>
              {bookingDetails.ticketType === "PLT"
                ? "0"
                : ticketContext.fareDetails?.child}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mr="1rem"
        >
          <Typography
            sx={{
              color: colors.blue[700],
              fontSize: "x-small",
              fontWeight: "bolder",
              mr: "0.5rem",
            }}
          >
            Class:
          </Typography>
          <Typography>
            {bookingDetails.ticketType === "PLT"
              ? "AC"
              : ticketContext.fareDetails?.tClass}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        width="100%"
      >
        <Box
          mt="1rem"
          px="1rem"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mr="1rem"
        >
          <Typography
            sx={{
              color: colors.blue[700],
              fontSize: "x-small",
              fontWeight: "bolder",
              mr: "0.5rem",
              minWidth: "4rem",
            }}
          >
            Ticket Type:
          </Typography>
          <Typography>
            {bookingDetails.ticketType === "PLT"
              ? "PLATFORM"
              : ticketType?.split(" ")[0]}
          </Typography>
        </Box>
        <Box
          mt="1rem"
          px="1rem"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mr="1rem"
        >
          <Typography
            sx={{
              color: colors.blue[700],
              fontSize: "x-small",
              fontWeight: "bolder",
              mr: "0.5rem",
            }}
          >
            Distance:
          </Typography>
          <Typography>
            {bookingDetails.ticketType === "PLT"
              ? "0"
              : ticketContext.fareDetails?.distance}
            KM
          </Typography>
        </Box>
      </Box>
      <Box mt="1rem" p="1rem" width="100%" bgcolor={colors.grey[200]}>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: colors.blue[700],
            fontSize: "medium",
            fontWeight: "bolder",
          }}
        >
          Total Fare:
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CurrencyRupeeIcon />{" "}
          {bookingDetails.ticketType === "PLT"
            ? parseInt(bookingDetails.platformPersonCount ?? "0") * 5
            : ticketContext.fareDetails?.fare}
          /-
        </Typography>
      </Box>
      <Button fullWidth variant="contained" onClick={bookTicket}>
        Book Ticket
      </Button>
    </>
  );
};

export default TicketSummary;
