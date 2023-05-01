import { createContext } from "react";

export interface IStation {
  station_id: string;
  station_name: string;
  distance_from_origin: number;
}

export interface ITicketType {
  ticket_type_id: string;
  ticket_type_name: string;
}

export interface ITicketClass {
  ticket_class_id: string;
  ticket_class_name: string;
}

export interface IFareDetails {
  adult: string;
  child: string;
  src_station: IStation;
  dest_station: IStation;
  distance: number;
  fare: number;
  tClass: string;
  type: string;
}

export interface ITicket {
  adult_count: number;
  child_count: number;
  end_station: string;
  expire_date: string;
  fare: number;
  registration_date: string;
  start_station: string;
  ticket_class: string;
  ticket_id: number;
  ticket_type: string;
  user_id: number;
}

export interface ITicketDetails {
  availableStations: IStation[];
  userTickets: ITicket[];
  availableTicketTypes: ITicketType[];
  availableTicketClasses: ITicketClass[];
  fareDetails: IFareDetails | null;
}

export interface ITicketsContext {
  availableStations: IStation[];
  userTickets: ITicket[];
  availableTicketTypes: ITicketType[];
  availableTicketClasses: ITicketClass[];
  fareDetails: {
    adult: string;
    child: string;
    src_station: IStation;
    dest_station: IStation;
    distance: number;
    fare: number;
    tClass: string;
    type: string;
  } | null;
  getInitialDetails: (userId: string) => Promise<any>;
  getTicketFare: (
    src: string,
    dest: string,
    ticketClass: string,
    type: string,
    adult: string,
    child: string
  ) => Promise<any>;
  bookTicket: (bookingDetails?: {
    sourceStation: string;
    destinationStation: string;
    platformTicketStation: string;
    platformPersonCount: string;
    adultTravellersCount: string;
    childTravellersCount: string;
    ticketType: string;
    class: string;
  }) => // src: string,
  // dest: string,
  // ticketClass: string,
  // type: string,
  // adult: string,
  // child: string

  Promise<any>;
  cancelTicket: (ticketId: number) => Promise<any>;
  resetFareDetails: () => void;
}

const TicketsContext = createContext<ITicketsContext>({
  availableStations: [],
  userTickets: [],
  availableTicketTypes: [],
  availableTicketClasses: [],
  fareDetails: null,
  getInitialDetails: async (userId: string) => {},
  getTicketFare: async (
    src: string,
    dest: string,
    ticketClass: string,
    type: string,
    adult: string,
    child: string
  ) => {},
  bookTicket: async (bookingDetails?: {
    sourceStation: string;
    destinationStation: string;
    platformTicketStation: string;
    platformPersonCount: string;
    adultTravellersCount: string;
    childTravellersCount: string;
    ticketType: string;
    class: string;
  }) =>
    // src: string,
    // dest: string,
    // ticketClass: string,
    // type: string,
    // adult: string,
    // child: string
    {},
  cancelTicket: async (ticketId: number) => {},
  resetFareDetails: () => {},
});

export default TicketsContext;
