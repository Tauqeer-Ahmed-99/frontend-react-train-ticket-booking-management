import React, { useContext, useState } from "react";
import OptionSet from "./OptionSet";
import { Button, Box, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import TicketsContext from "../context/TicketsContext/TicketsContext";

const DetailsForm = ({
  getNextPage,
  bookingDetails,
  selectedAdultCount,
  selectedChildCount,
  selectedTicketType,
  selectedClass,
  handleAdultCountChange,
  handleChildCountChange,
  handleTicketTypeChange,
  handleTicketClassChange,
}: {
  getNextPage: () => void;
  bookingDetails: {
    sourceStation: string;
    destinationStation: string;
    adultTravellersCount: string;
    childTravellersCount: string;
    ticketType: string;
    class: string;
  };
  selectedAdultCount: string;
  selectedChildCount: string;
  selectedTicketType: string;
  selectedClass: string;
  handleAdultCountChange: (adultCount: string) => void;
  handleChildCountChange: (childCount: string) => void;
  handleTicketTypeChange: (ticketType: string) => void;
  handleTicketClassChange: (ticketClass: string) => void;
}) => {
  const [isAdultCountError, setIsAdultCountError] = useState(false);
  const [isChildCountError, setIsChildCountError] = useState(false);
  const [isTicketTypeError, setIsTicketTypeError] = useState(false);
  const [isTicketClassError, setIsTicketClassError] = useState(false);
  const [isFareLoading, setIsFareLoading] = useState(false);

  const ticketContext = useContext(TicketsContext);

  const availableTicketTypes = ticketContext?.availableTicketTypes?.map(
    (type) => ({ id: type.ticket_type_id, label: type.ticket_type_name })
  );

  const availableTicketClasses = ticketContext?.availableTicketClasses?.map(
    (type) => ({ id: type.ticket_class_id, label: type.ticket_class_name })
  );

  return (
    <>
      <Dialog open={isFareLoading}>
        <DialogContent>
          <Box
            width="100%"
            p="1rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress sx={{ mr: "1rem" }} />
            <Typography>Getting fare, Please wait...</Typography>
          </Box>
        </DialogContent>
      </Dialog>
      <OptionSet
        label="Adult"
        options={[
          { id: "0", label: "Zero (0)" },
          { id: "1", label: "One (1)" },
          { id: "2", label: "Two (2)" },
          { id: "3", label: "Three (3)" },
          { id: "4", label: "Four (4)" },
        ]}
        value={selectedAdultCount}
        error={isAdultCountError}
        onChange={(event) => handleAdultCountChange(event.target.value)}
      />
      <OptionSet
        label="Child"
        options={[
          { id: "0", label: "Zero (0)" },
          { id: "2", label: "Two (2)" },
          { id: "3", label: "Three (3)" },
          { id: "4", label: "Four (4)" },
        ]}
        value={selectedChildCount}
        error={isChildCountError}
        onChange={(event) => handleChildCountChange(event.target.value)}
      />
      <OptionSet
        label="Ticket Type"
        options={availableTicketTypes}
        value={selectedTicketType}
        error={isTicketTypeError}
        onChange={(event) => handleTicketTypeChange(event.target.value)}
      />
      <OptionSet
        label="Class"
        options={availableTicketClasses}
        value={selectedClass}
        error={isTicketClassError}
        onChange={(event) => handleTicketClassChange(event.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={async () => {
          if (!selectedAdultCount) {
            setIsAdultCountError(true);
          }
          if (!selectedChildCount) {
            setIsChildCountError(true);
          }
          if (!selectedTicketType) {
            setIsTicketTypeError(true);
          }
          if (!selectedClass) {
            setIsTicketClassError(true);
          }
          if (
            selectedAdultCount &&
            selectedChildCount &&
            selectedTicketType &&
            selectedClass
          ) {
            setIsFareLoading(true);
            const src = bookingDetails.sourceStation;
            const dest = bookingDetails.destinationStation;
            const ticketClass = bookingDetails.class;
            const type = bookingDetails.ticketType;
            const adult = bookingDetails.adultTravellersCount;
            const child = bookingDetails.childTravellersCount;

            const response = await ticketContext.getTicketFare(
              src,
              dest,
              ticketClass,
              type,
              adult,
              child
            );
            setIsFareLoading(false);
            if (response.status === "success") {
              getNextPage();
            }
          }
        }}
      >
        Get Fare
      </Button>
    </>
  );
};

export default DetailsForm;
