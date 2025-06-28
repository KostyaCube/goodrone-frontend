import styled from 'styled-components';
import { MainContainer } from '@src/shared/ui/styled components';

export const Container = styled(MainContainer)`
  padding: 16px 0px;
  display: grid;
  grid-template-columns: auto 336px;
  gap: 16px;
  background-color: transparent;
  h3 {
    color: #171717;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
  .keyword {
    margin: 0 16px 16px 0;
    font-size: 16px;
    color: #6c6c6c;
    font-weight: 600;
  }
  @media (max-width: 1600px) {
    grid-template-columns: auto !important;
  }
  @media (max-width: 1000px) {
    display: block;
  }
`;

export const LeftBlock = styled.div`
  margin-bottom: 16px;
  min-height: 200px;
  max-height: 500px;
  background-color: transparent;
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
    .name {
      font-size: 16px;
    }
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
  }
  .name {
    font-weight: 700;
    margin: 8px;
  }
  .date {
    font-size: 16px;
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
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    @media (max-width: 600px) {
      font-size: 14px;
    }
  }
  .more-info {
    color: #44958f;
    text-decoration: none;
    display: block;
    width: 100%;
    text-align: right;
    svg {
      margin-left: 8px;
    }
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

export const Discuss = styled.div`
  padding: 16px;
  padding-bottom: 32px;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 16px;
  min-height: 185px;
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
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const FeedNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #f7f9fa;
  padding: 0 16px 16px 16px;
  border-radius: 8px;
  margin-top: 16px;
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
