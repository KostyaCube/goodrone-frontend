import styled from 'styled-components';

interface FlexProps {
  $justify?: 'start' | 'between';
  $center?: string;
  $wrap?: string;
  $margin?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  align-items: center;
  min-width: 100px;
  justify-content: ${({ $center, $justify }) => {
    if ($center === 'true') return 'center';
    if ($justify === 'between') return 'space-between';
    return 'flex-start';
  }};
  flex-wrap: ${({ $wrap }) => ($wrap === 'true' ? 'wrap' : 'nowrap')};
  margin: ${({ $margin }) => $margin || '0'};
`;

export const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div`
  max-width: 1980px;
  margin: 0 auto;
  font-family: 'Inter';
  font-style: normal;
`;

export const Chips = styled.div<{ $pressed?: string; $events?: string }>`
  pointer-events: ${(props) => `${props.$events}`};
  border-radius: 16px;
  padding: 4px 12px;
  width: max-content;
  margin: 8px 4px 0 0;
  background: ${(props) => (props.$pressed === 'true' ? '#44958f' : '#E8F1FF')};
  color: ${(props) => (props.$pressed === 'true' ? '#FFF' : 'black')};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 1000px) {
    font-size: 12px;
  }
`;
