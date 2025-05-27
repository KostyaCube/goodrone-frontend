import styled from 'styled-components';

export const CreateWrapper = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: #f7f9fa;
  margin-bottom: 16px;
  min-height: 200px;
  .ant-upload-select {
    background-color: #fff !important;
  }
  .ant-tag-close-icon {
    color: #fff;
    margin: 0 0 4px 6px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  .wrapper {
    position: relative;
    .remove-button {
      position: absolute;
      padding: 0;
      right: 0px;
      border-radius: 4px;
      z-index: 10;
      width: 18px;
      height: 18px;
      border: none;
      background-color: #fff;
      border: 2px solid transparent;
      svg {
        fill: #6c6c6c;
        transform: scale(0.8);
      }
      &:hover {
        background: #cdcdcd;
      }
      &:active {
        border: 2px solid #418dff;
      }
    }
  }
  .stateimage {
    img {
      border-radius: 8px;
    }
  }
`;
