import React, { useContext } from "react";
import { Box, Container, Typography, colors } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import HistoryIcon from "@mui/icons-material/History";
import TicketTile from "../components/TicketTile";
import TicketsContext from "../context/TicketsContext/TicketsContext";

const BookingHistoryScreen = () => {
  const ticketContext = useContext(TicketsContext);

  return (
    <Box>
      <ResponsiveAppBar />
      <Container component="main" maxWidth="xs">
        <Typography
          sx={{
            mt: "1rem",
            p: "0.5rem",
            pl: "1rem",
            background: colors.blue[700],
            color: "#ffffff",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HistoryIcon sx={{ mr: "1rem" }} />
          Booking History
        </Typography>
        {ticketContext.userTickets.map((ticket) => (
          <TicketTile key={ticket.ticket_id} ticket={ticket} isShowingTicket />
        ))}
      </Container>
    </Box>
  );
};

export default BookingHistoryScreen;
