import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, Button, Avatar } from 'antd';
import Popular from '@src/components/articleFeed/popular';
import ArticleFeed from '@src/components/articleFeed';
import { CheckOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { AuthorHeader, Container } from './styles';
import type { TabsProps } from 'antd';
import Comments from './comments';
import { useCustomModals, useModal } from '@src/app/providers/modals';
import { useGetCommentsByUserIdQuery } from '@src/app/store/api/comments';
import { useCreateSubsMutation, useDeleteSubsMutation, useGetUserInfoByIdQuery } from '@src/app/store/api/authors';
import { ISubscription } from '@src/shared/types';
import { useGetUserPostsLengthQuery } from '@src/app/store/api/articles';
import moment from 'moment';
import { useGetMeQuery } from '@src/app/store/api/APIbase';
import AuthorProfile from './authorProfile';
import Subscribers from './subscribers';

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

  const author = useGetUserInfoByIdQuery(id || '').data;
  const { data: me } = useGetMeQuery(undefined, { skip: !token });
  const { data } = useGetCommentsByUserIdQuery(id);

  const { needAuthMessage } = useCustomModals();
  const { openAuthModal } = useModal();

  console.log(author);
  const arrOfSunscriptions = me && me.subscriptions ? me.subscriptions : [];

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('Authors.profile'),
      children: <AuthorProfile id={id || ''} />
    },
    {
      key: '2',
      label: `${t('authors.all')}${length ? ` (${length})` : ''}`,
      children: <ArticleFeed simple uid={`${id}` || ''} />
    },
    {
      key: '3',
      label: `${t('authors.comments')}${data ? ` (${data.length})` : ''}`,
      children: <Comments data={data || []} />
    },
    {
      key: '4',
      label: `${t('Authors.subscribers')}${author ? ` (${author.subscribers.length})` : ''}`,
      children: <Subscribers users={author && author.subscribers ? author.subscribers.map((item: ISubscription) => item.subscriber).filter(Boolean) : []} />
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
              <Avatar style={{ backgroundColor: '#553c70' }} className="ava">
                {author?.firstname?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            </div>
            <div>
              <h3>{author ? author.firstname : 'Loading..'}</h3>
              <span className="position">registered {moment(author?.registered).format('D MMMM YYYY')}</span>
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
        <Tabs className="tabs" items={items} />
      </div>

      <div className="right-column">
        <Popular />
      </div>
    </Container>
  );
}

export default Authors;
