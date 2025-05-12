import { SearchOutlined } from '@ant-design/icons';
import { type MenuProps, Flex, Input, Dropdown } from 'antd';
import { type Dispatch, type SetStateAction, type JSX, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { InputContainer, CustomHeader, Dolon } from './styles';

type Iprops = {
  token: string | null | undefined;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  mobileInputSearch: boolean;
  setmobileInputSearch: Dispatch<SetStateAction<boolean>>;
};

function Header({ token, setOpenMenu, setmobileInputSearch }: Iprops): JSX.Element {
  const [searchString, setsearchString] = useState<string>('');

  const location = useLocation();

  const showDrawer = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setOpenMenu(true);
  };

  const items: MenuProps['items'] = [];

  return (
    <>
      <CustomHeader>
        <Flex style={{ minWidth: '110px' }}>
          {location.pathname.includes('questions') && <button onClick={showDrawer} className="burger"></button>}
          <Link style={{ textDecoration: 'none' }} to={'/'}></Link>
          <Link style={{ textDecoration: 'none' }} to={'/'}>
            <Dolon className={`${location.pathname.includes('questions') && 'hide'}`}>Dolon</Dolon>
          </Link>
          {location.pathname.includes('question') && <SearchOutlined className="search-icon" onClick={() => setmobileInputSearch((prev) => !prev)} />}
        </Flex>
        <InputContainer>
          {location.pathname.includes('/questions') && (
            <Input
              value={searchString}
              onChange={(e) => setsearchString(e.target.value)}
              size="large"
              prefix={<SearchOutlined />}
              style={{ borderRadius: '16px' }}
            />
          )}
        </InputContainer>

        <Flex>
          <Dropdown menu={token ? { items } : { items: [items[items.length - 1]] }}></Dropdown>
        </Flex>
      </CustomHeader>
    </>
  );
}

export default Header;
