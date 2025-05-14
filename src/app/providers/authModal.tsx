import { ReactNode, createContext, useContext, useState } from 'react';

interface ModalContextType {
  openAuthModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useAuthModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  const openModal = () => {
    setOpenAuthModal(true);
  };

  const closeModal = () => {
    setOpenAuthModal(false);
  };

  return <ModalContext.Provider value={{ openAuthModal, openModal, closeModal }}>{children}</ModalContext.Provider>;
};
