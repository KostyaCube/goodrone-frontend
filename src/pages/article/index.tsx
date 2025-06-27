import { Avatar, Button, Result, Spin, UploadFile } from 'antd';
import { useTranslation } from 'react-i18next';

import { LeftBlock, Article } from '@src/components/articleFeed/styles';

import { ArticleWrapper, CommentWrapper, MainContainer, InputContainer, BackButton } from './styles';
import moment from 'moment';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Edit, Remove } from '@src/assets/icons/icon-components';
import { LeftOutlined } from '@ant-design/icons';
import Popular from '@src/components/articleFeed/popular';
import { useDeletePostMutation, useGetOnePostQuery, usePostViewMutation } from '@src/app/store/api/articles';
import { IComment, IKeyword } from '@src/shared/types';
import { useAppSelector } from '@src/app/store';
import { useCustomModals, useModal } from '@src/app/providers/modals';
import { Flex, SpinnerWrapper } from '@src/shared/ui/styled components';
import ActionButtons from '@src/components/articleFeed/actions/articleButtons';
import UserComment from '@src/components/articleFeed/comment/comment';
import { ReachEditor } from '@src/components/reachEditor';
import { useAddCommentMutation, useEditCommentMutation } from '@src/app/store/api/comments';
import { Registered } from '../questions/questionPage/styles';
import { useGetMeQuery } from '@src/app/store/api/APIbase';

function ArticlePage() {
  let { id } = useParams();
  const { t } = useTranslation();
  const { data, isLoading } = useGetOnePostQuery(id);

  const token = useAppSelector((state) => state.login.token);
  const { data: me } = useGetMeQuery(undefined, { skip: !token });

  const navigate = useNavigate();
  const location = useLocation();
  const { showDeletingConfirm } = useCustomModals();
  const commentsBlock = useRef<HTMLDivElement | null>(null);

  const [commentBody, setCommentBody] = useState<string>('');
  const [commentFileList, setCommentFileList] = useState<UploadFile[]>([]);
  const [replyingComment, setreplyingComment] = useState<IComment | null>(null);
  const [edited, setEdited] = useState<IComment | null>(null);

  const [makeViewed] = usePostViewMutation();
  const [delPost] = useDeletePostMutation();
  const [sendComment] = useAddCommentMutation();
  const [editComment] = useEditCommentMutation();

  const { openAuthModal } = useModal();

  function deletePost(id: string) {
    delPost(id).then(() => navigate('/main?articles'));
    // .catch(() => error());
  }

  function commentSending() {
    try {
      if (edited) {
        editComment({ id: `${edited.id}`, commentBody });
      } else {
        if (id && me) {
          replyingComment ? sendComment({ body: commentBody, postId: +id, replyOn: replyingComment.id }) : sendComment({ body: commentBody, postId: +id });
        }
      }
      setCommentBody('');
      setreplyingComment(null);
      setEdited(null);
    } catch (err) {
      console.error(err);
    }
  }

  function executeScroll() {
    if (commentsBlock.current) {
      const container = commentsBlock.current;
      container.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const reply = (comment: IComment) => {
    setreplyingComment(comment);
    if (replyingComment === comment) setreplyingComment(null);
  };

  useEffect(() => {
    const element = document.querySelector('.content');
    if (element && data) {
      element.innerHTML = data.body;
    }
  }, [data]);

  useEffect(() => {
    if (id) makeViewed(id);
  }, [id]);

  useEffect(() => {
    setreplyingComment(null);
  }, [id]);

  useEffect(() => {
    if (location.search.includes('comments')) {
      executeScroll();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, commentsBlock.current]);

  useEffect(() => {
    if (edited) setCommentBody(edited.body);
  }, [edited]);

  useEffect(() => {
    const handlePopState = () => {
      navigate('/main?articles');
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (!data && !isLoading)
    return (
      <Result
        style={{ paddingTop: '180px' }}
        status="404"
        title="404"
        subTitle={t('mainPage.notExist')}
        extra={
          <Button onClick={() => navigate('/main?articles')} type="primary">
            {t('mainPage.backHome')}
          </Button>
        }
      />
    );

  return (
    <MainContainer>
      <LeftBlock>
        <BackButton onClick={() => navigate(-1)}>
          <LeftOutlined />
        </BackButton>
      </LeftBlock>

      {isLoading ? (
        <Article style={{ height: '200px' }}>
          <SpinnerWrapper>
            <Spin size="large" />
          </SpinnerWrapper>
        </Article>
      ) : (
        <div>
          <ArticleWrapper>
            <Flex $justify="between">
              <div
                className="author"
                style={{ marginBottom: 0 }}
                onClick={() => {
                  data && navigate(`/authors/${data.authorId}`, { state: { id: data.author.id } });
                }}
              >
                <Avatar className="ava" style={{ backgroundColor: '#44958f', margin: 0 }} size="large">
                  {`${data?.author.lastname?.charAt(0)}${data?.author.firstname?.charAt(0)}` || 'U'}
                </Avatar>
                <Flex style={{ flexDirection: 'column', alignItems: 'flex-start', marginLeft: '1rem' }}>
                  <span className="name">
                    {data?.author.firstname} {data?.author.lastname}
                  </span>
                  <Registered>registered {moment(data?.author?.registered).format('D MMMM YYYY')}</Registered>
                </Flex>
              </div>
              {token && me && me.id === data?.authorId && (
                <Flex className="actions-buttons">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      showDeletingConfirm({ callback: deletePost, id: `${data?.id}`, text: `${t('articles.deleteConfirmPost')}` });
                    }}
                  >
                    <Remove />
                    <span>{t('articles.delete')}</span>
                  </button>
                  <button
                    style={{ marginRight: 0 }}
                    onClick={() => {
                      navigate('/articles/create', { state: { article: data } });
                    }}
                    className="blue"
                  >
                    <Edit />
                    <span>{t('articles.edit')}</span>
                  </button>
                </Flex>
              )}
            </Flex>
            <span className="date">{moment(data?.created_at).format('DD.MM.YYYY')}</span>
            <h1>{data?.title}</h1>

            {!!data?.keywords.length && (
              <Flex style={{ justifyContent: 'left', flexWrap: 'wrap', margin: '16px 0' }}>
                {data?.keywords.map((keyword: IKeyword) => (
                  <div key={keyword.id} className="keystyled">
                    {keyword.body}
                  </div>
                ))}
              </Flex>
            )}

            {!!data?.files.length && <img className="cover" src={`${data.files[0].link}`} />}

            <div className="content" style={{ marginBottom: '1.5rem' }} />

            <ActionButtons article={data} />
          </ArticleWrapper>

          <div ref={commentsBlock}>
            {data && data.comments.length > 0 && (
              <CommentWrapper>
                <h4 className="heading">
                  {t('articles.comments')} <span>{data.comments.length}</span>
                </h4>
                {data.comments.map((item: IComment) => (
                  <UserComment key={item.id} comment={item} setReply={reply} setEdited={setEdited} />
                ))}
              </CommentWrapper>
            )}
          </div>

          {me && token ? (
            <InputContainer style={{ borderRadius: `${data?.comments.length === 0 && '8px'}` }}>
              <ReachEditor
                simple
                placeholder={t('articles.writeC')}
                fileList={commentFileList}
                setFileList={setCommentFileList}
                body={commentBody}
                setBody={setCommentBody}
              />
              {replyingComment && (
                <p className="replyFor">
                  {t('articles.replyFor')}{' '}
                  <span>
                    {replyingComment.author.firstname} {replyingComment.author.lastname}
                  </span>
                  <button onClick={() => setreplyingComment(null)} className="reply-cancel">
                    x
                  </button>
                </p>
              )}
              {edited && (
                <Button
                  style={{ marginRight: '8px' }}
                  onClick={() => {
                    setCommentBody('');
                    setEdited(null);
                  }}
                  key="cancel"
                >
                  {t('articles.cancel')}
                </Button>
              )}
              <Button type="primary" onClick={me && token ? commentSending : undefined} disabled={commentBody.trim().length < 15} style={{ marginTop: '1rem' }}>
                {edited ? t('articles.save') : t('articles.sendComment')}
              </Button>
            </InputContainer>
          ) : (
            <InputContainer style={{ borderRadius: `${data?.comments.length === 0 && '8px'}` }}>
              <p style={{ paddingTop: '16px' }}>
                <Link onClick={openAuthModal} to={''}>
                  {t('articles.auth')}
                </Link>
                {t('articles.toWrite')}
              </p>
            </InputContainer>
          )}
        </div>
      )}
      <Popular />
    </MainContainer>
  );
}

export default ArticlePage;
