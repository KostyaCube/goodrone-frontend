import styled from 'styled-components';

export const ActionButtonsWrapper = styled.div<{ $simple?: string }>`
  display: flex;
  justify-content: space-between;
  min-width: 270px;
  min-height: 37px;
  margin-top: ${(props) => (props.$simple === 'true' ? '0' : '1rem')};
  button {
    transform: ${(props) => (props.$simple === 'true' ? 'scale(0.7)' : 'scale(1)')};
    &:first-child {
      margin-left: ${(props) => (props.$simple === 'true' ? '-17px' : '0')};
    }
  }
`;

export const Button = styled.button<{ $blue?: string }>`
  flex: 1;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  color: ${(props) => (props.$blue === 'true' ? '#44958f' : '#6C6C6C')};
  max-width: 100px;
  .anticon {
    font-size: 24px;
  }
  svg {
    fill: ${(props) => (props.$blue === 'true' ? '#44958f' : '')};
  }
  svg path {
    stroke: ${(props) => (props.$blue === 'true' ? '#44958f' : '')} !important;
  }
  .count {
    font-weight: 400;
    font-size: 18px;
    margin-left: 8px;
    color: ${(props) => (props.$blue === 'true' ? '#44958f' : '#6C6C6C')} !important;
  }
  &:not(:first-child):hover {
    cursor: pointer;
    span {
      color: black !important;
    }
    svg {
      fill: black;
    }
    svg path {
      stroke: black;
    }
  }
  /* &:not(:first-child) {
    display: flex;
    justify-content: center;
  }
  &:last-child {
    display: flex;
    justify-content: flex-end;
  } */
`;
