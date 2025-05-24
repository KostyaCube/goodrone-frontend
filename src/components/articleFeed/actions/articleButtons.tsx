import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { LikeButton, SaveButton } from '../styles';
import { Comments, Like, Save, ShareArrow, Views } from '@src/assets/icons/icon-components';
import { useAppSelector } from '@src/app/store';
import { IArticle } from '@src/shared/types';
import { usePostLikeMutation, useRemovePostFromFavMutation, useSavePostToFavMutation } from '@src/app/store/api/articles';
import { needAuthMessage } from '@src/shared/ui/moldals';
import { useAuthModal } from '@src/app/providers/authModal';

function ActionButtons({ article }: { article: IArticle | undefined }) {
  const token = useAppSelector((state) => state.login.token);
  const me = useAppSelector((state) => state.login.user);

  const arrOfLiked: number[] = me ? me.likedArticles : [];
  const arrOfFavorites: number[] = me ? me.savedPosts.map((item) => item.id) : [];

  const { openModal } = useAuthModal();
  const { t } = useTranslation();
  const navigate = useNavigate();
  let paramId = useParams().id;

  const [likeRequest] = usePostLikeMutation();
  const [addToFav] = useSavePostToFavMutation();
  const [removeFromFav] = useRemovePostFromFavMutation();

  function handleLike() {
    if (me && article) {
      likeRequest({ userId: me.id, articleId: article.id });
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
      <div className="actions">
        <button data-testid="views">
          <Views />
          <span className="count">{article.views || 1}</span>
        </button>
        <LikeButton
          data-testid="like"
          $blue={arrOfLiked.includes(article.id) && token ? 'true' : 'false'}
          onClick={() => {
            token
              ? handleLike()
              : needAuthMessage({
                  callback: () => {
                    openModal();
                  },
                  action: t('Authors.toLike')
                });
          }}
        >
          <Like />
          <span className="count">{article.rating}</span>
        </LikeButton>
        <button data-testid="comments" onClick={() => navigate(`/articles/${article.id}?comments`)}>
          <Comments />
          <span className="count">{article.comments.length}</span>
        </button>
        {!!token && (
          <SaveButton
            data-testid="save"
            $blue={arrOfFavorites.includes(article.id) ? 'true' : 'false'}
            onClick={(e) => {
              e.preventDefault();
              if (arrOfFavorites.includes(article.id) && me) {
                removeFromFav({ userID: me.id, articleId: article.id });
              } else {
                if (me) addToFav({ userID: me.id, articleId: article.id });
              }
            }}
          >
            <div className="save-article">
              <Save />
            </div>
          </SaveButton>
        )}
        <button onClick={(e) => copyToClipboard(e, article.id)} data-testid="share">
          <ShareArrow />
          <span className="count" />
        </button>
      </div>
    );
  return <div />;
}

export default ActionButtons;
