import { MailOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Select, Button, Input } from 'antd';
import { type Dispatch, type SetStateAction, type JSX, useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CustomHeader, Goodrone, InputContainer } from './styles';
import logo from '/src/assets/goodrone-logo.png';
import { Flex } from '@src/shared/ui/styled components';
import Authorization from '../authorization';
import { useModal } from '@src/app/providers/modals';
import { defaultLang, languages } from '@src/shared/constants';
import { useLazyGetQuestionsSearchQuery } from '@src/app/store/api/questions';
import { useTranslation } from 'react-i18next';

type Iprops = {
  token: string | null | undefined;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  mobileInputSearch: boolean;
  setmobileInputSearch: Dispatch<SetStateAction<boolean>>;
};

function Header({ token, setOpenMenu, setmobileInputSearch }: Iprops): JSX.Element {
  const { openModal, openAuthModal, closeAuthModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchString, setsearchString] = useState<string>('');
  const [search, { isLoading }] = useLazyGetQuestionsSearchQuery();

  // const showDrawer = (e: { stopPropagation: () => void }) => {
  //   e.stopPropagation();
  //   setOpenMenu(true);
  // };

  const searchExec = async () => {
    if (searchString.trim().length > 3) {
      const result = (await search(searchString)).data;
      navigate('questions/search', {
        state: {
          data: result,
          search: searchString,
          loading: isLoading
        }
      });
      if (result && result.length > 0) setsearchString('');
    }
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.width = '100%';
    }
  }, [openAuthModal]);

  return (
    <>
      <CustomHeader>
        <Flex style={{ minWidth: '110px' }}>
          {/* {location.pathname.includes('questions') && <button onClick={showDrawer} className="burger"></button>} */}
          <Link style={{ textDecoration: 'none' }} to={'/'}>
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'/'}>
            <Goodrone>Goodrone</Goodrone>
          </Link>
          {location.pathname.includes('question') && <SearchOutlined className="search-icon" onClick={() => setmobileInputSearch((prev) => !prev)} />}
        </Flex>
        <InputContainer>
          {location.pathname.includes('/questions') && (
            <Input
              value={searchString}
              onChange={(e) => setsearchString(e.target.value)}
              size="large"
              placeholder={t('questions.search')}
              prefix={<SearchOutlined />}
              style={{ borderRadius: '16px' }}
              onPressEnter={searchExec}
            />
          )}
        </InputContainer>

        <Flex style={{ gap: '8px' }}>
          <Select
            defaultValue={defaultLang}
            style={{ width: 60 }}
            onChange={() => {}}
            options={languages.map((item) => ({
              value: item.id,
              label: item.code.toUpperCase()
            }))}
          />
          {token && (
            <Button>
              <MailOutlined style={{ color: '#6C6C6C', fontSize: 20 }} />
            </Button>
          )}

          <Button onClick={() => openAuthModal()}>
            <UserOutlined style={{ color: '#6C6C6C', fontSize: 20 }} />
          </Button>
        </Flex>
      </CustomHeader>

      <Modal
        centered
        open={openModal}
        onCancel={() => {
          closeAuthModal();
        }}
        width={650}
        className="auth"
        footer={[]}
      >
        <Authorization close={closeAuthModal} />
      </Modal>
    </>
  );
}

export default Header;
