import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { BigContainer } from './components/commonStyled';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/header';
import { Button, Result } from 'antd';
import MainPage from './pages/mainpage';

function App() {
  const token = 'test-token';

  const [mobileInputSearch, setmobileInputSearch] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <BigContainer>
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
    </BigContainer>
  );
}

export default App;
