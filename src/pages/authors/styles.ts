import { styled } from 'styled-components';

export const Wrapper = styled.div`
  background-color: white;
  border-radius: 8px;
`;

export const Container = styled.div`
  padding: 120px 24px 24px 260px;
  display: grid;
  grid-template-columns: 973px 408px;
  background-color: #f7f9fa;
  gap: 16px;
  min-height: 85vh;
  .left-column {
    display: flex;
    flex-direction: column;
  }
  .right-column {
    .actions {
      margin-top: 8px;
      display: flex;
      min-width: 270px;
      button {
        background-color: transparent;
        border: none;
        display: inline-flex;
        align-items: center;
        padding-left: 0;
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
      color: #6c6c6c;
      font-weight: 400;
      font-size: 16px;
    }
  }
  .tabs {
    margin-top: 24px;
  }
  .ant-tabs .ant-tabs-content-holder {
    // TODO: add select for switching tabs in mobile version
    display: block;
  }
  @media (max-width: 1700px) {
    padding: 120px 80px 24px 80px;
  }
  .ant-tabs-tab {
    @media (max-width: 600px) {
      margin-left: 1rem !important;
    }

    &:first-child {
      @media (max-width: 400px) {
        margin-left: 0 !important;
      }
    }
  }
  @media (max-width: 1600px) {
    padding: 120px 40px 24px 40px;
    grid-template-columns: 750px 408px;
  }
  @media (max-width: 1200px) {
    padding: 120px 24px 24px 24px;
    grid-template-columns: 550px 208px;
  }
  @media (max-width: 1000px) {
    padding: 80px 24px 24px 24px;
    grid-template-columns: auto;
    .right-column {
      display: none;
    }
  }
  @media (max-width: 600px) {
    padding: 80px 8px 24px 8px;
  }
`;

export const AuthorHeader = styled(Wrapper)<{ $hover?: string }>`
  padding: 32px 40px;
  display: flex;
  justify-content: space-between;
  &:hover {
    color: ${(props) => props.$hover && '#418DFF'};
    cursor: ${(props) => props.$hover && 'pointer'};
  }
  .author-data {
    display: flex;
    align-items: center;
    @media (max-width: 600px) {
      flex-direction: column;
      text-align: center;
    }
  }
  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    margin-right: 16px;
    @media (max-width: 600px) {
      margin: 0 0 16px 0;
    }
  }
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .position {
    font-size: 14px;
    display: block;
    margin-top: 8px;
  }
  .buttons {
    display: flex;
    align-items: center;
    gap: 16px;
    @media (max-width: 600px) {
      gap: 8px;
      flex-direction: column;
      margin-top: 16px;
      button {
        width: 100%;
      }
    }
  }
  .ava {
    width: 64px;
    height: 64px;
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    background-color: #51a18bac;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    padding: 16px;
  }
`;

export const AuthorComments = styled(Wrapper)`
  padding: 16px;
  .heading {
    font-size: 18px;
    color: #6c6c6c;
    span {
      color: black;
      margin: 0.5rem;
    }
  }
`;
