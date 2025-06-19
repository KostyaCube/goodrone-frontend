import { styled } from 'styled-components';

export const OuterContainer = styled.section`
  margin: 0 auto;
  padding: 110px 0 140px 0;
  background-color: #f7f9fa;
  position: relative;
  @media (max-width: 600px) {
    padding: 0;
    height: calc(100vh - 120px);
  }
`;

export const InnerContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  .ant-tabs .ant-tabs-content-holder {
    display: block;
  }
  .anticon {
    color: rgba(0, 0, 0, 0.25);
  }
  .anticon-eye {
    display: inline-flex;
  }
  h2 {
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: #19082a;
  }
  .logo {
    border-radius: 8px;
    width: 42px;
    margin-right: 12px;
  }
  .ant-checkbox + span {
    letter-spacing: 0.05em;
  }
  p {
    text-align: center;
    margin: 16px 0;
    color: #6c6c6c;
    font-size: 14px;
  }
  .form-button {
    border-radius: 8px;
    width: 100%;
    height: 36px;
  }
  .ant-form-item {
    margin-bottom: 16px !important;
  }
`;

export const TabsWrapper = styled.div`
  margin-top: 7px;
  padding-top: 24px;
  min-height: 366px;
`;
