import React, { createContext, useContext } from 'react';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type NotifyFn = (type: NotificationType, description?: string) => void;

const NotificationContext = createContext<NotifyFn>(() => {});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const notify: NotifyFn = (type, description) => {
    api[type]({
      message: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
      description
    });
  };

  return (
    <NotificationContext.Provider value={notify}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
