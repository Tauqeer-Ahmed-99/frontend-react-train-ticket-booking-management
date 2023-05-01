import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  colors,
} from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router";
import { Cancel } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import UserContext from "../context/UserContext/UserContext";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import TicketsContext from "../context/TicketsContext/TicketsContext";
import { Routes } from "../routes/routes";

const TicketDetailsScreen = () => {
  const [isCancelPromptShowing, setIsCancelPromptShowing] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const [isCancelError, setIsCancelError] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const ticketContext = useContext(TicketsContext);

  const { action, ticketId } = useParams();

  const isCancellingTicket = action === "cancel";

  const validTicketBg = "#c1fac5";
  const invalidTicketBg = "#fabfbf";

  const goBack = () => {
    navigate(-1);
  };

  const ticket = ticketContext.userTickets.find(
    (ticket) => ticket.ticket_id === +(ticketId as string)
  );

  const isTicketValid =
    Date.parse(ticket?.expire_date as string) >
    Date.parse(new Date().toISOString());

  const srcStn = ticketContext.availableStations.find(
    (stn) => stn.station_id === ticket?.start_station
  );

  const destStn = ticketContext.availableStations.find(
    (stn) => stn.station_id === ticket?.end_station
  );

  const showableSrcStn =
    srcStn?.station_name?.length && srcStn?.station_name.length > 10
      ? srcStn?.station_name?.substring(0, 10) + "..."
      : srcStn?.station_name;

  const showableDestStn =
    destStn?.station_name?.length && destStn?.station_name.length > 10
      ? destStn?.station_name?.substring(0, 10) + "..."
      : destStn?.station_name;

  let distance = 0;

  if (
    (srcStn?.distance_from_origin || srcStn?.distance_from_origin === 0) &&
    (destStn?.distance_from_origin || destStn?.distance_from_origin === 0)
  ) {
    const dist_from_ogn = [
      +srcStn?.distance_from_origin,
      +destStn?.distance_from_origin,
    ].sort((a, b) => a - b);

    distance = Math.ceil(dist_from_ogn[1] - dist_from_ogn[0]);
  }

  const ticketType = ticketContext.availableTicketTypes.find(
    (type) => type.ticket_type_id === ticket?.ticket_type
  )?.ticket_type_name;

  const handleCancelTicketClick = async () => {
    setIsCancelLoading(true);
    const ticketId = ticket?.ticket_id;
    if (ticketId) {
      const response = await ticketContext.cancelTicket(+ticket?.ticket_id);
      setResponse(response);

      setIsCancelLoading(false);

      if (response.status === "success") {
        navigate(Routes.CancelTicketScreen);
      } else {
        setIsCancelError(true);
      }
    }
  };

  return (
    <Box>
      <Dialog open={isCancelPromptShowing} fullWidth>
        <DialogTitle>Cancel Ticket?</DialogTitle>
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
            <Typography>{ticket?.ticket_id}</Typography>
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
                Source Station
              </Typography>
              <Typography
                sx={{
                  fontSize: "small",
                }}
              >
                {showableSrcStn}
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
                Destination
              </Typography>
              <Typography
                sx={{
                  fontSize: "small",
                }}
              >
                {showableDestStn}
              </Typography>
            </Box>
          </Box>
          <Box mt="0.5rem" px="1rem">
            <Typography
              sx={{
                color: colors.blue[700],
                fontSize: "x-small",
                fontWeight: "bolder",
              }}
            >
              Fare
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <CurrencyRupeeIcon />
              {ticket?.fare}/-
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsCancelPromptShowing(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCancelTicketClick}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isCancelError} fullWidth>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Box px="1rem" display="flex">
            <Typography>{response?.message}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCancelError(false)}>close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isCancelLoading} fullWidth>
        <DialogContent>
          <Box px="1rem" display="flex" alignItems="center">
            <CircularProgress sx={{ mr: "1rem" }} />
            <Typography>Cancelling ticket...</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCancelError(false)}>close</Button>
        </DialogActions>
      </Dialog>
      <ResponsiveAppBar />
      <Container component="main" maxWidth="xs">
        <Paper
          sx={{
            mt: "2rem",
            background: isTicketValid ? validTicketBg : invalidTicketBg,
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
            Happy Journey
          </Typography>
          <Box
            mt="1rem"
            px="1rem"
            width="100%"
            display="flex"
            alignItems="center"
          >
            <Typography
              sx={{
                color: colors.blue[700],
                fontSize: "x-small",
                fontWeight: "bolder",
                mr: "0.5rem",
              }}
            >
              Ticket ID:
            </Typography>
            <Typography>{ticket?.ticket_id}</Typography>
          </Box>
          <Box
            mt="1rem"
            px="1rem"
            width="100%"
            display="flex"
            alignItems="center"
          >
            <Typography
              sx={{
                color: colors.blue[700],
                fontSize: "x-small",
                fontWeight: "bolder",
                mr: "0.5rem",
              }}
            >
              User:
            </Typography>
            <Typography>{userContext.user?.username}</Typography>
          </Box>
          <Box
            mt="1rem"
            px="1rem"
            width="100%"
            display="flex"
            alignItems="center"
          >
            <Typography
              sx={{
                color: colors.blue[700],
                fontSize: "x-small",
                fontWeight: "bolder",
                mr: "0.5rem",
              }}
            >
              Contact No:
            </Typography>
            <Typography>{userContext.user?.phone}</Typography>
          </Box>
          <Box
            mt="1rem"
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
                Source Station
              </Typography>
              <Typography>{showableSrcStn}</Typography>
            </Box>
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
              <Typography>{showableDestStn}</Typography>
            </Box>
          </Box>
          <Box
            my="1rem"
            px="1rem"
            width="100%"
            display="flex"
            alignItems="center"
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
            <Typography>{distance}</Typography>
          </Box>
          <Box
            px="1rem"
            mt="1rem"
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <Box display="flex">
              <Typography
                sx={{
                  mr: "1rem",
                  color: colors.blue[700],
                  fontSize: "x-small",
                  fontWeight: "bolder",
                }}
              >
                Adult: {ticket?.adult_count}
              </Typography>
              <Typography
                sx={{
                  color: colors.blue[700],
                  fontSize: "x-small",
                  fontWeight: "bolder",
                }}
              >
                Child:{ticket?.child_count}
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
                Class:{ticket?.ticket_class}
              </Typography>
            </Box>
          </Box>
          <Box
            mt="1rem"
            px="1rem"
            width="100%"
            display="flex"
            alignItems="center"
          >
            <Typography
              sx={{
                color: colors.blue[700],
                fontSize: "x-small",
                fontWeight: "bolder",
                mr: "1rem",
              }}
            >
              Ticket Type:
            </Typography>
            <Typography>{ticketType}</Typography>
          </Box>
          <Box mt="1rem" width="100%" bgcolor={colors.grey[200]}>
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
              <CurrencyRupeeIcon /> {ticket?.fare}/-
            </Typography>
          </Box>
          <Box
            mt="1rem"
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
                Validity From
              </Typography>
              <Typography>{ticket?.registration_date.split("T")[0]}</Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: colors.blue[700],
                  fontSize: "x-small",
                  fontWeight: "bolder",
                }}
              >
                Validity To
              </Typography>
              <Typography>{ticket?.expire_date.split("T")[0]}</Typography>
            </Box>
          </Box>
          <Box my="1rem" px="1rem" width="100%">
            <Typography
              sx={{
                color: colors.blue[700],
                fontSize: "x-small",
                fontWeight: "bolder",
              }}
            >
              Booking Time:
            </Typography>
            <Typography>
              {ticket?.registration_date.split("T")[0] +
                " " +
                ticket?.registration_date.split("T")[1].split(".")[0]}
            </Typography>
          </Box>
          {isCancellingTicket && isTicketValid && (
            <Button
              variant="contained"
              sx={{ mb: "1rem" }}
              fullWidth
              startIcon={<Cancel />}
              onClick={() => setIsCancelPromptShowing(true)}
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={goBack}
            variant="contained"
            fullWidth
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default TicketDetailsScreen;
