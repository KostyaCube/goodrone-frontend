import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { ProfileInfo } from './styles';
import { useAppSelector } from '@src/app/store';

type IProps = {
  user: User | undefined;
  setauthAvatar: Dispatch<SetStateAction<string | null>>;
  id: string;
};

function AuthorProfile({ user, id }: IProps) {
  const { t } = useTranslation();
  const token = useAppSelector((state) => state.login.token);

  const [profile, setauthorProfile] = useState<any>(null);

  async function getProfile() {}



  useEffect(() => {
    getProfile();
  }, [user]);

  return (
    <ProfileInfo>
      <div className="info-item">
        <span className="field">{t('profile.currentPlace')}:</span>
        <span className="value">{profile && profile.organization ? profile.organization : '-'}</span>
      </div>
      <div className="info-item">
        <span className="field">{t('profile.position')}:</span>
        <span className="value">{(user && user.position) || (profile && profile.position) || '-'}</span>
      </div>
      <div className="info-item">
        <span className="field">{t('profile.location')}:</span>
        <span className="value">{profile && profile.location ? profile.location : '-'}</span>
      </div>
      <div className="info-item">
        <span className="field">{t('profile.birthdate')}:</span>
        <span className="value">{profile && profile.birthDate ? moment(profile.birthDate).format('DD.MM.YYYY') : '-'}</span>
      </div>
      <div className="info-item">
        <span className="field">{t('profile.registered')}:</span>
        <span className="value">{profile && profile.registered ? moment(profile.registered).format('DD.MM.YYYY') : '-'}</span>
      </div>
      <div className="info-item">
        <span className="field">{t('profile.bio')}:</span>
        <span className="value">{profile && profile.bio ? profile.bio : '-'}</span>
      </div>
    </ProfileInfo>
  );
}

export default AuthorProfile;
