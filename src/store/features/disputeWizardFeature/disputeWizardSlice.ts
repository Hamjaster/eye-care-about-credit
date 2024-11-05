import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux";
import { DisputeItem, DisputeWizardType, LetterType } from "@/lib/type";

// Initial  data
const initialState: DisputeWizardType = {
  selectedLetters: [],
  disputeItems: [],
  photoId: "",
  proofOfAddress: "",
};

export const disputeSlice = createSlice({
  name: "currentDispute",
  initialState,
  reducers: {
    addDisputeItems: (state, action: PayloadAction<DisputeItem[]>) => {
      state.disputeItems.push(...action.payload);
    },

    addSelectedLetter: (state, action: PayloadAction<LetterType>) => {
      state.selectedLetters.push(action.payload);
    },
    removeSelectedLetter: (state, action) => {
      state.selectedLetters = state.selectedLetters.filter((letter) => {
        return letter.id !== action.payload;
      });
    },
    editSelectedLetters: (state, action: PayloadAction<LetterType[]>) => {
      state.selectedLetters = action.payload;
    },
    setPhotoID: (state, action) => {
      state.photoId = action.payload;
    },
    setProofOfAddress: (state, action) => {
      state.proofOfAddress = action.payload;
    },
  },
});

// Export actions
export const {
  addDisputeItems,
  addSelectedLetter,
  removeSelectedLetter,
  setPhotoID,
  editSelectedLetters,
  setProofOfAddress,
} = disputeSlice.actions;

// Export the reducer
export default disputeSlice.reducer;
