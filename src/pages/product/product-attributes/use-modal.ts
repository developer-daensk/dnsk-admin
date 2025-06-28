import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { closeModal, openModal } from '@/store/slices/modalSlice';

export const useModal = <TData = unknown>(modalKey: string) => {
  const dispatch = useDispatch();

  const modalState = useSelector(
    (state: RootState) => state.modals.modals[modalKey] || { isOpen: false, isEditing: false }
  );

  return {
    // State
    isOpen: modalState.isOpen,
    isEditing: modalState.isEditing,
    data: modalState.data as TData | undefined,

    // Actions
    open: (params?: { data?: TData; isEditing?: boolean }) =>
      dispatch(
        openModal({
          modalKey,
          data: params?.data,
          isEditing: params?.isEditing,
        })
      ),
    close: () => dispatch(closeModal({ modalKey })),
  };
};
