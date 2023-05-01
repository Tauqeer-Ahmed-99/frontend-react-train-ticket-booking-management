import React, { useContext, useState } from "react";
import OptionSet from "./OptionSet";
import { Mode } from "../utils/utility";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Button } from "@mui/material";
import TicketsContext from "../context/TicketsContext/TicketsContext";

const BookTicket = ({
  mode,
  getNextPage,
  selectedSourceStn,
  selectedDestStn,
  selectedPlatformTicketStn,
  selectedPlatformPersonCount,
  handleDestinationStationChange,
  handleSourceStationChange,
  handlePlatformTicketStationChange,
  handlePlatformPersonCountChange,
}: {
  mode: Mode;
  getNextPage: () => void;
  selectedSourceStn: string;
  selectedDestStn: string;
  selectedPlatformTicketStn: string;
  selectedPlatformPersonCount: string;
  handleSourceStationChange: (sourceStation: string) => void;
  handleDestinationStationChange: (destinationStation: string) => void;
  handlePlatformTicketStationChange: (platformStation: string) => void;
  handlePlatformPersonCountChange: (personCount: string) => void;
}) => {
  const [isSrcStnError, setIsSrcStnError] = useState(false);
  const [isDestStnError, setIsDestStnError] = useState(false);
  const [isPlatformStationError, setIsPlatformStationError] = useState(false);
  const [isPlatformPersonCountError, setIsPlatformPersonCountError] =
    useState(false);

  const ticketsContext = useContext(TicketsContext);

  const availableStations = ticketsContext?.availableStations?.map((stn) => ({
    id: stn.station_id,
    label: stn.station_name,
  }));

  switch (mode) {
    case Mode.NormalBooking:
    case Mode.SeasonBooking:
      return (
        <>
          <OptionSet
            label="Depart from"
            helperText="Station Name"
            options={availableStations}
            value={selectedSourceStn}
            onChange={(event) => handleSourceStationChange(event.target.value)}
            error={isSrcStnError}
          />
          <KeyboardDoubleArrowDownIcon
            color="disabled"
            sx={{ my: "1rem", transform: "scale(3)" }}
          />
          <OptionSet
            label="Going to"
            helperText="Station Name"
            options={availableStations}
            value={selectedDestStn}
            onChange={(event) =>
              handleDestinationStationChange(event.target.value)
            }
            error={isDestStnError}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              if (!selectedSourceStn) {
                setIsSrcStnError(true);
              }
              if (!selectedDestStn) {
                setIsDestStnError(true);
              }

              if (selectedSourceStn && selectedDestStn) {
                getNextPage();
              }
            }}
          >
            Next
          </Button>
        </>
      );
    case Mode.PlatformBooking:
      return (
        <>
          <OptionSet
            label="Station Name"
            options={availableStations}
            value={selectedPlatformTicketStn}
            error={isPlatformStationError}
            onChange={(event) =>
              handlePlatformTicketStationChange(event.target.value)
            }
          />
          <OptionSet
            label="Person(s)"
            helperText="Max 4 is allowed."
            options={[
              { id: "1", label: "One (1)" },
              { id: "2", label: "Two (2)" },
              { id: "3", label: "Three (3)" },
              { id: "4", label: "Four (4)" },
            ]}
            value={selectedPlatformPersonCount}
            error={isPlatformPersonCountError}
            onChange={(event) =>
              handlePlatformPersonCountChange(event.target.value)
            }
          />
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              if (!selectedPlatformTicketStn) {
                setIsPlatformStationError(true);
              }
              if (!selectedPlatformPersonCount) {
                setIsPlatformPersonCountError(true);
              }

              if (selectedPlatformTicketStn && selectedPlatformPersonCount) {
                getNextPage();
              }
            }}
          >
            Next
          </Button>
        </>
      );
  }
};

export default BookTicket;
