import styled from 'styled-components';
import { MainContainer } from '@src/shared/ui';

export const Container = styled(MainContainer)`
  padding: 24px 0px;
  display: grid;
  grid-template-columns: auto 336px;
  gap: 16px;
  background-color: #f7f9fa;
  h3 {
    color: #171717;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
  .actions {
    margin-top: 8px;
    display: flex;
    min-width: 270px;
    button {
      background-color: transparent;
      border: none;
      display: inline-flex;
      align-items: center;
      &:not(:first-child):hover {
        cursor: pointer;
        span {
          color: black !important;
        }
        svg path {
          stroke: black;
        }
      }
    }
    @media (max-width: 400px) {
      transform: scale(0.95);
    }
  }
  .count {
    margin-left: 8px;
    margin-bottom: 5px;
    color: #6c6c6c;
    font-weight: 400;
    font-size: 16px;
  }
  .keyword {
    margin: 0 16px 16px 0;
    font-size: 14px;
    color: #6c6c6c;
  }
  @media (max-width: 1600px) {
    grid-template-columns: auto !important;
  }
  @media (max-width: 1000px) {
    display: block;
  }
`;

export const LeftSide = styled.div`
  border-radius: 8px;
  margin-bottom: 16px;
  min-height: 200px;
  max-height: 500px;
  background-color: #fff;
  @media (max-width: 1600px) {
    display: none;
  }
`;

export const Article = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 16px;
  min-height: 200px;
  .author {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      .name {
        text-decoration: underline;
      }
    }
  }
  .cover {
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
    /* max-height: 500px; */
  }
  span {
    font-size: 14px;
    font-weight: 700;
    margin: 8px;
  }
  span:nth-child(3) {
    font-size: 13px;
    font-weight: 400;
    color: #6c6c6c;
  }
  h5 {
    margin-top: 8px;
    font-size: 18px;
    @media (max-width: 600px) {
      font-size: 14px;
    }
  }
  .short-desc {
    font-size: 16px;
    margin: 16px 0;
    overflow: hidden;
    padding-right: 5px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    @media (max-width: 600px) {
      font-size: 14px;
    }
  }
  .ava {
    width: 16px;
    height: 16px;
    position: relative;
    span {
      font-weight: 400;
      font-size: 10px;
      margin: 0;
      position: absolute;
      top: -25%;
    }
  }
  .more-info {
    color: #418dff;
    text-decoration: none;
    display: block;
    width: 100%;
    text-align: right;
    &:hover {
      opacity: 0.8;
    }
    @media (max-width: 600px) {
      font-size: 13px;
    }
  }
  .ql-cursor {
    display: none;
  }
  p {
    br {
      display: contents;
    }
  }
  @media (max-width: 600px) {
    padding: 8px;
  }
`;

export const RightSide = styled.div`
  padding: 16px;
  padding-bottom: 32px;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 16px;
  min-height: 200px;
  max-width: 336px;
  min-width: 300px;
  height: min-content;
  h5 {
    font-size: 18px;
    text-align: left;
  }
  .wrapper {
    margin-top: 36px;
  }
  .title {
    font-size: 16px;
    margin-bottom: 8px;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .content {
    font-size: 14px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 3em;
    overflow: hidden;
  }
  .actions {
    button {
      transform: scale(0.8);
    }
    justify-content: space-between;
  }
  .count {
    margin-bottom: -4px;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const LikeButton = styled.button<{ $blue?: string }>`
  color: ${(props) => (props.$blue === 'true' ? '#418DFF' : '#6C6C6C')};
  svg path {
    stroke: ${(props) => (props.$blue === 'true' ? '#418DFF' : '')};
  }
  .count {
    color: ${(props) => (props.$blue === 'true' ? '#418DFF' : '#6C6C6C')};
  }
`;

export const FeedNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #f7f9fa;
  padding-top: 16px;
  .ant-tabs-nav {
    margin: 0;
  }
  button {
    span {
      @media (max-width: 600px) {
        display: none;
      }
    }
  }
`;

export const SaveButton = styled.button<{ $blue?: string }>`
  color: ${(props) => (props.$blue === 'true' ? '#418DFF' : '#6C6C6C')};
  svg {
    fill: ${(props) => (props.$blue === 'true' ? '#418DFF' : '')} !important;
  }
  svg path {
    stroke: ${(props) => (props.$blue === 'true' ? '#418DFF' : '')} !important;
  }
  .save-article {
    transform: scale(1.4) !important;
    display: flex;
    margin: 2px 20px 0 13px;
  }
`;
