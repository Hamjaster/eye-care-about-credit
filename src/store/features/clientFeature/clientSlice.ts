import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux";
import { ClientType } from "@/lib/type";

// Initial client data
const initialClients: ClientType[] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    ssn: "1234",
    dob: new Date("1990-05-15"),
    country: "United States",
    state: "California",
    phoneMobile: "555-1234",
    status: "active",
    startDate: new Date("2023-01-01"),
    assignedTo: "Carlos",
    referredBy: "John",
    added: new Date(),
  },
  // other initial client objects...
];

// Define the initial state
interface ClientState {
  clients: ClientType[];
}

const initialState: ClientState = {
  clients: initialClients,
};

// Create client slice
export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<ClientType>) => {
      state.clients.push(action.payload);
    },
  },
});

// Export actions
export const { addClient } = clientSlice.actions;

// Selector to get all clients
export const selectClients = (state: RootState) => state.client.clients;

// Export the reducer
export default clientSlice.reducer;
