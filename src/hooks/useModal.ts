'use client';

import { useModalStore } from '@/stores/useModalStore';

export const useModal = () => {
  const store = useModalStore();

  return {
    isOpen: store.isOpen,
    openModal: store.openModal,
    closeModal: store.closeModal,
    showAlert: store.showAlert,
    showConfirm: store.showConfirm,
    showImageModal: store.showImageModal,
  };
};

export default useModal;
