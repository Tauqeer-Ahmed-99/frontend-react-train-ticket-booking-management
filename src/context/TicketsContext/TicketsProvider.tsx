import React, { useContext, useEffect, useState } from "react";
import TicketsContext, {
  ITicketDetails,
  ITicketsContext,
} from "./TicketsContext";
import UserContext from "../UserContext/UserContext";

const TicketsProvider = ({ children }: { children: React.ReactNode }) => {
  const [ticketDetails, setTicketDetails] = useState<ITicketDetails>({
    availableStations: [],
    userTickets: [],
    availableTicketTypes: [],
    availableTicketClasses: [],
    fareDetails: null,
  });

  const origin = window.location.origin
    .split(":")
    .filter((_, index) => index < 2)
    .join(":");

  const userContext = useContext(UserContext);

  const getInitialDetails = async (userId: number | string) => {
    try {
      const url = `${origin}:8000/get-all-details?userId=${userId}`;

      const res = await fetch(url);

      const parsedResponse = await res.json();

      setTicketDetails((prevDetails) => ({
        ...prevDetails,
        availableStations: parsedResponse["available_stations"],
        userTickets: parsedResponse["user_tickets"],
        availableTicketTypes: parsedResponse["available_ticket_types"],
        availableTicketClasses: parsedResponse["available_ticket_classes"],
      }));
    } catch (error: any) {
      console.log(error);
    }
  };

  const getTicketFare = async (
    src: string,
    dest: string,
    ticketClass: string,
    type: string,
    adult: string,
    child: string
  ) => {
    try {
      const url = `${origin}:8000/get-ticket-fare?src=${src}&dest=${dest}&tClass=${ticketClass}&type=${type}&adult=${adult}&child=${child}`;

      const res = await fetch(url);

      const parsedResponse = await res.json();
      setTicketDetails((prevDetails) => ({
        ...prevDetails,
        fareDetails: parsedResponse["fare_details"],
      }));
      return parsedResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const bookTicket = async (bookingDetails?: {
    sourceStation: string;
    destinationStation: string;
    platformTicketStation: string;
    platformPersonCount: string;
    adultTravellersCount: string;
    childTravellersCount: string;
    ticketType: string;
    class: string;
  }) => {
    try {
      const url = `${origin}:8000/book-ticket`;

      const user_id = userContext.user?.userId;
      const ticket_type = bookingDetails
        ? "PLT"
        : ticketDetails.fareDetails?.type;
      const ticket_class = bookingDetails
        ? "AC"
        : ticketDetails.fareDetails?.tClass;
      const start_station = bookingDetails
        ? bookingDetails.platformTicketStation
        : ticketDetails.fareDetails?.src_station.station_id;
      const end_station = bookingDetails
        ? bookingDetails.platformTicketStation
        : ticketDetails.fareDetails?.dest_station.station_id;
      const adult_count = bookingDetails
        ? bookingDetails.platformPersonCount
        : ticketDetails.fareDetails?.adult;
      const child_count = bookingDetails
        ? "0"
        : ticketDetails.fareDetails?.child;
      const fare = bookingDetails
        ? parseInt(bookingDetails.platformPersonCount ?? "0") * 5
        : ticketDetails.fareDetails?.fare;

      const body = {
        user_id,
        ticket_type,
        ticket_class,
        start_station,
        end_station,
        adult_count,
        child_count,
        fare,
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parsedResponse = await res.json();

      setTicketDetails((prevDetails) => ({
        ...prevDetails,
        userTickets: [parsedResponse.ticketDetails, ...prevDetails.userTickets],
      }));

      return parsedResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const cancelTicket = async (ticketId: number) => {
    try {
      const url = `${origin}:8000/cancel-ticket?userId=${userContext.user?.userId}&ticketId=${ticketId}`;

      const res = await fetch(url, {
        method: "POST",
      });

      const parsedResponse = await res.json();

      if (parsedResponse.status === "success") {
        setTicketDetails((prevDetails) => ({
          ...prevDetails,
          userTickets: prevDetails.userTickets.filter(
            (ticket) => ticket.ticket_id !== ticketId
          ),
        }));
      }

      return parsedResponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const resetFareDetails = () => {
    setTicketDetails((prevDetails) => ({
      ...prevDetails,
      fareDetails: null,
    }));
  };

  useEffect(() => {
    const userId = userContext.user?.userId;
    if (userId) {
      getInitialDetails(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.user?.userId]);

  const context: ITicketsContext = {
    availableStations: ticketDetails.availableStations,
    userTickets: ticketDetails.userTickets,
    availableTicketTypes: ticketDetails.availableTicketTypes,
    availableTicketClasses: ticketDetails.availableTicketClasses,
    fareDetails: ticketDetails.fareDetails,
    getInitialDetails,
    getTicketFare,
    bookTicket,
    cancelTicket,
    resetFareDetails,
  };

  return (
    <TicketsContext.Provider value={context}>
      {children}
    </TicketsContext.Provider>
  );
};

export default TicketsProvider;
