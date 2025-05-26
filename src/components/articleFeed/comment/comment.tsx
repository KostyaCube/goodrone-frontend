import { Dispatch, SetStateAction } from 'react';
import { Avatar, MenuProps, Dropdown } from 'antd';
import { ActionButton, MoreButton, Position } from './styles';
import { MoreOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Edit, Remove } from '@src/assets/icons/icon-components';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { IComment } from '@src/shared/types';
import { useAppSelector } from '@src/app/store';
import { extractTextFromHTML } from '@src/shared/utils';
import { Flex } from '@src/shared/ui/styled components';
import { useDeleteCommentMutation } from '@src/app/store/api/comments';
import CommentActionButton from '../actions/commentButtons';

export type CommentProps = {
  comment: IComment;
  setReply: (arg0: IComment) => void;
  simple?: boolean;
};

function UserComment({ comment, setReply, setEdited, simple }: CommentProps & { setEdited: Dispatch<SetStateAction<IComment | null>> }) {
  const token = useAppSelector((state) => state.login.token);
  const me = useAppSelector((state) => state.login.user);

  const navigate = useNavigate();

  const { t } = useTranslation();
  const [deleteComment] = useDeleteCommentMutation();

  const dropDownMenus: MenuProps['items'] = comment
    ? [
        {
          label: (
            <ActionButton
              onClick={() => {
                //  showDeletingConfirm({ callback: deleteComment, id: `${comment.id}`, text: `${t('Articles.deleteConfirmComment')}` });
              }}
            >
              <Remove />
              <span>{t('stackOver.delete')}</span>
            </ActionButton>
          ),
          key: '0'
        },
        {
          label: (
            <ActionButton
              onClick={(e) => {
                e.preventDefault();
                setEdited(comment);
              }}
              className="blue"
            >
              <Edit />
              <span>{t('stackOver.edit')}</span>
            </ActionButton>
          ),
          key: '1'
        }
      ]
    : [];

  return (
    <div className="container">
      <Flex $justify="between">
        <Flex>
          <Avatar style={{ verticalAlign: 'middle', backgroundColor: '#51a18bac', gap: 4, marginRight: '8px' }} size="default">
            {`${comment?.author.lastname?.charAt(0)}${comment?.author.firstname?.charAt(0)}` || 'U'}
          </Avatar>
          <div>
            <h4>
              {comment.author.lastname.charAt(0).toUpperCase() + comment.author.lastname.slice(1)}{' '}
              {comment.author.firstname.charAt(0).toUpperCase() + comment.author.firstname.slice(1)}
            </h4>
            {!simple && <Position>{comment.author.activity || `${t('stackOver.position')}`}</Position>}
          </div>
          {simple && (
            <div className="date-wrapper">
              <span className="comment-date">{moment(comment.created_at).format('DD.MM hh:mm')}</span>
            </div>
          )}
        </Flex>
        {!simple && token && me && me.id === comment.authorId && (
          <Dropdown trigger={['click']} menu={{ items: dropDownMenus }} placement="left">
            <MoreButton data-testid="edit">
              <MoreOutlined />
            </MoreButton>
          </Dropdown>
        )}
      </Flex>
      <p className="content">
        {comment.replyOn && (
          <span style={{ color: '#4096ff' }}>
            @{comment.replyOn.author.firstname} {comment.replyOn.author.lastname}
            {', '}
          </span>
        )}
        {extractTextFromHTML(comment.body)}
      </p>
      {simple ? (
        <div className="look">
          <button onClick={() => navigate(`/articles/${comment.postId}?comments`)} className="reply" data-testid="look">
            {t('Authors.look')}
          </button>
        </div>
      ) : (
        <CommentActionButton comment={comment} setReply={setReply} />
      )}
    </div>
  );
}

export default UserComment;
