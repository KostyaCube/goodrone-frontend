import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { ProfileInfo } from './styles';
import { useAppSelector } from '@src/app/store';
import { useGetAuthorProfileQuery } from '@src/app/store/api/authors';
import { useEffect } from 'react';

function AuthorProfile({ id }: { id: string }) {
  const { t } = useTranslation();
  const token = useAppSelector((state) => state.login.token);

  const profile = useGetAuthorProfileQuery(id, { skip: !token }).data;

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    <ProfileInfo>
      <div className="info-item">
        <span className="field">{t('profile.location')}:</span>
        <span className="value">{profile?.location || '-'}</span>
      </div>
      <div className="info-item">
        <span className="field">{t('profile.birthdate')}:</span>
        <span className="value">{profile?.birthdate ? moment(profile.birthdate).format('DD.MM.YYYY') : '-'}</span>
      </div>
      <div className="info-item">
        <span className="field">{t('profile.registered')}:</span>
        <span className="value">{profile?.createdAt ? moment(profile.createdAt).format('DD.MM.YYYY') : '-'}</span>
      </div>
      <div className="info-item">
        <span className="field">{t('profile.bio')}:</span>
        <span className="value">{profile?.bio || '-'}</span>
      </div>
      <div className="info-item">
        <span className="field">{t('profile.website')}:</span>
        <span className="value">{profile?.website || '-'}</span>
      </div>
      <div className="info-item">
        <span className="field">{t('profile.gender')}:</span>
        <span className="value">{profile?.gender || '-'}</span>
      </div>
      <div className="info-item">
        <span className="field">{t('profile.phone')}:</span>
        <span className="value">{profile?.phone || '-'}</span>
      </div>
    </ProfileInfo>
  );
}

export default AuthorProfile;
