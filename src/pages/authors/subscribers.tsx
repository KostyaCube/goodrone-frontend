import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Empty } from 'antd';
import { AuthorHeader, Wrapper } from './styles';
import { useAppSelector } from '@src/app/store';
import { User } from '@src/shared/types';

function UserCard({ user }: { user: any }) {
  const token = useAppSelector((state) => state.login.token);
  const [authAvatar, setauthAvatar] = useState<string | null>('');
  const navigate = useNavigate();

  async function getProfile() {}

  useEffect(() => {
    getProfile();
  }, [user]);

  return (
    <AuthorHeader $hover="true" style={{ padding: '16px', marginBottom: '8px' }} onClick={() => navigate(`/authors/${user.id}`)}>
      <div className="author-data">
        <div className="img-container" style={{ width: '48px', height: '48px' }}>
          {authAvatar ? (
            <img src={authAvatar} />
          ) : (
            <Avatar style={{ width: '48px', height: '48px', fontSize: '24px', backgroundColor: '#553c70' }} className="ava">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
          )}
        </div>
        <div>
          <h3>{user ? user.name : 'Loading..'}</h3>
          <span className="position">{user && user.position ? user.position : 'Position not provided'}</span>
        </div>
      </div>
    </AuthorHeader>
  );
}

function Subscribers({ users }: { users: User[] }) {
  return (
    <div>
      {users.length ? (
        users.map((user: User) => <UserCard key={user.id} user={user} />)
      ) : (
        <Wrapper style={{ padding: '2rem' }}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Wrapper>
      )}
    </div>
  );
}

export default Subscribers;
