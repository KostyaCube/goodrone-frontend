import styled from 'styled-components';

export const Sidebar = styled.nav`
  background: #fff;
  max-width: min-content;
  @media (min-width: 1200px) {
    min-width: 197px;
  }
  @media (max-width: 1000px) {
    display: none;
  }
  .filters {
    margin-top: 18px;
    @media (max-width: 800px) {
      margin-top: 14px;
    }
  }
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 223px;
  padding: 20px 16px 16px 30px;
  background-color: #f5f5f7;
  border-radius: 16px;
  margin-bottom: 16px;
  position: relative;
  border: 1px solid transparent;
  @media (max-width: 1000px) {
    padding: 10px 14px 14px 20px;
    h4 {
      font-size: 14px;
    }
  }
  @media (max-width: 1200px) {
    h4 {
      margin: 0.5rem 0 0 0;
    }
  }
  &:hover {
    box-shadow: 0px 11px 15px 0px rgba(0, 0, 0, 0.1);
  }
  button {
    background: transparent;
    border: 2px solid transparent;
    display: flex;
    align-items: center;
    padding: 0;
    margin-right: 14px;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0.4px;
    color: #6c6c6c;
    &:hover {
      cursor: pointer;
      color: black !important;
      svg path {
        stroke: black;
      }
    }
    &:focus-visible {
      height: 20px;
      border: 2px solid black;
    }
  }
  svg {
    margin-right: 4px;
  }
  .span {
    margin: 8px 0 8px 8px;
    color: #6c6c6c;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.3px;
  }
  .green {
    color: #4caf50;
  }
  .avatar {
    max-height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
  .position {
    margin: 0 0px -4px 8px;
    color: #6c6c6c;
    font-size: 14px;
    font-weight: 400;
    @media (max-width: 1200px) {
      display: none;
    }
  }
  .content {
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 3em;
    color: black;
    @media (max-width: 1200px) {
      margin: 0.5rem 0 0 0;
    }
    @media (max-width: 1000px) {
      font-size: 12px;
    }
  }
  .nomargin {
    margin: 0 8px -3px 0;
  }
  .actions-buttons {
    @media (max-width: 1000px) {
      flex-wrap: wrap;
      margin-top: 10px;
      span {
        margin: 1px;
      }
    }
    @media (max-width: 850px) {
      justify-content: flex-end;
      button {
        span {
          display: none;
        }
      }
    }
    @media (max-width: 350px) {
      button {
        span {
          display: none !important;
        }
      }
    }
  }
  .start {
    @media (max-width: 350px) {
      justify-content: flex-start;
    }
  }
`;

export const Rating = styled.div<{ $blue?: string }>`
  position: absolute;
  display: flex;
  left: 8px;
  bottom: 20px;
  align-items: center;
  flex-direction: column;
  color: #6c6c6c;
  text-align: center;
  font-size: 12px;
  color: ${(props) => (props.$blue === 'true' ? '#44958f' : '#6C6C6C')};
  &:hover {
    cursor: pointer;
    color: black;
    svg path {
      stroke: black;
    }
  }
  svg {
    margin: 4px 0 0 2px;
  }
  svg {
    fill: ${(props) => (props.$blue === 'true' ? '#44958f' : '')};
  }
  svg path {
    stroke: ${(props) => (props.$blue === 'true' ? '#44958f' : '')};
  }
`;

export const ButtonWrapper = styled.div<{ $nomargin?: string }>`
  display: flex;
  justify-content: flex-end;
  margin: ${(props) => (props.$nomargin === 'true' ? '0' : '8px 0')};
  @media (max-width: 1400px) {
    justify-content: flex-start;
  }
`;

export const ChosenChips = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: row;
  margin: -10px 0 10px 0;
  flex-wrap: wrap;
  padding-right: 44px;
`;

export const FilterButton = styled.button`
  margin: 12px 4px 0 0;
  position: absolute;
  right: 0;
  @media (max-width: 300px) {
    display: none;
  }
`;

export const SaveButton = styled.button<{ $blue?: string }>`
  color: ${(props) => (props.$blue === 'true' ? '#44958f' : '#6C6C6C')};
  svg {
    fill: ${(props) => (props.$blue === 'true' ? '#44958f' : '')} !important;
  }
  svg path {
    stroke: ${(props) => (props.$blue === 'true' ? '#44958f' : '')} !important;
  }
  .save-article {
    transform: scale(1.4) !important;
    display: flex;
    margin: 2px 20px 0 13px;
  }
`;
