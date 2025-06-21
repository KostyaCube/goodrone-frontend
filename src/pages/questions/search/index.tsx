import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { IQuestion } from '@src/shared/types';
import { SpinnerWrapper } from '@src/shared/ui/styled components';
import QuestionList from '../questionList';

function Search(): JSX.Element {
  const location = useLocation();
  const { t } = useTranslation();

  if (!location.state) return <Navigate to="/questions" />;
  let data: IQuestion[] = location.state.data;

  return (
    <>
      <p style={{ margin: '0 0 1.5rem 0' }}>
        {t('questions.searchRes')} "{location.state.search}"
      </p>
      {location.state.loading && (
        <SpinnerWrapper>
          <Spin size="large" />
        </SpinnerWrapper>
      )}

      {data && !location.state.loading && <QuestionList chosenWords={[]} sorting={''} own={false} savedQuestions={data} />}
    </>
  );
}

export default Search;
