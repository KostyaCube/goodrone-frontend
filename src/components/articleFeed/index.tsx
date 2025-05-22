import { Container, Article } from './styles';
import ArticleCard from './card';
import { Spin, Empty } from 'antd';
import Discussed from './discussed';
import i18n from '@src/shared/localization/config';
import { useGetPostsQuery } from '@src/app/store/api/articles';
import { SpinnerWrapper } from '@src/shared/ui';
import { IArticle } from '@src/shared/types';

function ArticleFeed({ uid, simple, saved }: { uid: string; simple?: boolean; saved?: string }) {
  const { data, isLoading } = useGetPostsQuery({ userID: uid, order: 'created_at', saved, lang: i18n.language }, { refetchOnMountOrArgChange: true });

  return (
    <Container style={{ display: `${simple && 'block'}`, padding: `${simple && 0}` }} data-testid="container">
      {isLoading && (
        <Article style={{ height: '200px' }}>
          <SpinnerWrapper>
            <Spin size="large" data-testid="spinner" />
          </SpinnerWrapper>
        </Article>
      )}

      {data && data.length > 0 && (
        <div>
          {data.map((article: IArticle) => (
            <ArticleCard key={article.id} data={article} />
          ))}
        </div>
      )}
      {!data?.length && !isLoading && (
        <Article style={{ height: '200px' }}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} data-testid={'empty'} />
        </Article>
      )}
      {!simple && <Discussed />}
    </Container>
  );
}

export default ArticleFeed;
