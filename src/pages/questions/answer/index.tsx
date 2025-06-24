import { JSX, useEffect } from 'react';
import { Avatar, Image } from 'antd';
import { Arrow } from '@src/assets/icons/icon-components';
import { AnswerContainer, RatingUp, RatingDown } from './styles';
import { useTranslation } from 'react-i18next';
import { useCustomModals, useModal } from '@src/app/providers/modals';
import { IAnswer, User } from '@src/shared/types';
import { useAnswerDownMutation, useAnswerUpMutation } from '@src/app/store/api/question-answers';
import { Content, ImageDesc, ImagesContainer, Position } from '../questionPage/styles';
import { Flex } from '@src/shared/ui/styled components';
import { fileNameExtractor } from '@src/shared/utils';

type IProps = {
  answer: IAnswer;
  me: User | null;
};

function Answer({ answer, me }: IProps): JSX.Element {
  const [voteUp] = useAnswerUpMutation();
  const [voteDown] = useAnswerDownMutation();
  const { t } = useTranslation();
  const { openAuthModal } = useModal();
  const { needAuthMessage } = useCustomModals();

  function handleUpClick(answerId: number) {
    if (me && answer.id) {
      voteUp({ answerId });
    }
  }

  function handleDownClick(answerId: number) {
    if (me && answer.id) {
      voteDown({ answerId });
    }
  }

  useEffect(() => {
    const element = document.querySelector(`.answer${answer.id}-body`);
    if (element && answer) {
      element.innerHTML = answer.body;
    }
  }, [answer]);

  return (
    <>
      <AnswerContainer key={answer.id}>
        <Flex>
          <Flex $margin="0 0 12px 0">
            <Avatar style={{ verticalAlign: 'middle', backgroundColor: '#51a18bac', gap: 4, marginRight: '8px' }} size="large">
              {answer.author.firstname?.charAt(0) || 'U'}
            </Avatar>
            <div>
              <h4>{`${answer.author.firstname.charAt(0).toUpperCase()}${answer.author.firstname.slice(1)}` || 'Unknown user'}</h4>
              <Position>{answer.author.activity || `${t('questions.position')}`}</Position>
            </div>
          </Flex>
        </Flex>
        <Content>
          <div className={`answer${answer.id}-body mobile-margin`} />
        </Content>

        {answer.files && !!answer.files.length && (
          <ImagesContainer className="mobile-margin">
            <Image.PreviewGroup>
              {answer.files.map((image) => (
                <div key={image.id} style={{ display: 'inline-block' }}>
                  <Image
                    wrapperClassName="image"
                    width={'auto'}
                    style={{ maxHeight: `${answer.files.length > 2 ? '100px' : '200px'}` }}
                    src={image.link}
                  ></Image>
                  <ImageDesc>{fileNameExtractor(image.link)}</ImageDesc>
                </div>
              ))}
            </Image.PreviewGroup>
          </ImagesContainer>
        )}

        <RatingUp
          $blue={`${me && me.likedAnswers.includes(answer.id) && 'true'}`}
          onClick={() => {
            me
              ? handleUpClick(answer.id)
              : needAuthMessage({
                  callback: () => {
                    openAuthModal();
                  },
                  action: t('questions.rateA')
                });
          }}
        >
          <Arrow />
          <span style={{ color: 'black' }}>{answer.rating}</span>
        </RatingUp>

        <RatingDown
          $blue={`${me && me.dislikedAnswers.includes(answer.id) && 'true'}`}
          onClick={() => {
            me
              ? handleDownClick(answer.id)
              : needAuthMessage({
                  callback: () => {
                    openAuthModal();
                  },
                  action: t('questions.rateA')
                });
          }}
        >
          <Arrow />
        </RatingDown>
      </AnswerContainer>
    </>
  );
}

export default Answer;
