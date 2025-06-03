import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, Button, Avatar } from 'antd';
import Discussed from '@src/components/articleFeed/discussed';
import ArticleFeed from '@src/components/articleFeed';
import { CheckOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { AuthorHeader, Container } from './styles';
import type { TabsProps } from 'antd';
import Comments from './comments';
import { useAppSelector } from '@src/app/store';
import { useCustomModals, useModal } from '@src/app/providers/modals';
import { useGetCommentsByUserIdQuery } from '@src/app/store/api/comments';
import { useCreateSubsMutation, useDeleteSubsMutation, useGetUserInfoByIdQuery } from '@src/app/store/api/authors';
import { ISubscription } from '@src/shared/types';
import { useGetUserPostsLengthQuery } from '@src/app/store/api/articles';

type IProps = {
  token: string | null | undefined;
};

function Authors({ token }: IProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  let { id } = useParams();

  const [createSubs] = useCreateSubsMutation();
  const [deleteSubs] = useDeleteSubsMutation();

  const length = useGetUserPostsLengthQuery(id || '').data;
  const me = useAppSelector((state) => state.login.user);

  const author = useGetUserInfoByIdQuery(id || '').data;
  const { data } = useGetCommentsByUserIdQuery(id);

  const { needAuthMessage } = useCustomModals();
  const { openAuthModal } = useModal();

  const arrOfSunscriptions = me ? me.subscriptions : [];

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `${t('authors.all')}${length ? ` (${length})` : ''}`,
      children: <ArticleFeed simple uid={`${id}` || ''} />
    },
    {
      key: '2',
      label: `${t('authors.comments')}${data ? ` (${data.length})` : ''}`,
      children: <Comments data={data || []} />
    }
  ];

  function createSubscription() {
    if (me && me.id && id) {
      createSubs({ subscriberId: me.id, subscribedToId: Number(id) });
    }
  }

  function deleteSubscription() {
    const el = arrOfSunscriptions.find((item: ISubscription) => item.subscribedToId === Number(id))?.id;
    if (me && id && el) {
      deleteSubs(el);
    }
  }

  return (
    <Container>
      <div className="left-column">
        <AuthorHeader>
          <div className="author-data">
            <div className="img-container">
              <Avatar className="ava">{author?.firstname?.charAt(0).toUpperCase() || 'U'}</Avatar>
            </div>
            <div>
              <h3>{author ? author.firstname : 'Loading..'}</h3>
              <span className="position">{author && author.activity ? author.activity : 'Activity not provided'}</span>
            </div>
          </div>

          <div className="buttons">
            {token && me && me.id == Number(id) ? (
              <Button onClick={() => navigate('/profile/data')}>
                <EditOutlined />
                {t('authors.editProfile')}
              </Button>
            ) : (
              <>
                {/*    <Button
                  onClick={() => {
                    token
                      ? alert('Перенаправление на мессенджер')
                      : needAuthMessage({
                          callback: () => {
                            navigate('/');
                          },
                          action: t('authors.toLike')
                        });
                  }}
                >
                  <MailOutlined />
                  {t('authors.sendMess')}
                </Button> */}

                {arrOfSunscriptions.findIndex((item: ISubscription) => item.subscribedToId === Number(id)) < 0 ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      token
                        ? createSubscription()
                        : needAuthMessage({
                            callback: () => {
                              openAuthModal();
                            },
                            action: t('authors.toFollow')
                          });
                    }}
                  >
                    <PlusOutlined />
                    {t('authors.follow')}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      token
                        ? deleteSubscription()
                        : needAuthMessage({
                            callback: () => {
                              openAuthModal();
                            },
                            action: t('authors.toLike')
                          });
                    }}
                  >
                    <CheckOutlined />
                    {t('authors.following')}
                  </Button>
                )}
              </>
            )}
          </div>
        </AuthorHeader>
        <Tabs className="tabs" items={token ? items : items.slice(1)} />
      </div>

      <div className="right-column">
        <Discussed />
      </div>
    </Container>
  );
}

export default Authors;
