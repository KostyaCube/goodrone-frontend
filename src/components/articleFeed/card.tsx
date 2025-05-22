import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Avatar } from 'antd';
import { Article } from './styles';
import ActionButtons from './articleActionButtons';
import { IArticle, IKeyword } from '@src/shared/types';
import { extractTextFromHTML } from '@src/shared/utils';
import { Flex } from '@src/shared/ui';

function ArticleCard({ data }: { data: IArticle }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Article>
      <div
        data-testid="card"
        className="author"
        onClick={() => {
          navigate(`/authors/${data.authorId}`, { state: { uuid: data.author.uuid } });
        }}
      >
        <Avatar className="ava" style={{ backgroundColor: '#51a18bac', margin: 0 }} size="small">
          {data?.author.name?.charAt(0).toUpperCase() || 'U'}
        </Avatar>
        <span className="name">{data.author.name}</span>

        <span>{moment(data.created_at).fromNow()}</span>
      </div>

      {!!data.files.length && <img className="cover" src={`${data.files[0].link}`} />}

      {!!data.keywords.length && (
        <Flex $wrap="wrap" $margin="16px 0 0 0">
          {data.keywords.map((keyword: IKeyword) => (
            <div key={keyword.id} className="keyword">
              {keyword.body}
            </div>
          ))}
        </Flex>
      )}

      <h5>{data.title}</h5>
      <p className="short-desc">{extractTextFromHTML(data.body)}</p>
      <Link className="more-info" to={`/articles/${data.id}`}>
        {t('Articles.more')}
      </Link>

      <ActionButtons article={data} />
    </Article>
  );
}

export default ArticleCard;
