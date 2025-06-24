import styled from 'styled-components';
import { Rating } from '../questionList/styles';

export const AnswerContainer = styled.div`
  position: relative;
  padding: 16px 40px 16px 16px;
  margin: 16px 0;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #dddddf;
  @media (max-width: 1000px) {
    padding: 10px 14px 14px 20px;
    .mobile-margin {
      margin-left: 1rem;
    }
  }
`;

export const ReplyContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const RatingUp = styled(Rating)`
  right: 16px;
  left: initial;
  top: 14px;
  svg {
    margin: 4px 0 2px 0;
  }
`;

export const RatingDown = styled(Rating)`
  right: 16px;
  left: initial;
  top: 53px;
  svg {
    margin: 4px 0 0 0;
    transform: rotate(180deg);
  }
`;
