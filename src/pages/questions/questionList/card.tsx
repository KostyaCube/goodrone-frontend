import { JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, message } from 'antd';
import { Remove, Edit, Share, Save, Arrow } from '@src/assets/icons/icon-components';
import { useTranslation } from 'react-i18next';
import { IKeyword, IQuestion, User } from '@src/shared/types';
import { extractTextFromHTML, getDay, getTime } from '@src/shared/utils';
import { Chips, Flex } from '@src/shared/ui/styled components';
import { QuestionWrapper, Rating, SaveButton } from './styles';
import { useAppSelector } from '@src/app/store';
import { useDeleteQuestionMutation, useRemoveFromFavoritesMutation, useSaveToFavoritesMutation, useVoteQuestionMutation } from '@src/app/store/api/questions';
import { useCustomModals, useModal } from '@src/app/providers/modals';

type IProps = {
  question: IQuestion;
  fromSearch?: boolean;
  me?: User;
};

export function QuestionCard({ question, fromSearch, me }: IProps): JSX.Element {
  const [voteQuestion] = useVoteQuestionMutation();
  const [deleteQuestion, { isSuccess, isError }] = useDeleteQuestionMutation();
  const [addToFav] = useSaveToFavoritesMutation();
  const [removeFromFav] = useRemoveFromFavoritesMutation();

  const { needAuthMessage, showDeletingConfirm } = useCustomModals();
  const { openAuthModal } = useModal();

  const { t } = useTranslation();

  const token = useAppSelector((state) => state.login.token);

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const arrOfFavIds: number[] = me ? me.savedQuestions.map((item) => item.id) : [];

  function voteUp(questionId: number): void {
    if (me) {
      voteQuestion({ questionId });
    }
  }

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const textToCopy = `${window.location.href}/${question.id}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      message.success({
        type: 'success',
        content: t('questions.linkCopied'),
        duration: 2
      });
    });
  };

  return (
    <Link target={fromSearch ? '_blank' : '_self'} to={!openEditModal ? `/questions/${question.id}` : ''}>
      <QuestionWrapper>
        <Flex $justify="between">
          <Flex>
            <Avatar style={{ verticalAlign: 'middle', backgroundColor: '#553c70', gap: 4, marginRight: '8px' }}>
              {`${question?.author.lastname?.charAt(0)}${question?.author.firstname?.charAt(0)}` || 'U'}
            </Avatar>
            <h4 className="nomargin">{question.author.firstname.charAt(0).toUpperCase() + question.author.firstname.slice(1) || 'Unknown user'}</h4>
            <span className="span position">{question.author.activity || `${t('questions.position')}`}</span>
          </Flex>
          <Flex>
            {me && token && me.id === question.authorId ? (
              <Flex style={{ margin: 0 }} className="actions-buttons">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    showDeletingConfirm({ callback: deleteQuestion, id: `${question.id}`, text: `${t('questions.deleteConfirm')}` });
                  }}
                >
                  <Remove />
                  <span>{t('questions.delete')}</span>
                </button>
                <button
                  style={{ marginRight: 0 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenEditModal(true);
                  }}
                  className="blue"
                >
                  <Edit />
                  <span>{t('questions.edit')}</span>
                </button>
              </Flex>
            ) : (
              <>
                <span className="span nomargin">{getTime(question.created_at)}</span>
                <span className="span nomargin">{getDay(question.created_at)}</span>
              </>
            )}
          </Flex>
        </Flex>

        <h4>{question.title}</h4>
        <p className="content">{extractTextFromHTML(question.body)}</p>

        {!!question.keywords.length && (
          <div className="chips">
            {question.keywords.map((item: IKeyword) => {
              return (
                <Chips $events="none" key={item.id}>
                  {item.body}
                </Chips>
              );
            })}
          </div>
        )}

        <Flex $justify="between">
          <Flex className="actions-buttons start" style={{ paddingLeft: '24px' }}>
            <button onClick={copyToClipboard}>
              <Share />
              <span style={{ display: `${!me ? 'block' : ''}` }}>{t('questions.share')}</span>
            </button>
            {!!(me && token) && (
              <SaveButton
                $blue={arrOfFavIds.includes(question.id) ? 'true' : 'false'}
                onClick={(e) => {
                  e.preventDefault();
                  if (arrOfFavIds.includes(question.id)) {
                    removeFromFav({ questionId: question.id });
                  } else {
                    addToFav({ questionId: question.id });
                  }
                }}
              >
                <Save />
                <span>{arrOfFavIds.includes(question.id) ? `${t('questions.remove')}` : `${t('questions.save')}`}</span>
              </SaveButton>
            )}
          </Flex>
          <Flex className="actions-buttons">
            <span className="span">
              {t('questions.views')} {question.views}
            </span>
            <span className={`span ${question?.answers?.length && 'green'}`}>
              &nbsp;{t('questions.answers')} {question?.answers?.length || 0}
            </span>
          </Flex>
        </Flex>

        <Rating
          onClick={(e) => {
            e.preventDefault();
            token
              ? voteUp(question.id)
              : needAuthMessage({
                  callback: () => {
                    openAuthModal();
                  },
                  action: `${t('questions.rateQ')}`
                });
          }}
          $blue={`${me && me.likedQuestions.includes(question.id) && 'true'}`}
        >
          {question.rating}
          <Arrow />
        </Rating>
      </QuestionWrapper>
    </Link>
  );
}
