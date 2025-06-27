import { Result } from 'antd';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import QuestionList from '../questionList';
import { ResultWrapper } from '@src/shared/ui/styled components';
import { useGetMeQuery } from '@src/app/store/api/APIbase';
import { useAppSelector } from '@src/app/store';

function Favorites(): JSX.Element {
  const token = useAppSelector((state) => state.login.token);
  const { data: me } = useGetMeQuery(undefined, { skip: !token });
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
