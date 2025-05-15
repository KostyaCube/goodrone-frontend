import styled from 'styled-components';

interface FlexProps {
  justify?: 'start' | 'between';
  center?: string;
  wrap?: boolean;
  margin?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  align-items: center;
  min-width: 100px;
  justify-content: ${({ center, justify }) => {
    if ((center = 'true')) return 'center';
    if (justify === 'between') return 'space-between';
    return 'flex-start';
  }};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
  margin: ${({ margin }) => margin || '0'};
`;

export const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  font-family: 'Inter';
  font-style: normal;
`;
