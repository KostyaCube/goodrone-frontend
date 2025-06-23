import styled from 'styled-components';
import { Flex, MainContainer } from '@src/shared/ui/styled components';

export const Container = styled(MainContainer)`
  padding: 16px 128px 24px 128px;
  display: grid;
  grid-template-columns: 336px auto;
  gap: 16px;
  background: transparent;
  h3 {
    color: #171717;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
  @media (max-width: 1600px) {
    padding: 16px 24px 0 24px;
  }
  @media (max-width: 800px) {
    grid-template-columns: auto;
    padding: 8px;
  }
`;

export const Register = styled(MainContainer)`
  background: radial-gradient(circle at 22% 30%, rgb(197, 197, 198) 0%, rgb(0, 0, 0) 40%, rgb(44, 29, 60) 100%);
  min-height: 408px;
  padding: 90px 256px 0 256px;
  display: flex;
  justify-content: space-between;
  color: black;
  background-size: cover;
  div {
    padding-top: 85px;
  }
  h1 {
    font-size: 32px;
    min-width: 545px;
    font-weight: 700;
    @media (max-width: 1200px) {
      font-size: 24px;
      min-width: initial;
    }
  }
  p {
    margin: 16px 0 32px 0;
  }
  button {
    div {
      display: none;
    }
  }
  img {
    max-width: 60%;
    height: auto;
    margin: 0 2rem 3rem 1rem;
  }
  @media (max-width: 1700px) {
    padding: 80px;
  }
  @media (max-width: 1200px) {
    padding: 80px 0px 0 80px;
    /* margin-bottom: 20px; */
  }
  @media (max-width: 1000px) {
    padding: 80px 0px 0 40px;
  }
  @media (max-width: 650px) {
    flex-wrap: wrap;
  }
  @media (max-width: 650px) {
    padding: 80px 0 0 16px;
  }
`;

export const Marketing = styled(Flex)`
  flex-wrap: wrap;
  gap: 8px;
  .item {
    flex: 1;
    min-height: 157px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 204px;
    border-radius: 8px;
    a {
      max-width: fit-content;
      z-index: 3;
    }
    &:hover {
      color: #44958f;
      a {
        color: #44958f;
      }
    }
    button {
      max-width: fit-content;
    }
  }
  .youtube {
    background: 0% 58% url('/src/assets/images/Banner1.jpg');
    background-size: cover;
    &:hover {
      h2 {
        color: #44958f;
      }
    }
    h2 {
      color: #fff;
      font-size: 22px;
      font-weight: 700;
      max-width: 200px;
      @media (max-width: 1200px) {
        font-size: 18px;
      }
    }
    @media (max-width: 1200px) {
      background: 36% 58% url('/src/assets/images/Banner1.jpg');
      background-size: cover;
    }
    @media (max-width: 800px) {
      background: 0% 10% url('/src/assets/images/mobileyoutube.jpg');
      background-size: cover;
    }
  }

  .third-party {
    background: black;
    color: #fff;
    position: relative;
    overflow: hidden;
    h2 {
      font-size: 34px;
      font-weight: 700;
      max-width: 200px;
      z-index: 3;
      @media (max-width: 1200px) {
        font-size: 28px;
      }
    }
  }
`;

export const Link = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  &:hover {
    opacity: 0.8;
  }
`;

export const Navigation = styled.nav`
  border-radius: 8px;
  min-height: 200px;
  max-height: 500px;
  background-color: #fff;
  padding: 16px;
  position: relative;
  h3 {
    text-align: left;
    font-size: 18px;
  }
  p {
    font-size: 16px;
    text-align: left;
    color: #6c6c6c;
    margin: 8px 0;
  }
  .items-container {
    display: flex;
    flex-wrap: wrap;
  }
  .button-link {
    margin-top: 32px;
    width: 100%;
    cursor: pointer;
    text-decoration: none;
    h3 {
      transition: all 0.5s ease;
    }
    img {
      border-radius: 8px;
      width: 32px;
      float: left;
      margin-right: 16px;
      margin-top: 7px;
    }
    p {
      margin: 0;
      font-size: 16px;
      color: #6c6c6c;
      overflow: hidden;
    }
    &:hover {
      h3 {
        color: #44958f;
      }
      img {
        transform: scale(1.1);
      }
    }
  }
`;

export const Footer = styled.footer`
  margin: 0 auto;
  max-width: 1980px;
  background-color: #fff;
  padding: 25px 80px;
  box-shadow:
    0px -2px 4.6px -5px rgba(0, 0, 0, 0.024),
    0px -5.5px 12.6px -5px rgba(0, 0, 0, 0.035),
    0px -13.3px 30.4px -5px rgba(0, 0, 0, 0.046),
    0px -44px 101px -5px rgba(0, 0, 0, 0.07);
  a {
    font-size: 20px;
    color: #535354;
  }
  svg {
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
  h6 {
    @media (max-width: 310px) {
      display: none;
    }
  }
  @media (max-width: 1200px) {
    padding: 20px 40px;
  }
  @media (max-width: 650px) {
    padding: 10px 16px;
  }
`;

export const Copyright = styled.h6`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
`;
