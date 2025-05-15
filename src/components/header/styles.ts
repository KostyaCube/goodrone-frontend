import styled from 'styled-components';

export const CustomHeader = styled.header`
  width: -webkit-fill-available;
  width: -moz-available;
  width: fill-available;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f7;
  max-height: 72px;
  align-items: center;
  position: fixed;
  z-index: 10;
  box-shadow:
    0px 2px 4.6px -5px rgba(0, 0, 0, 0.024),
    0px 5.5px 12.6px -5px rgba(0, 0, 0, 0.035),
    0px 13.3px 30.4px -5px rgba(0, 0, 0, 0.046),
    0px 44px 101px -5px rgba(0, 0, 0, 0.07);

  .logo {
    width: 42px;
    border-radius: 8px;
  }

  .search-icon {
    margin-left: 10px;
    transform: scale(1.2);
    @media (min-width: 500px) {
      display: none;
    }
  }

  button {
    width: 60px;
  }
`;

export const Goodrone = styled.h1`
  color: black;
  font-size: 35px;
  font-weight: 500;
  margin-left: 12px;
  @media (max-width: 300px) {
    display: none;
  }
`;

export const InputContainer = styled.div`
  min-height: 40px;
  width: 65%;
  @media (max-width: 1200px) {
    width: 40%;
  }
  @media (max-width: 500px) {
    display: none;
  }
`;
