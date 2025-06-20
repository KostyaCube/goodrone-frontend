import { Article, Container } from '@src/components/articleFeed/styles';
import { styled } from 'styled-components';

export const MainContainer = styled(Container)`
  margin: 0;
  min-height: 87vh;
  padding: 104px 120px 24px 120px;
  display: grid;
  grid-template-columns: 216px auto 336px;
  gap: 16px;
  background-color: transparent;
  h3 {
    color: #171717;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    @media (max-width: 400px) {
      font-size: 18px;
    }
  }
  h1 {
    @media (max-width: 400px) {
      font-size: 38px !important;
    }
  }
  @media (max-width: 1600px) {
    grid-template-columns: auto 340px;
    padding: 104px 12px 12px 12px;
  }
  @media (max-width: 1000px) {
    display: block;
  }
  @media (max-width: 400px) {
    padding: 80px 8px 8px 8px;
  }
`;

export const ArticleWrapper = styled(Article)`
  span,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    text-align: left;
  }
  h1 {
    font-size: 48px;
  }
  span {
    margin: 8px;
  }
  h4 {
    font-size: 18px;
    span {
      font-size: 18px;
      color: black;
    }
  }
  p {
    font-size: 16px;
    margin: 16px 0;
  }
  .date {
    font-weight: 400;
    display: block;
    margin: 8px 0 16px 0;
    font-size: 12px;
  }
  .keystyled {
    background-color: #e8fffe;
    border: 1px solid grey;
    padding: 8px 16px;
    color: black;
    border-radius: 20px;
    margin: 8px 8px 8px 0;
    font-size: 16px;
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
    span {
      font-weight: 400;
    }
    &:focus-visible {
      height: 20px;
      border: 2px solid black;
    }
    @media (max-width: 400px) {
      transform: scale(0.9);
      margin-right: 4px;
    }
  }
  .content {
    margin-top: 24px;
    span {
      margin: 8px 0;
      font-weight: 400;
    }
    img {
      object-fit: cover;
      border-radius: 8px;
      max-height: 500px;
      max-width: 100%;
    }
  }
  .ava {
    width: 30px;
    height: 30px;
    position: relative;
    span {
      font-weight: 400;
      font-size: 14px;
      margin: 0;
      position: absolute;
    }
  }
`;

export const CommentWrapper = styled.div`
  padding: 16px;
  border-radius: 8px 8px 0 0;
  background-color: white;
  min-height: 150px;
  .heading {
    color: #6c6c6c;
    span {
      color: black;
      margin: 0.5rem;
    }
  }
  .container {
    margin-top: 24px;
    .content {
      font-size: 16px;
      font-weight: 400;
      margin: 12px 0 8px 0;
    }
  }
  .actions {
    margin-top: 0;
    display: flex;
    justify-content: space-between;
    button:first-child {
      transform: scale(0.8);
      padding-left: 0;
      &:hover {
        cursor: pointer;
        span {
          color: black !important;
        }
        svg path {
          stroke: black;
        }
      }
    }
  }
  .reply {
    color: #44958f;
    font-size: 14px;
    &:hover {
      opacity: 0.8;
    }
  }
  .count {
    margin-top: 8px;
  }
  .look {
    display: flex;
    justify-content: flex-end;
    button {
      background: transparent;
      border: none;
      cursor: pointer;
    }
  }
  .date-wrapper {
    margin: 3px 0 0 8px;
  }
  .comment-date {
    color: #6c6c6c;
    font-size: 10px;
  }
`;

export const InputContainer = styled.div`
  background-color: white;
  padding: 0 16px 16px 16px;
  margin-bottom: 16px;
  border-radius: 0 0 8px 8px;
  .replyFor {
    font-size: 14px;
    margin-top: 16px;
    span {
      color: #4096ff;
    }
  }
  .reply-cancel {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export const BackButton = styled.button`
  transform: scale(2);
  cursor: pointer;
  background: transparent;
  border: none;
  &:hover {
    opacity: 0.6;
  }
  @media (max-width: 800px) {
    top: 3%;
  }
`;
