import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Avatar } from 'antd';
import { Article } from './styles';
import ActionButtons from './actions/articleButtons';
import { IArticle, IKeyword } from '@src/shared/types';
import { extractTextFromHTML } from '@src/shared/utils';
import { Flex } from '@src/shared/ui/styled components';

function ArticleCard({ data }: { data: IArticle }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Article>
      <div
        data-testid="card"
        className="author"
        onClick={() => {
          navigate(`/authors/${data.authorId}`, { state: { id: data.author.id } });
        }}
      >
        <Avatar className="ava" style={{ backgroundColor: '#553c70', margin: 0 }} size="default">
          {`${data?.author.lastname?.charAt(0)}${data?.author.firstname?.charAt(0)}` || 'U'}
        </Avatar>
        <span className="name">
          {data.author.lastname} {data.author.firstname}
        </span>

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
        {t('articles.more')}
      </Link>

      <ActionButtons article={data} />
    </Article>
  );
}

export default ArticleCard;
