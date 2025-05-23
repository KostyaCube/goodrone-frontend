import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { MainContainer } from '../shared/ui/styled components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@src/components/header';
import { Button, Result } from 'antd';
import MainPage from '@src/pages/mainpage';
import { useAppSelector } from './store';

function App() {
  const token = useAppSelector((state) => state.login.token);

  const [mobileInputSearch, setmobileInputSearch] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route
          path="*"
          element={
            <>
              <Header setOpenMenu={() => {}} token={token} mobileInputSearch={mobileInputSearch} setmobileInputSearch={setmobileInputSearch} />
              <Routes>
                <Route path="/main" element={<MainPage token={token} />} />
                <Route
                  path="/*"
                  element={
                    <Result
                      style={{ paddingTop: '180px' }}
                      status="404"
                      title="404"
                      subTitle={t('mainPage.notExist')}
                      extra={
                        <Button onClick={() => navigate('/main')} type="primary">
                          {t('mainPage.backHome')}
                        </Button>
                      }
                    />
                  }
                />
              </Routes>
            </>
          }
        />
      </Routes>
    </MainContainer>
  );
}

export default App;
