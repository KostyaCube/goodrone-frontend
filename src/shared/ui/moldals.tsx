import { Modal } from 'antd';
import i18n from '../localization/config';

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
