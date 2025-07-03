import { styled } from 'styled-components';

export const OuterContainer = styled.div`
  z-index: 5;
  width: 331px;
  position: fixed;
  overflow: hidden;
  right: 0;
  .ant-collapse-header {
    padding: 6px 8px !important;
    font-size: 14px;
    font-weight: 600;
  }
  .ant-collapse-content-box {
    max-height: 75vh !important;
    overflow-y: auto;
    padding: 0 !important;
  }
  .wrapper {
    font-size: 12px;
    margin: 8px 0;
    img {
      margin: 0 4px;
      align-items: center;
      margin-bottom: -3px;
    }
    a {
      white-space: nowrap;
    }
  }
  @media (max-width: 350px) {
    display: none;
  }
`;

export const InnerContainer = styled.div`
  padding: 0 8px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background: #fff;
  padding: 8px;
  position: fixed;
  width: 313px;
  bottom: 0px;
  border-top: 1px solid #dddddf;
`;

export const Button = styled.button<{ $icon: string }>`
  height: 38px;
  width: 38px;
  background: center center no-repeat url(${(props) => props.$icon});
  border: none;
  cursor: pointer;
  margin-left: 8px;
  &:hover {
    opacity: 0.8;
  }
`;
