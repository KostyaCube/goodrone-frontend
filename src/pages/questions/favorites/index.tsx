import { useAppSelector } from '@src/app/store';
import { Result } from 'antd';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import QuestionList from '../questionList';
import { ResultWrapper } from '@src/shared/ui/styled components';

function Favorites(): JSX.Element {
  const me = useAppSelector((state) => state.login.user);
  const { t } = useTranslation();

  if (!me)
    return (
      <ResultWrapper>
        <Result title={t('common.signin')} />
      </ResultWrapper>
    );

  return <QuestionList chosenWords={[]} sorting={''} own={false} savedQuestions={me.savedQuestions} />;
}

export default Favorites;
