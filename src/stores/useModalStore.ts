import { create } from 'zustand';

interface ModalData {
  title?: string;
  description?: string;
  headerAlign?: 'left' | 'center';
  hasCloseButton?: boolean;
  closeButtonPosition?: 'top-right' | 'top-left';
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: { x: number; y: number };
  imageSize?: { width: number; height: number };
  type?: 'single' | 'double' | 'none';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  children?: React.ReactNode;
}

interface ModalStore {
  modals: Record<string, boolean>;
  currentModal: ModalData | null;

  openModal: (key: string, data?: ModalData) => void;
  closeModal: (key: string) => void;
  isOpen: (key: string) => boolean;
  showAlert: (
    title: string,
    description?: string,
    onConfirm?: () => void,
    options?: Partial<ModalData>,
  ) => void;
  showConfirm: (
    title: string,
    description?: string,
    onConfirm?: () => void,
    onCancel?: () => void,
    options?: Partial<ModalData>,
  ) => void;
  showImageModal: (
    title: string,
    description: string,
    imageSrc: string,
    options?: Partial<ModalData>,
  ) => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: {},
  currentModal: null,

  openModal: (key: string, data?: ModalData) => {
    set((state) => ({
      modals: { ...state.modals, [key]: true },
      currentModal: data || null,
    }));
  },

  closeModal: (key: string) => {
    set((state) => ({
      modals: { ...state.modals, [key]: false },
      currentModal: null,
    }));
  },

  isOpen: (key: string) => {
    return get().modals[key] || false;
  },

  showAlert: (
    title: string,
    description?: string,
    onConfirm?: () => void,
    options: Partial<ModalData> = {},
  ) => {
    get().openModal('alert', {
      title,
      description,
      type: 'single',
      size: 'md',
      rounded: 'sm',
      headerAlign: 'center',
      primaryButtonText: '확인',
      onPrimaryClick: onConfirm,
      ...options,
    });
  },

  showConfirm: (
    title: string,
    description?: string,
    onConfirm?: () => void,
    onCancel?: () => void,
    options: Partial<ModalData> = {},
  ) => {
    get().openModal('confirm', {
      title,
      description,
      type: 'double',
      size: 'md',
      rounded: 'sm',
      headerAlign: 'center',
      primaryButtonText: '확인',
      secondaryButtonText: '취소',
      onPrimaryClick: onConfirm,
      onSecondaryClick: onCancel,
      ...options,
    });
  },

  showImageModal: (
    title: string,
    description: string,
    imageSrc: string,
    options: Partial<ModalData> = {},
  ) => {
    get().openModal('imageModal', {
      title,
      description,
      imageSrc,
      type: 'single',
      size: 'lg',
      rounded: 'sm',
      headerAlign: 'center',
      imagePosition: { x: -25, y: -10 },
      imageSize: { width: 100, height: 100 },
      primaryButtonText: '확인',
      ...options,
    });
  },
}));
