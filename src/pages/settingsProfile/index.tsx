import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Avatar, Input, Form, DatePicker, Upload, UploadProps, Select } from 'antd';
import { Container, Header, ContentWrapper, Content, FlexCentered } from './styles';
import type { DatePickerProps } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useGetMeQuery } from '@src/app/store/api/APIbase';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useGetAuthorProfileQuery } from '@src/app/store/api/authors';

const { TextArea } = Input;

function SettingsProfile({ token }: { token: string }) {
  const { t } = useTranslation();
  const { data: me, isLoading } = useGetMeQuery(undefined, { skip: !token });
  const profile = me ? useGetAuthorProfileQuery(`${me.id}`, { skip: !me }).data : null;

  const [gender, setgender] = useState<string>(profile?.gender || '');
  const [birthDate, setbirthDate] = useState<string>(profile?.birthdate || '');
  const [location, setlocation] = useState<string>(profile?.location || '');
  const [phone, setphone] = useState<string>(profile?.phone || '');
  const [website, setwebsite] = useState<string>(profile?.website || '');
  const [bio, setbio] = useState<string>(profile?.bio || '');

  async function updateProfile() {}

  async function updatePhoto() {}

  async function deletePhoto() {}

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    if (Array.isArray(dateString)) {
      setbirthDate(dateString[0]);
    } else {
      setbirthDate(dateString);
    }
  };

  const uploadAvatar: UploadProps = {
    maxCount: 1,
    accept: '.png, .jpg, .jpeg'
    // beforeUpload(file) {
    //   return new Promise(() => {
    //     const reader = new FileReader();
    //     const imageId = uuidv4();
    //     reader.readAsDataURL(file);
    //     reader.onload = async () => {
    //       repo
    //         .saveBlob(imageId, null, (reader.result as string).split(',')[1])
    //         .then(() => updatePhoto(imageId))
    //         .then(() => getProfile())
    //         .catch(() => error());
    //     };
    //     return false;
    //   });
    // }
  };

  if (!isLoading && !me) return <Navigate to="/main" />;

  return (
    <Container>
      <Header>
        <Avatar /* src={avatar} */ className="avatar">{me?.firstname.charAt(0).toUpperCase() || 'U'}</Avatar>
        <div className="name-wrapper">
          <h4>
            {me?.firstname} {me?.lastname}
          </h4>
          <span>{t('profile.manage')}</span>
        </div>
      </Header>

      <ContentWrapper>
        <Content>
          <FlexCentered>
            <Avatar /* src={avatar} */ className="avatar">{me?.firstname.charAt(0).toUpperCase() || 'U'}</Avatar>
            <Upload {...uploadAvatar}>
              <Button style={{ borderRadius: '8px' }} type="primary">
                {t('profile.uploadPhoto')}
              </Button>
            </Upload>
            <Button
              style={{ borderRadius: '8px' }}
              // disabled={!avatar}
              onClick={() => {
                // showConfirm({
                //   callback: () => {
                //     deletePhoto(profileId);
                //   },
                //   text: t('profile.sureDelete')
                // });
              }}
            >
              {t('profile.deletePhoto')}
            </Button>
          </FlexCentered>

          <Form layout="vertical">
            <Form.Item label={t('profile.gender')}>
              <Select value={gender} onChange={(e) => setgender(e)} placeholder={t('profile.genderPlaceholder')} size="large">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label={t('profile.birthdate')}>
              <DatePicker allowClear={false} value={birthDate ? dayjs(birthDate) : dayjs('01-01-2000')} size="large" onChange={onChangeDate} />
            </Form.Item>

            <Form.Item label={t('profile.location')}>
              <Input
                value={location}
                onChange={(e) => setlocation(e.target.value)}
                placeholder={t('profile.city')}
                size="large"
                prefix={<EnvironmentOutlined />}
              />
            </Form.Item>

            <Form.Item label={t('profile.phone')}>
              <PhoneInput
                country={'kg'}
                value={phone}
                onChange={(phone) => setphone(phone)}
                inputStyle={{ width: '100%', height: '40px', borderRadius: '8px' }}
                dropdownStyle={{ borderRadius: '8px' }}
                buttonStyle={{ borderRadius: '8px 0 0 8px' }}
              />
            </Form.Item>

            <Form.Item label={t('profile.website')}>
              <Input value={website} onChange={(e) => setwebsite(e.target.value)} placeholder={t('profile.websitePlaceholder')} size="large" />
            </Form.Item>

            <Form.Item label={t('profile.bio')}>
              <TextArea
                size="large"
                value={bio}
                onChange={(e) => setbio(e.target.value)}
                placeholder={t('profile.bioPlaceholder')}
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
          </Form>

          <FlexCentered>
            <Button style={{ borderRadius: '8px', margin: 0 }} onClick={updateProfile} type="primary">
              {t('profile.save')}
            </Button>
          </FlexCentered>
        </Content>
      </ContentWrapper>
    </Container>
  );
}

export default SettingsProfile;
