import { Dispatch, JSX, SetStateAction, useEffect, useState } from 'react';
import { Avatar, Dropdown, Image, MenuProps } from 'antd';
import { Arrow, Edit, Remove } from '@src/assets/icons/icon-components';
import { AnswerContainer, RatingUp, RatingDown } from './styles';
import { useTranslation } from 'react-i18next';
import { useCustomModals, useModal } from '@src/app/providers/modals';
import { IAnswer, User } from '@src/shared/types';
import { useAnswerDownMutation, useAnswerUpMutation, useDeleteAnswerMutation } from '@src/app/store/api/question-answers';
import { Content, ImageDesc, ImagesContainer, MoreButton, Position } from '../questionPage/styles';
import { Flex } from '@src/shared/ui/styled components';
import { fileNameExtractor } from '@src/shared/utils';
import { ActionButton } from '@src/components/articleFeed/comment/styles';
import { MoreOutlined } from '@ant-design/icons';

type IProps = {
  answer: IAnswer;
  me: User | null;
  setEdited: Dispatch<SetStateAction<IAnswer | null>>;
};

function Answer({ answer, me, setEdited }: IProps): JSX.Element {
  const [deleteAnswer] = useDeleteAnswerMutation();
  const [voteUp] = useAnswerUpMutation();
  const [voteDown] = useAnswerDownMutation();

  const { t } = useTranslation();
  const { openAuthModal } = useModal();
  const { needAuthMessage, showDeletingConfirm } = useCustomModals();

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

  function del(id: string) {
    deleteAnswer({ answerId: +id });
  }

  useEffect(() => {
    const element = document.querySelector(`.answer${answer.id}-body`);
    if (element && answer) {
      element.innerHTML = answer.body;
    }
  }, [answer]);

  const dropDownMenus: MenuProps['items'] = answer
    ? [
        {
          label: (
            <ActionButton
              onClick={() => {
                showDeletingConfirm({ callback: del, id: `${answer.id}`, text: `${t('articles.deleteConfirmComment')}` });
              }}
            >
              <Remove />
              <span>{t('articles.delete')}</span>
            </ActionButton>
          ),
          key: '0'
        },
        {
          label: (
            <ActionButton
              onClick={(e) => {
                e.preventDefault();
                setEdited(answer);
              }}
              className="blue"
            >
              <Edit />
              <span>{t('articles.edit')}</span>
            </ActionButton>
          ),
          key: '1'
        }
      ]
    : [];

  return (
    <>
      <AnswerContainer key={answer.id}>
        <Flex $margin="0 0 12px 0">
          <Flex>
            <Avatar style={{ verticalAlign: 'middle', backgroundColor: '#51a18bac', gap: 4, marginRight: '8px' }} size="large">
              {answer.author.firstname?.charAt(0) || 'U'}
            </Avatar>
            <div>
              <h4>{`${answer.author.firstname.charAt(0).toUpperCase()}${answer.author.firstname.slice(1)}` || 'Unknown user'}</h4>
              <Position>{answer.author.activity || `${t('questions.position')}`}</Position>
            </div>
          </Flex>

          {answer.author.id === me?.id ? (
            <Dropdown trigger={['click']} menu={{ items: dropDownMenus }} placement="left">
              <MoreButton className="dropdown">
                <MoreOutlined />
              </MoreButton>
            </Dropdown>
          ) : (
            <>
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
            </>
          )}
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
      </AnswerContainer>
    </>
  );
}

export default Answer;
