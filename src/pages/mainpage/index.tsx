import { useState, type JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Tabs } from 'antd';
import { LinkedinOutlined, YoutubeOutlined, ArrowRightOutlined } from '@ant-design/icons';
import pencil from '/src/assets/icons/pencil.svg';
import i18n from '@src/shared/localization/config';
import { Container, Marketing, Navigation, Copyright, Footer, Register, Link as StyledLink } from './styles';
import { Flex } from '@src/shared/ui/styled components';
import { useModal } from '@src/app/providers/modals';
import { FeedNavigation } from '@src/components/articleFeed/styles';
import { useAppSelector } from '@src/app/store';
import ArticleFeed from '@src/components/articleFeed';

type Iprops = {
  token: string | null | undefined;
};

function MainPage({ token }: Iprops): JSX.Element {
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
      image: '/src/assets/icons/video.svg',
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

  const filterItems = [
    {
      key: '1',
      label: i18n.t('articles.feed'),
      filter: 'all'
    },
    {
      key: '2',
      label: i18n.t('articles.myArticles'),
      filter: 'my'
    },
    {
      key: '3',
      label: i18n.t('articles.menuSaved'),
      filter: 'saved'
    }
  ];

  const me = useAppSelector((state) => state.login.user);
  const [uid, setuid] = useState<string>('');
  const [saved, setSaved] = useState<string>('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { openAuthModal } = useModal();
  const today = new Date();

  function handleChangeSorting(e: string) {
    if (e == '1') {
      setuid('');
      setSaved('');
    }
    if (e == '2' && me) {
      setuid(`${me.id}`);
      setSaved('');
    }
    if (e == '3' && me) {
      setuid(`${me.id}`);
      setSaved('saved');
    }
  }

  return (
    <>
      <Register>
        <div>
          <h1>{t('mainPage.registerWelcome')}</h1>
          <p>{t('mainPage.registerDesc')}</p>
          <Button onClick={openAuthModal} style={{ height: '56px' }} size="large" type="primary">
            {t('mainPage.regButton')}
          </Button>
        </div>
        <img src="/src/assets/images/demo-back.png" alt="goodrone-platform"></img>
      </Register>

      <Container>
        <Navigation>
          <h3>{t('mainPage.nav')}</h3>
          <div className="items-container">
            {mainPageLinks.map((item) => (
              <Link to={item.link} className="button-link" key={item.id}>
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

          {me && token ? (
            <FeedNavigation>
              <Tabs items={filterItems} onChange={handleChangeSorting} />
              <Button onClick={() => navigate('/articles/create')} type="primary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img style={{ height: '24px' }} src={pencil} />
                {t('articles.writeButt')}
              </Button>
            </FeedNavigation>
          ) : (
            <FeedNavigation />
          )}
          <ArticleFeed uid={uid} saved={saved} />
        </div>
      </Container>

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
          <Copyright>© Goodrone {today.getFullYear()}</Copyright>
          <div style={{ paddingLeft: '60px' }}>
            <img src="/src/assets/black-logo.svg" alt="black-logo"></img>
          </div>
        </Flex>
      </Footer>
    </>
  );
}

export default MainPage;
