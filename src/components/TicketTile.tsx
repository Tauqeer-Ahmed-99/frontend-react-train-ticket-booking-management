import { Paper, Box, Typography, colors } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import TicketsContext, {
  ITicket,
} from "../context/TicketsContext/TicketsContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Routes } from "../routes/routes";

const TicketTile = ({
  ticket,
  isShowingTicket,
}: {
  ticket: ITicket;
  isShowingTicket?: boolean;
}) => {
  const navigate = useNavigate();

  const ticketContext = useContext(TicketsContext);

  const type = ticketContext.availableTicketTypes
    .find((type) => type.ticket_type_id === ticket.ticket_type)
    ?.ticket_type_name.split(" ")[0];

  const srcStn = ticketContext.availableStations.find(
    (stn) => stn.station_id === ticket.start_station
  )?.station_name;

  const destStn = ticketContext.availableStations.find(
    (stn) => stn.station_id === ticket.end_station
  )?.station_name;

  const showableSrcStn =
    srcStn?.length && srcStn.length > 10
      ? srcStn?.substring(0, 10) + "..."
      : srcStn;

  const showableDestStn =
    destStn?.length && destStn.length > 10
      ? destStn?.substring(0, 10) + "..."
      : destStn;

  const handleTicketTileClick = () => {
    if (isShowingTicket) {
      navigate(`${Routes.ShowTicketsScreen}/view/${ticket.ticket_id}`);
    } else {
      navigate(`${Routes.ShowTicketsScreen}/cancel/${ticket.ticket_id}`);
    }
  };

  return (
    <Paper
      sx={{
        mt: "1rem",
        pb: "0.5rem",
        width: "100%",
        borderRadius: "0.5rem",
        cursor: "pointer",
      }}
      onClick={handleTicketTileClick}
    >
      <Box
        p="0.25rem"
        display="flex"
        justifyContent="space-around"
        bgcolor={colors.blue[700]}
        color="white"
        borderRadius="0.5rem"
      >
        <Typography>{type}</Typography>
        <Typography>Fare: {ticket.fare}</Typography>
      </Box>
      <Box mt="0.5rem" display="flex" justifyContent="space-around">
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <PlaceIcon />
          {showableSrcStn}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <WhereToVoteIcon />
          {showableDestStn}
        </Typography>
      </Box>
      <Box mt="0.5rem" display="flex" justifyContent="space-around">
        <Typography>Adult:{ticket.adult_count}</Typography>
        <Typography>Child:{ticket.child_count}</Typography>
      </Box>
      <Box mt="0.5rem" display="flex" justifyContent="space-around">
        <Typography>{ticket.registration_date.split("T")[0]}</Typography>
        <Typography
          sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
        >
          {isShowingTicket ? "View Ticket" : "Cancel Ticket"}
          {isShowingTicket ? (
            <KeyboardDoubleArrowRightIcon />
          ) : (
            <DoNotDisturbIcon />
          )}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TicketTile;
