import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux";
import { LetterType } from "@/lib/type";

// Define the initial state for letters
interface LetterState {
  letters: LetterType[];
}

const initialState: LetterState = {
  letters: [
    {
      id: "1",
      title: "Welcome Letter",
      status: "Active",
      category: "Introduction",
      description:
        "A letter welcoming the new client and introducing our services.",
    },
    {
      title: "Reminder Letter",
      id: "2",
      status: "Inactive",
      category: "Follow-up",
      description: "A reminder for upcoming appointments or due payments.",
    },
    {
      id: "3",
      title: "Thank You Letter",
      status: "Active",
      category: "Appreciation",
      description:
        "A letter expressing gratitude to a client for their business.",
    },
    {
      id: "4",
      title: "Termination Notice",
      status: "Pending",
      category: "Legal",
      description: "A formal notice to terminate the agreement.",
    },
    {
      id: "5",
      title: "Holiday Greetings",
      status: "Active",
      category: "Appreciation",
      description: "A festive greeting letter sent during holiday seasons.",
    },
    {
      id: "6",
      title: "Invoice Letter",
      status: "Inactive",
      category: "Appreciation",
      description: "A letter attached with the invoice for services provided.",
    },
    {
      id: "7",
      title: "Policy Update",
      status: "Active",
      category: "Information",
      description: "A notification about recent changes to company policies.",
    },
    {
      id: "8",
      title: "Feedback Request",
      status: "Pending",
      category: "Survey",
      description: "A letter asking for client feedback on our services.",
    },
    {
      id: "9",
      title: "Contract Renewal",
      status: "Active",
      category: "Agreement",
      description:
        "A letter to inform about the upcoming contract renewal date.",
    },
    {
      id: "10",
      title: "Apology Letter",
      status: "Inactive",
      category: "Legal",
      description: "A letter apologizing for any inconvenience caused.",
    },
  ], // You can add initial mock data here if desired
};

// Create letter slice
export const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    addLetter: (state, action: PayloadAction<LetterType>) => {
      state.letters.push(action.payload);
    },
  },
});

// Export actions
export const { addLetter } = letterSlice.actions;

// Selector to get all letters
export const selectLetters = (state: RootState) => state.letters.letters;

// Export the reducer
export default letterSlice.reducer;
