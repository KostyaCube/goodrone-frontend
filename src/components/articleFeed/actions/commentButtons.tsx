import { Like } from '@src/assets/icons/icon-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@src/app/store';
import { LikeButton } from '../styles';
import { useLikeCommentMutation } from '@src/app/store/api/comments';
import { CommentProps } from '../comment/comment';
import { useAuthModal } from '@src/app/providers/authModal';
import { needAuthMessage } from '@src/shared/ui/moldals';

function CommentActionButton({ comment, setReply }: CommentProps) {
  const token = useAppSelector((state) => state.login.token);
  const me = useAppSelector((state) => state.login.user);

  const arrOfFavIds: number[] = me ? me.likedComments : [];
  const { t } = useTranslation();

  const { openModal } = useAuthModal();
  const [likeRequest] = useLikeCommentMutation();

  function handleLike() {
    if (me && comment) {
      likeRequest({ userId: me.id, commentId: comment.id });
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
                    openModal();
                  },
                  action: t('Authors.toLike')
                });
          }}
        >
          <Like />
          {comment.rating > 0 && <span className="count">{comment.rating}</span>}
        </LikeButton>
        {token && (
          <button onClick={() => setReply(comment)} className="reply" data-testid="reply">
            {t('Articles.reply')}
          </button>
        )}
      </div>
    );

  return <div />;
}

export default CommentActionButton;
