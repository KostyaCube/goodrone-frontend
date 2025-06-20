import { Like } from '@src/assets/icons/icon-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@src/app/store';
import { LikeButton } from '../styles';
import { useLikeCommentMutation } from '@src/app/store/api/comments';
import { CommentProps } from '../comment/comment';
import { useCustomModals, useModal } from '@src/app/providers/modals';

function CommentActionButton({ comment, setReply }: CommentProps) {
  const token = useAppSelector((state) => state.login.token);
  const me = useAppSelector((state) => state.login.user);

  const arrOfFavIds: number[] = me ? me.likedComments : [];
  const { t } = useTranslation();

  const { needAuthMessage } = useCustomModals();

  const { openAuthModal } = useModal();
  const [likeRequest] = useLikeCommentMutation();

  function handleLike() {
    if (me && comment) {
      likeRequest({ commentId: comment.id });
    }
  }

  if (comment)
    return (
      <div className="actions">
        <LikeButton
          $blue={arrOfFavIds.includes(comment.id) ? 'true' : 'false'}
          onClick={() => {
            token
              ? handleLike()
              : needAuthMessage({
                  callback: () => {
                    openAuthModal();
                  },
                  action: t('articles.toLikeComments')
                });
          }}
        >
          <Like />
          {comment.rating > 0 && <span className="count">{comment.rating}</span>}
        </LikeButton>
        {token && (
          <button onClick={() => setReply(comment)} className="reply" data-testid="reply">
            {t('articles.reply')}
          </button>
        )}
      </div>
    );

  return <div />;
}

export default CommentActionButton;
