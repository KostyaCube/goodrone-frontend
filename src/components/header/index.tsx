import { MailOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Select, Button } from 'antd';
import { type Dispatch, type SetStateAction, type JSX, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CustomHeader, Goodrone } from './styles';
import logo from '/src/assets/goodrone-logo.png';
import { Flex } from '@src/shared/ui';
import Authorization from '../authorization';
import { useAuthModal } from '@src/app/providers/authModal';
import { defaultLang, languages } from '@src/shared/constants';

type Iprops = {
  token: string | null | undefined;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  mobileInputSearch: boolean;
  setmobileInputSearch: Dispatch<SetStateAction<boolean>>;
};

function Header({ token, setOpenMenu, setmobileInputSearch }: Iprops): JSX.Element {
  const { openAuthModal, openModal, closeModal } = useAuthModal();
  // const [searchString, setsearchString] = useState<string>('');
  const location = useLocation();

  // const showDrawer = (e: { stopPropagation: () => void }) => {
  //   e.stopPropagation();
  //   setOpenMenu(true);
  // };

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
        {/* <InputContainer>
          {location.pathname.includes('/questions') && (
            <Input
              value={searchString}
              onChange={(e) => setsearchString(e.target.value)}
              size="large"
              prefix={<SearchOutlined />}
              style={{ borderRadius: '16px' }}
            />
          )}
        </InputContainer> */}

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

          <Button onClick={() => openModal()}>
            <UserOutlined style={{ color: '#6C6C6C', fontSize: 20 }} />
          </Button>
        </Flex>
      </CustomHeader>

      <Modal
        centered
        open={openAuthModal}
        onCancel={() => {
          closeModal();
        }}
        width={600}
        className="auth"
        footer={[]}
      >
        <Authorization />
      </Modal>
    </>
  );
}

export default Header;
