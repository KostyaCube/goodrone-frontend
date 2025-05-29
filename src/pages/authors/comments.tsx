import { CommentWrapper } from '../article/styles';
import { useTranslation } from 'react-i18next';
import { AuthorComments, Wrapper } from './styles';
import { SetStateAction } from 'react';
import { Empty } from 'antd';
import { IComment } from '@src/shared/types';
import UserComment from '@src/components/articleFeed/comment/comment';

function Comments({ data }: { data: IComment[] }) {
  const { t } = useTranslation();

  function setEdited(value: SetStateAction<IComment | null>): void {}
  function setReply(arg0: IComment): void {}

  if (data && data.length)
    return (
      <AuthorComments>
        <h4 className="heading">
          {t('articles.comments')} <span>{data.length ? data.length : ''}</span>
        </h4>
        {data && data.length > 0 && (
          <CommentWrapper style={{ padding: 0 }}>
            {data.map((item: IComment) => (
              <UserComment simple key={item.id} comment={item} setReply={setReply} setEdited={setEdited} />
            ))}
          </CommentWrapper>
        )}
      </AuthorComments>
    );

  return (
    <Wrapper style={{ padding: '2rem' }}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Wrapper>
  );
}

export default Comments;
