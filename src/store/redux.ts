import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "@/store/features/clientFeature/clientSlice";
import letterReducer from "@/store/features/letterFeature/letterSlice";
import currentDispute from "@/store/features/disputeWizardFeature/disputeWizardSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    letters: letterReducer,
    currentDispute: currentDispute,
  },
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed versions of the useDispatch and useSelector hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
