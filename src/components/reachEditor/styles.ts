import { styled } from 'styled-components';

export const InputContainer = styled.div<{ $focus: string; $gray?: string }>`
  .ql-container.ql-snow {
    border-radius: 8px;
    border: ${(props) => (props.$focus === 'true' ? '1px solid #4096ff' : '1px solid #ccc')};
    box-shadow: ${(props) => (props.$focus === 'true' ? ' 0 0 0 1px rgba(5, 145, 255, 0.1)' : 'none')};
  }
  .ql-toolbar {
    border: none;
    padding: 0 0 8px 0;
    @media (max-width: 400px) {
      max-width: 232px;
      display: flex;
      flex-wrap: wrap;
    }
    .ql-picker-options {
      background-color: ${(props) => props.$gray === 'true' && '#f7f9fa'};
      display: flex;
      border: none;
      top: -1.7px;
      z-index: 2;
      box-shadow: none;
    }
  }
  .ql-editor {
    background-color: white;
    min-height: 10em;
    border-radius: 8px;
    p {
      font-size: 16px;
    }
    ol li {
      font-size: 16px;
    }
    @media (max-width: 400px) {
      font-size: 10px;
    }
  }
  .ql-editor.ql-blank::before {
    color: rgba(0, 0, 0, 0.3);
    font-size: 15px;
    font-style: normal;
  }
  .ql-formats {
    &:first-child {
      border-right: 1px solid #dddddf;
      padding-right: 14px;
    }
    &:nth-child(2) {
      border-right: 1px solid #dddddf;
    }
    &:nth-last-child(2) {
      padding-right: 14px;
    }
    &:last-child {
      @media (max-width: 400px) {
        margin-top: 15px;
      }
    }
  }
  .image-button {
    &:hover {
      svg path {
        fill: #06c;
      }
    }
    svg {
      transform: scale(1.5);
      path {
        fill: #444;
      }
    }
  }
  .ant-radio-group {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  .ant-tag-close-icon {
    color: #fff;
    margin: 0 0 4px 6px !important;
  }
  .ql-container {
    margin-top: 10px;
  }
  .ant-upload-wrapper .ant-upload-list {
    margin-top: 10px;
  }
`;
