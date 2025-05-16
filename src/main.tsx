import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@src/app/store/index.ts';
import { NotificationProvider } from './app/providers/notifications';
import { ModalProvider } from '@src/app/providers/authModal';
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';
import App from '@src/app/App.tsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: '#44958f' } }}>
        <NotificationProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </NotificationProvider>
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);
