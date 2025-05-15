import { styled } from "styled-components";

export const OuterContainer = styled.section`
    max-width: 1920px;
    margin: 0 auto;
    padding: 110px 0 140px 0;
    background-color: #F7F9FA;
    position: relative;
    font-family: 'Roboto';
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
        font-family: inherit;
        font-weight: 500;
        line-height: 1.2;
        color: #19082a;
    }
    .logo {
        border-radius: 8px;
        width: 42px;
        margin-right: 12px;
    }
    .ant-checkbox+span {
        letter-spacing: 0.05em;
    }
    p {
        text-align: center;
        margin: 16px 0;
        color: #6C6C6C;
        font-size: 14px;
    }
    .login-form-button {
        border-radius: 8px;
        width: 100%;
        height: 36px; 
    }
    .ant-form-item {
        margin-bottom: 16px !important;
    }
`;