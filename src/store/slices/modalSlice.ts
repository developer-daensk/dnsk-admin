import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  modals: Record<
    string, // Modal key (e.g., "user-edit-modal")
    {
      isOpen: boolean;
      isEditing: boolean;
      data?: unknown; // Can be typed per-modal when using the hook
    }
  >;
}

const initialState: ModalState = {
  modals: {},
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        modalKey: string;
        data?: unknown;
        isEditing?: boolean;
      }>
    ) => {
      // debugger;
      const { modalKey, data, isEditing } = action.payload;
      state.modals[modalKey] = {
        isOpen: true,
        isEditing: isEditing ?? false,
        data,
      };
    },
    closeModal: (
      state,
      action: PayloadAction<{
        modalKey: string;
      }>
    ) => {
      const { modalKey } = action.payload;
      if (state.modals[modalKey]) {
        state.modals[modalKey].isOpen = false;
      }
    },
    // Optional: Clear modal data completely
    resetModal: (
      state,
      action: PayloadAction<{
        modalKey: string;
      }>
    ) => {
      delete state.modals[action.payload.modalKey];
    },
  },
});

export const { openModal, closeModal, resetModal } = modalSlice.actions;
export default modalSlice.reducer;
