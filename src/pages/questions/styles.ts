import styled from 'styled-components';

export const Sidebar = styled.nav`
  background: #fff;
  width: 240px;
  padding: 16px;
  border-radius: 8px;
  @media (min-width: 1200px) {
    min-width: 197px;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const ChosenChips = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: row;
  margin: -10px 0 13px 0;
  flex-wrap: wrap;
  padding-right: 44px;
`;

export const FilterButton = styled.button`
  margin: 16px 4px 0 0;
  position: absolute;
  right: 8px;
  @media (max-width: 300px) {
    display: none;
  }
`;

export const TabsWrapper = styled.div`
  background-color: #f7f9fa;
  padding: 0 16px 16px 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  min-height: 62px;
  .ant-tabs-nav {
    margin: 0;
  }
  button {
    @media (max-width: 1000px) {
      display: none;
    }
  }
`;
