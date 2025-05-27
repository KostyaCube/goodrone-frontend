import { Modal } from 'antd';
import i18n from '../localization/config';
import { ExclamationCircleFilled } from '@ant-design/icons';

type IConfirmProps = {
  callback: (id: string) => void;
  id: string;
  text: string;
};

type ISimpleConfirmProps = {
  callback: () => void;
  text: string;
};

const { confirm } = Modal;

export const needAuthMessage = ({ callback, action }: { callback: () => void; action: string }) => {
  confirm({
    centered: true,
    title: i18n.t('common.signin'),
    icon: <></>,
    content: `${action}, ${i18n.t('common.signin')} ${i18n.t('mainPage.registerDescShort')}`,
    cancelText: i18n.t('common.back'),
    okText: i18n.t('auth.login'),
    onOk() {
      callback();
    }
  });
};

export const showDeletingConfirm = ({ callback, id, text }: IConfirmProps) => {
  confirm({
    centered: true,
    title: text,
    icon: <ExclamationCircleFilled />,
    content: i18n.t('common.noCancel'),
    cancelText: i18n.t('common.cancel'),
    okText: i18n.t('common.delete'),
    onOk() {
      callback(id);
      // success();
    }
  });
};

export const showConfirm = ({ callback, text }: ISimpleConfirmProps) => {
  confirm({
    centered: true,
    title: text,
    icon: <></>,
    cancelText: i18n.t('common.cancel'),
    okText: i18n.t('common.delete'),
    onOk() {
      callback();
    }
  });
};
