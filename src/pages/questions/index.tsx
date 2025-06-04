import { useAppSelector } from '@src/app/store';
import { IKeyword, IQuestion } from '@src/shared/types';
import { SpinnerWrapper } from '@src/shared/ui/styled components';
import { Spin, Empty, Pagination, PaginationProps } from 'antd';
import { JSX, useState } from 'react';

type IProps = {
  chosenWords: IKeyword[];
  sorting: string;
  own: boolean;
  chapter: string;
  savedQuestions?: IQuestion[];
};

function QuestionList({ chosenWords, sorting, own, chapter, savedQuestions }: IProps): JSX.Element {
  const token = useAppSelector((state) => state.login.token);
  const me = useAppSelector((state) => state.login.user);
  const [skip, setskip] = useState<number>(0);

  const { data: count } = useGetQuestionsCountQuery();
  const { data, isLoading } = useGetQuestionsQuery(
    {
      keywords: chosenWords.map((word) => `${word.id}`),
      order: sorting,
      userID: own ? me?.id : '',
      chapter,
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
          savedQuestions.map((item: IQuestion) => <QuestionCard fromSearch me={me ? me : undefined} question={item} key={item.id} />)
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
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
            data.map((item: IQuestion) => <QuestionCard me={me ? me : undefined} question={item} key={item.id} />)
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
          <Pagination onChange={onChange} showLessItems style={{ textAlign: 'center', marginTop: '1rem' }} defaultCurrent={1} total={count && count + 5} />
        </>
      )}
    </>
  );
}

export default QuestionList;
