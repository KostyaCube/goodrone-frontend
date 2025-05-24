import styled from "styled-components";

export const MoreButton = styled.button`
    background: transparent;
    border: 2px solid transparent;
    cursor: pointer;
    transform: scale(1.5);
    &:hover {
        transform: scale(1.7);
    }
    &:active {
        transform: scale(1.5);        
    }
`;

export const ActionButton = styled.button`  
    background: transparent;
    border: 2px solid transparent;
    display: flex;
    align-items: center;
    padding: 0;
    width: 100%;
    margin-right: 14px;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; 
    letter-spacing: 0.4px;
    color: #6C6C6C;
    cursor: pointer;
    span {
        margin-left: 8px;
    }
`;

export const Position = styled.span`
    color: #6C6C6C;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
`;