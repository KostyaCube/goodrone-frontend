import { Dispatch, SetStateAction, useState, useEffect, JSX } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Layout, Tabs, Button, Drawer } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { CloseOutlined } from '@ant-design/icons';
import filter from '/src/assets/icons/filter.svg';
import { useTranslation } from 'react-i18next';
import { useGetKeywordsQuery } from '@src/app/store/api/APIbase';
import { Chips } from '@src/shared/ui/styled components';
import { Sidebar, FilterButton, ChosenChips, TabsWrapper } from './styles';
import { IKeyword, IMenuItem } from '@src/shared/types';
import { useCustomModals, useModal } from '@src/app/providers/modals';
import QuestionList from './questionList';
import Question from './questionPage';
import Tags from './tags';
import Favorites from './favorites';
import CreateModal from './create';
import Search from './search';

type Iprops = {
  token: string | null | undefined;
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  mobileInputSearch: boolean;
};

function Questions({ token, openMenu, setOpenMenu, mobileInputSearch }: Iprops): JSX.Element {
  const location = useLocation();
  const { id } = useParams();

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [own, setown] = useState<boolean>(false);
  const [chosenWords, setchosenWords] = useState<IKeyword[]>([]);
  const [sorting, setsorting] = useState<string>('created_at');
  const [activeTab, setActiveTab] = useState<string>('0');
  const [filtersDrawer, setopenFiltersDrawer] = useState<boolean>(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: keywords } = useGetKeywordsQuery(10);
  const { openAuthModal } = useModal();

  const { needAuthMessage, showDeletingConfirm } = useCustomModals();

  let menus: IMenuItem[] = [
    { id: '0', body: t('questions.menuQuestions'), link: '/questions' },
    { id: '10', body: t('questions.menuSaved'), link: '/questions/saved' },
    { id: '11', body: t('questions.menuTags'), link: '/questions/tags' }
  ];

  const filterItems = [
    {
      key: '1',
      label: t('questions.filterFresh'),
      by: 'created_at'
    },
    {
      key: '2',
      label: t('questions.filterPopular'),
      by: 'views'
    },
    {
      key: '3',
      label: t('questions.filterMy'),
      by: 'user'
    }
  ];

  function toggleKeywords(keyword: IKeyword) {
    const keyIndex = chosenWords.findIndex((kw) => kw.id === keyword.id);
    if (keyIndex === -1) {
      setchosenWords([...chosenWords, keyword]);
    } else {
      const updatedKeywords = [...chosenWords];
      updatedKeywords.splice(keyIndex, 1);
      setchosenWords(updatedKeywords);
    }
  }

  const handleChangeSorting = (value: string) => {
    const order = filterItems.find((item) => item.key === value);
    if (order && order.by === 'user') {
      setown(true);
    } else {
      setown(false);
      order && setsorting(order.by);
    }
  };

  const handleChangeChapter = (value: string) => {
    onClose();
    setActiveTab(value);
    const chosed = menus.find((item) => item.id == value);
    if (chosed?.id == 0) {
      setchosenWords([]);
    }
    if (chosed?.link) {
      navigate(chosed.link);
    } else if (chosed) {
      setchosenWords([]);
      navigate('/questions');
    }
  };

  useEffect(() => {
    if (id) {
      if (id === 'saved') setActiveTab('10');
      if (id === 'tags') setActiveTab('11');
    }
  }, [id]);

  useEffect(() => {
    if (location && location.state) setchosenWords([location.state.chosed]);
  }, [location]);

  const onClose = () => {
    setOpenMenu(false);
  };

  const showFiltersDrawer = () => {
    setopenFiltersDrawer(true);
  };

  const hideFiltersDrawer = () => {
    setopenFiltersDrawer(false);
  };

  function renderMenu() {
    return (
      <Tabs
        activeKey={activeTab}
        tabPosition={'right'}
        onChange={handleChangeChapter}
        items={menus.map((item) => {
          return {
            label: item.body,
            key: `${item.id}`,
            link: item.link
          };
        })}
      />
    );
  }

  function renderFilters() {
    return (
      <>
        <h4>{t('questions.filters')}</h4>
        <div className="chips">
          {!!keywords?.length &&
            keywords.map((item: IKeyword) => {
              return (
                <Chips key={item.id} onClick={() => toggleKeywords(item)} $pressed={`${chosenWords.includes(item) && 'true'}`}>
                  {item.body}
                </Chips>
              );
            })}
        </div>
      </>
    );
  }

  return (
    <div style={{ paddingTop: `${mobileInputSearch ? '7px' : '88px'}` }}>
      <Button
        className="mobile-button"
        type="primary"
        style={{ height: 40 }}
        onClick={() => {
          token
            ? setOpenCreateModal(true)
            : needAuthMessage({
                callback: () => {
                  openAuthModal();
                },
                action: t('questions.toaskQ')
              });
        }}
      >
        {t('questions.askQ')}
      </Button>
      <Layout className="layout" hasSider>
        <Sidebar>{renderMenu()}</Sidebar>

        <Content className="layout-content">
          <FilterButton onClick={showFiltersDrawer} className="burger">
            <img src={filter}></img>
          </FilterButton>
          <TabsWrapper>
            {id != 'saved' && id != 'tags' && id != 'search' && (
              <Tabs
                style={{ maxWidth: `${token ? '290px' : '180px'}` }}
                onTabClick={() => navigate('/questions')}
                items={token ? filterItems : filterItems.slice(0, -1)}
                onChange={handleChangeSorting}
              />
            )}
            <Button
              type="primary"
              onClick={() => {
                token
                  ? setOpenCreateModal(true)
                  : needAuthMessage({
                      callback: () => {
                        openAuthModal();
                      },
                      action: t('questions.toaskQ')
                    });
              }}
            >
              {t('questions.askQ')}
            </Button>
          </TabsWrapper>

          {!id && (
            <ChosenChips style={{ justifyContent: `${chosenWords.length ? 'flex-start' : 'flex-end'}` }}>
              {chosenWords.length > 0 &&
                chosenWords.map((item: IKeyword) => {
                  return (
                    <Chips
                      onClick={() => toggleKeywords(item)}
                      key={item.id}
                      $pressed={`${chosenWords.includes(item) && 'true'}`}
                      style={{ display: 'inherit' }}
                    >
                      {item.body} <CloseOutlined style={{ paddingTop: 3 }} />
                    </Chips>
                  );
                })}
            </ChosenChips>
          )}

          <Routes>
            <Route path="/" element={<QuestionList sorting={sorting} chosenWords={chosenWords} own={own} />} />
            <Route path="/:id" element={<Question openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} />} />
            <Route path="/saved" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
            <Route path="/tags" element={<Tags />} />
          </Routes>
        </Content>

        <Sidebar>{id != 'saved' && id != 'tags' && isNaN(Number(id)) && renderFilters()}</Sidebar>
      </Layout>

      <CreateModal openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} />

      <Drawer width={'75%'} className="drawer" closable={false} placement={'left'} onClose={onClose} open={openMenu} key={'left'}>
        {renderMenu()}
      </Drawer>
      <Drawer width={'75%'} className="drawer" closable={false} placement={'right'} onClose={hideFiltersDrawer} open={filtersDrawer} key={'right'}>
        {renderFilters()}
      </Drawer>
    </div>
  );
}

export default Questions;
