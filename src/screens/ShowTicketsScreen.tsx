import React, { useContext } from "react";
import { Box, Container, Typography, colors } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import StyleIcon from "@mui/icons-material/Style";
import TicketTile from "../components/TicketTile";
import TicketsContext from "../context/TicketsContext/TicketsContext";

const ShowTicketsScreen = () => {
  const ticketContext = useContext(TicketsContext);

  const tickets = ticketContext.userTickets;
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
          <StyleIcon sx={{ mr: "1rem" }} />
          Booking History
        </Typography>
        {tickets
          .filter(
            (ticket) =>
              Date.parse(ticket.expire_date) >
              Date.parse(new Date().toISOString())
          )
          .map((ticket) => (
            <TicketTile
              key={ticket.ticket_id}
              isShowingTicket
              ticket={ticket}
            />
          ))}
      </Container>
    </Box>
  );
};

export default ShowTicketsScreen;
