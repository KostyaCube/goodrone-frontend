import { styled } from 'styled-components';

export const Container = styled.div`
  div {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    max-height: 500px;
  }
  h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 31px;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    max-width: 454px;
    margin: 24px 0;
  }
  @media (max-width: 1000px) {
    padding: 8px;
  }
`;
