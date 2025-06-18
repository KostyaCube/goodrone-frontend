import { styled } from 'styled-components';

export const Position = styled.span`
  color: #6c6c6c;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 400;
`;

export const Heading = styled.h4`
  margin: 24px 0 6px 0;
  font-size: 16px;
  font-weight: 600;
  @media (max-width: 1000px) {
    margin-top: 20px;
  }
`;

export const LightSpan = styled.span`
  margin-right: 12px;
  color: #6c6c6c;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.3px;
`;

export const ImagesContainer = styled.div`
  .image {
    margin: 1rem 1rem 0 0;
  }
`;

export const Content = styled.div`
  margin-bottom: 1rem;
  .content {
    font-size: 16px;
    font-weight: 400;
    margin-top: 20px;
  }
`;

export const Wrapper = styled.div`
  margin-top: 12px;
`;

export const ChipsWrapper = styled(Wrapper)`
  display: flex;
  position: relative;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

export const ImageDesc = styled.h6`
  color: #535354;
  font-size: 12px;
  font-weight: 400;
`;

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
  color: #6c6c6c;
  cursor: pointer;
  span {
    margin-left: 8px;
  }
`;
