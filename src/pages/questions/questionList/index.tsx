import { useAppSelector } from '@src/app/store';
import { IKeyword, IQuestion } from '@src/shared/types';
import { ResultWrapper, SpinnerWrapper } from '@src/shared/ui/styled components';
import { Spin, Empty, Pagination, PaginationProps } from 'antd';
import { JSX, useState } from 'react';
import { QuestionCard } from './card';
import { useGetQuestionsCountQuery, useGetQuestionsQuery } from '@src/app/store/api/questions';

type IProps = {
  chosenWords: IKeyword[];
  sorting: string;
  own: boolean;
  savedQuestions?: IQuestion[];
};

function QuestionList({ chosenWords, sorting, own, savedQuestions }: IProps): JSX.Element {
  const me = useAppSelector((state) => state.login.user);
  const [skip, setskip] = useState<number>(0);

  const { data: count } = useGetQuestionsCountQuery();
  const { data, isLoading } = useGetQuestionsQuery(
    {
      keywords: chosenWords.map((word) => `${word.id}`),
      order: sorting,
      userID: own && me ? `${me.id}` : '',
      skip: `${skip}`
    },
    { refetchOnMountOrArgChange: true, skip: !!savedQuestions }
  );

  const onChange: PaginationProps['onChange'] = (page) => {
    setskip((page - 1) * 5);
  };

  if (savedQuestions) {
    return (
      <>
        {savedQuestions.length > 0 ? (
          savedQuestions.map((item: IQuestion) => <QuestionCard me={me} question={item} key={item.id} />)
        ) : (
          <ResultWrapper $background="true">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </ResultWrapper>
        )}
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <SpinnerWrapper>
          <Spin size="large" />
        </SpinnerWrapper>
      ) : (
        <>
          {data?.length ? (
            data.map((item: IQuestion) => <QuestionCard me={me} question={item} key={item.id} />)
          ) : (
            <ResultWrapper>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </ResultWrapper>
          )}
          <Pagination onChange={onChange} showLessItems style={{ justifyContent: 'center' }} defaultCurrent={1} total={count && count + 5} />
        </>
      )}
    </>
  );
}

export default QuestionList;
