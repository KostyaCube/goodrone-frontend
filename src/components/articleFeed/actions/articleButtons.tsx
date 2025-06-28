import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { CommentOutlined, DeleteOutlined, SaveOutlined, EyeOutlined, LikeOutlined, LinkOutlined } from '@ant-design/icons';
import { useAppSelector } from '@src/app/store';
import { IArticle } from '@src/shared/types';
import { usePostLikeMutation, useRemovePostFromFavMutation, useSavePostToFavMutation } from '@src/app/store/api/articles';
import { useCustomModals, useModal } from '@src/app/providers/modals';
import { useGetMeQuery } from '@src/app/store/api/APIbase';
import { ActionButtonsWrapper, Button } from './styles';

function ActionButtons({ article, simple }: { article: IArticle | undefined; simple?: boolean }) {
  const token = useAppSelector((state) => state.login.token);
  const { data: me } = useGetMeQuery(undefined, { skip: !token });

  const arrOfLiked: number[] = me ? me.likedArticles : [];
  const arrOfFavIds: number[] = me && me.savedPosts ? me.savedPosts.map((item) => item.id) : [];

  const { openAuthModal } = useModal();
  const { needAuthMessage } = useCustomModals();
  const { t } = useTranslation();
  const navigate = useNavigate();
  let paramId = useParams().id;

  const [likeRequest] = usePostLikeMutation();
  const [addToFav] = useSavePostToFavMutation();
  const [removeFromFav] = useRemovePostFromFavMutation();

  function handleLike() {
    if (me && article) {
      likeRequest({ articleId: article.id });
    }
  }

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    const textToCopy = paramId ? `${window.location.href}` : `${import.meta.env.VITE_THIS}articles/${id}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      message.success({
        type: 'success',
        content: t('articles.linkCopied'),
        duration: 2
      });
    });
  };

  if (article)
    return (
      <ActionButtonsWrapper $simple={String(simple)}>
        <Button>
          <EyeOutlined />
          <span className="count">{article.views || 1}</span>
        </Button>
        <Button
          $blue={arrOfLiked.includes(article.id) && token ? 'true' : 'false'}
          onClick={() => {
            token
              ? handleLike()
              : needAuthMessage({
                  callback: () => {
                    openAuthModal();
                  },
                  action: t('articles.toLikeArticles')
                });
          }}
        >
          <LikeOutlined />
          <span className="count">{article.rating}</span>
        </Button>

        <Button onClick={() => navigate(`/articles/${article.id}?comments`)}>
          <CommentOutlined />
          <span className="count">{article.comments.length}</span>
        </Button>

        {!!token && !simple && (
          <Button
            $blue={arrOfFavIds.includes(article.id) ? 'true' : 'false'}
            onClick={(e) => {
              e.preventDefault();
              if (arrOfFavIds.includes(article.id) && me) {
                removeFromFav({ userID: me.id, articleId: article.id });
              } else {
                if (me) addToFav({ userID: me.id, articleId: article.id });
              }
            }}
          >
            <div className="save-article">{arrOfFavIds.includes(article.id) ? <DeleteOutlined /> : <SaveOutlined />}</div>
          </Button>
        )}
        {!simple && (
          <Button onClick={(e) => copyToClipboard(e, article.id)}>
            <LinkOutlined />
            <span className="count" />
          </Button>
        )}
      </ActionButtonsWrapper>
    );
  return <div />;
}

export default ActionButtons;
