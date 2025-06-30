import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Avatar, Input, Form, Collapse, DatePicker, Upload, UploadProps, Select } from 'antd';
import { Container, Header, ContentWrapper, Sidebar, Content, FlexCentered } from './styles';
import type { CollapseProps, DatePickerProps } from 'antd';
import { EnvironmentOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

function Profile({ token }: { token: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [username, setusername] = useState<string>('');
  const [location, setlocation] = useState<string>('');
  const [birthDate, setbirthDate] = useState<string>('');
  const [bio, setbio] = useState<string>('');
  const [phone, setphone] = useState<string>('');

  async function getProfile() {}

  async function updateProfile() {}

  async function updatePhoto() {}

  async function deletePhoto() {}

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    // setbirthDate(dateString);
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

  if (!token) return <Navigate to="/main" />;

  return (
    <Container>
      <Header>
        {/* <Avatar src={avatar} className="avatar">
          {name.charAt(0).toUpperCase()}
        </Avatar> */}
        <div className="name-wrapper">
          {/* <h4>{name}</h4> */}
          <span>{t('profile.manage')}</span>
        </div>
      </Header>

      <Select
        size="large"
        options={[
          {
            label: (
              <div
                className="select-link"
                onClick={() => {
                  navigate('/profile/data');
                }}
              >
                {t('profile.personal')}
              </div>
            ),
            value: 1
          },
          {
            label: (
              <div
                className="select-link"
                onClick={() => {
                  navigate('/profile/experience');
                }}
              >
                {t('profile.exp')}
              </div>
            ),
            value: 2
          }
        ]}
        className="pages-select"
        defaultValue={1}
      ></Select>

      <ContentWrapper>
        <Sidebar>
          {/* <Link style={{ marginBottom: '16px', borderBottom: `1px solid ${adds.pathname.includes('data') ? 'black' : 'white'}` }} to={'/profile/data'}>
            {t('profile.personal')}
          </Link>
          <Link style={{ borderBottom: `1px solid ${adds.pathname.includes('experience') ? 'black' : 'white'}` }} to={'/profile/experience'}>
            {t('profile.exp')}
          </Link> */}
        </Sidebar>

        <Content>
          <Routes>
            <Route
              path="/data"
              element={
                <>
                  <FlexCentered>
                    {/* <Avatar src={avatar} className="avatar">
                      {name.charAt(0).toUpperCase()}
                    </Avatar> */}
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
                    <Form.Item label={t('profile.name')}>
                      <Input value={username} onChange={(e) => setusername(e.target.value)} placeholder={t('profile.namePlaceholder')} size="large" />
                    </Form.Item>

                    <Form.Item label={t('profile.whatsApp')}>
                      {/* <PhoneInput
                        country={'kg'}
                        value={phone}
                        onChange={(phone) => setphone(phone)}
                        inputStyle={{ width: '100%', height: '40px', borderRadius: '8px' }}
                        dropdownStyle={{ borderRadius: '8px' }}
                        buttonStyle={{ borderRadius: '8px 0 0 8px' }}
                      /> */}
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
                    <Form.Item label={t('profile.birthdate')}>
                      {<DatePicker allowClear={false} value={birthDate ? dayjs(birthDate) : dayjs('01-01-2000')} size="large" onChange={onChangeDate} />}
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
                </>
              }
            />
          </Routes>
        </Content>
      </ContentWrapper>
    </Container>
  );
}

export default Profile;
