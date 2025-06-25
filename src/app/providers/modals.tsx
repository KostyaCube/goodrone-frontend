import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Modal } from 'antd';
import i18n from '@src/shared/localization/config';
import { ExclamationCircleFilled } from '@ant-design/icons';

interface ModalContextType {
  openModal: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  modal: ReturnType<typeof Modal.useModal>[0];
  contextHolder: React.ReactElement;
}

type IConfirmProps = {
  callback: (id: string) => void;
  id: string;
  text: string;
};

type ISimpleConfirmProps = {
  callback: () => void;
  text: string;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const openAuthModal = () => setOpenModal(true);
  const closeAuthModal = () => setOpenModal(false);

  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    if (openModal) {
      document.body.style.width = '100%';
    }
  }, [openModal]);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        openAuthModal,
        closeAuthModal,
        modal,
        contextHolder
      }}
    >
      {contextHolder}
      {children}
    </ModalContext.Provider>
  );
};

export const useCustomModals = () => {
  const { modal } = useModal();

  const needAuthMessage = ({ callback, action }: { callback: () => void; action: string }) => {
    modal.confirm({
      centered: true,
      title: i18n.t('articles.auth'),
      icon: <></>,
      content: `${action}, ${i18n.t('common.signin')} ${i18n.t('mainPage.registerDescShort')}`,
      cancelText: i18n.t('common.back'),
      okText: i18n.t('auth.login'),
      onOk: callback
    });
  };

  const showDeletingConfirm = ({ callback, id, text }: IConfirmProps) => {
    modal.confirm({
      centered: true,
      title: text,
      icon: <ExclamationCircleFilled />,
      content: i18n.t('common.noCancel'),
      cancelText: i18n.t('common.cancel'),
      okText: i18n.t('common.delete'),
      onOk: () => callback(id)
    });
  };

  const showConfirm = ({ callback, text }: ISimpleConfirmProps) => {
    modal.confirm({
      centered: true,
      title: text,
      icon: <></>,
      cancelText: i18n.t('common.cancel'),
      okText: i18n.t('common.delete'),
      onOk: callback
    });
  };

  return { needAuthMessage, showDeletingConfirm, showConfirm };
};
