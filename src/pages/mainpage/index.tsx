import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { LinkedinOutlined, YoutubeOutlined, ArrowRightOutlined } from '@ant-design/icons';
import i18n from '@src/localization/config';
import { Container, Marketing, Navigation, CenterFlex, Copyright, Footer, Register, Link as StyledLink } from './styles';
import type { JSX } from 'react';

function MainPage(): JSX.Element {
  const mainPageLinks = [
    {
      title: i18n.t('mainPage.info'),
      description: i18n.t('mainPage.infoDesc'),
      image: '/src/assets/icons/cube.svg',
      link: '/',
      id: 0
    },
    {
      title: i18n.t('mainPage.videos'),
      description: i18n.t('mainPage.videosDesc'),
      image: '/src/assets/icons/tutor.svg',
      link: '/videos/',
      id: 2
    },
    {
      title: i18n.t('mainPage.knowledge'),
      description: i18n.t('mainPage.knowledgeDesc'),
      image: '/src/assets/icons/know.svg',
      link: '/questions',
      id: 3
    }
  ];

  const { t } = useTranslation();
  const today = new Date();

  return (
    <>
      <Register>
        <div>
          <h1>{t('mainPage.registerWelcome')}</h1>
          <p>{t('mainPage.registerDesc')}</p>
          <Link to="/authorization">
            <Button style={{ height: '56px', backgroundColor: '#44958f' }} size="large" type="primary">
              {t('mainPage.regButton')}
            </Button>
          </Link>
        </div>
        <img src="/src/assets/images/demo-back.png" alt="goodrone-platform"></img>
      </Register>

      <Container>
        <Navigation>
          <h3>{t('mainPage.nav')}</h3>
          <div className="items-container">
            {mainPageLinks.map((item) => (
              <Link
                to={item.link}
                target={item.link === '/questions' || item.link === '/tutorials/' ? '_self' : '_blank'}
                className="button-link"
                key={item.id}
              >
                <img src={item.image} alt="link-image" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </Navigation>

        <div>
          <Marketing>
            <div className="item youtube">
              <h2>
                {t('mainPage.demoHead1')} {t('mainPage.demoHead2')}
              </h2>
              <a href="" target="_blank">
                <Button type="default">{t('mainPage.demoButton')}</Button>
              </a>
            </div>

            <div className="item third-party">
              <h2>{t('mainPage.more')}</h2>
              <StyledLink href="" target="blank">
                {t('mainPage.link')}
                <ArrowRightOutlined style={{ margin: '0 0 -5px 10px' }} />
              </StyledLink>
            </div>
          </Marketing>
        </div>
      </Container>

      <Footer>
        <CenterFlex style={{ justifyContent: 'space-between' }}>
          <CenterFlex style={{ width: '86px' }}>
            <a href="#" target="_blank">
              <LinkedinOutlined />
            </a>
            <a href="#" target="_blank">
              <YoutubeOutlined style={{ marginLeft: '20px' }} />
            </a>
          </CenterFlex>
          <Copyright>© Goodrone {today.getFullYear()}</Copyright>
          <div style={{ paddingLeft: '60px' }}>
            <img src="/src/assets/black-logo.svg" alt="black-logo"></img>
          </div>
        </CenterFlex>
      </Footer>
    </>
  );
}

export default MainPage;
