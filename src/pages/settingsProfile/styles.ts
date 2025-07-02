import { Flex, MainContainer } from '@src/shared/ui/styled components';
import styled from 'styled-components';

export const Container = styled(MainContainer)`
  background: transparent;
  padding: 112px;
  padding-bottom: 20px;
  min-width: 300px;
  .avatar {
    background-color: #51a18bac;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    font-size: 20px;
  }
  .pages-select {
    width: 100%;
    border-radius: 16px;
    margin-top: 24px;
    @media (min-width: 800px) {
      display: none;
    }
  }
  .select-link {
    color: black !important;
    display: block;
    width: 100%;
  }
  .selected-flag:hover {
    border-radius: 8px 0 0 8px;
  }
  .open {
    border-radius: 8px 0 0 8px !important;
  }
  @media (max-width: 1600px) {
    padding: 100px 128px;
  }
  @media (max-width: 1000px) {
    padding: 100px 32px;
  }
  @media (max-width: 800px) {
    padding: 96px 16px 16px 16px;
  }
`;

export const Header = styled(Flex)`
  border-radius: 16px;
  background: #fff;
  padding: 32px 40px;
  .name-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 16px;
    span {
      font-size: 14px;
      font-weight: 400;
    }
  }
  @media (max-width: 800px) {
    padding: 20px;
  }
`;

export const ContentWrapper = styled(Flex)`
  margin-top: 24px;
`;

export const Content = styled(Flex)`
  flex-direction: column;

  border-radius: 16px;
  background: #fff;
  padding: 40px;
  flex: 3;
  @media (max-width: 1600px) {
    padding: 40px 120px 40px 40px;
  }
  @media (max-width: 1000px) {
    padding: 20px;
  }
  @media (max-width: 800px) {
    margin-left: 0;
  }
`;

export const FlexCentered = styled(Flex)`
  align-items: center;
  margin-bottom: 40px;
  button {
    margin-left: 16px;
  }
`;
