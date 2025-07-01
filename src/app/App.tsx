import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Flex, MainContainer } from '../shared/ui/styled components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@src/components/header';
import { Button, Result } from 'antd';
import MainPage from '@src/pages/mainpage';
import { useAppSelector } from './store';
import ArticlePage from '@src/pages/article';
import CreateArticle from '@src/pages/article/createArticle';
import Authors from '@src/pages/authors';
import Questions from '@src/pages/questions';
import Question from '@src/pages/questions/questionPage';
import { LinkedinOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Footer } from '@src/pages/mainpage/styles';
import logo from '/src/assets/goodrone-logo.png';
import Profile from '@src/pages/profile';

function App() {
  const token = useAppSelector((state) => state.login.token);

  const [mobileInputSearch, setmobileInputSearch] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const today = new Date();

  return (
    <MainContainer>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/profile" element={<Navigate to="/profile/data" />} />
        <Route
          path="*"
          element={
            <>
              <Header setOpenMenu={setOpenMenu} token={token} mobileInputSearch={mobileInputSearch} setmobileInputSearch={setmobileInputSearch} />
              <Routes>
                <Route path="/main" element={<MainPage token={token} />} />
                <Route path="/articles/:id" element={<ArticlePage />} />
                <Route path="/articles/create" element={<CreateArticle />} />
                <Route path="/authors/:id" element={<Authors token={token} />} />
                <Route
                  path="/questions"
                  element={<Questions openMenu={openMenu} setOpenMenu={setOpenMenu} token={token} mobileInputSearch={mobileInputSearch} />}
                >
                  <Route path="/questions/:id" element={<Question />} />
                </Route>
                <Route path="/profile/*" element={<Profile token={token ? token : ''} />} />
                <Route
                  path="/*"
                  element={
                    <Result
                      style={{ paddingTop: '180px', height: '92vh' }}
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
              <Footer>
                <Flex $justify="between">
                  <Flex>
                    <a href="#" target="_blank">
                      <LinkedinOutlined />
                    </a>
                    <a href="#" target="_blank">
                      <YoutubeOutlined style={{ marginLeft: '20px' }} />
                    </a>
                  </Flex>
                  <h6>© Goodrone {today.getFullYear()}</h6>
                  <img className="logo" src={logo} alt="logo" />
                </Flex>
              </Footer>
            </>
          }
        />
      </Routes>
    </MainContainer>
  );
}

export default App;
