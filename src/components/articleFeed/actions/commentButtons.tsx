import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@src/app/store';
import { useLikeCommentMutation } from '@src/app/store/api/comments';
import { CommentProps } from '../comment/comment';
import { useCustomModals, useModal } from '@src/app/providers/modals';
import { useGetMeQuery } from '@src/app/store/api/APIbase';
import { Button } from './styles';
import { LikeOutlined } from '@ant-design/icons';

function CommentActionButton({ comment, setReply }: CommentProps) {
  const token = useAppSelector((state) => state.login.token);
  const { data: me } = useGetMeQuery(undefined, { skip: !token });

  const arrOfFavIds: number[] = me && me.likedComments ? me.likedComments : [];
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
        <Button
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
          <LikeOutlined />
          {comment.rating > 0 && <span className="count">{comment.rating}</span>}
        </Button>
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
