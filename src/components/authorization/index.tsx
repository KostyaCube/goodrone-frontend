import { JSX, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tabs, Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import logo from '@src/assets/goodrone-logo.png';
import { InnerContainer, OuterContainer } from './styles';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '@src/app/store/api/API';
import { setToken, setUser } from '@src/app/store/reducers/user';
import { Flex } from '@src/shared/ui';

type ISignin = {
  email: string;
  password: string;
  remember: boolean;
};

function Authorization( ): JSX.Element {
  const { t } = useTranslation();
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const onFinish = async ({ email, password, remember }: ISignin) => {
    try {
      const res = await login({ email: email.trim(), password }).unwrap();
      dispatch(setToken(res.token));
      dispatch(setUser(res.user));
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(res.user));
      storage.setItem('token', res.token);
    } catch (err) {
      console.error('Login error', err);
    }
  };

  function SignInForm() {
    return (
      <>
        <Form name="normal_login" initialValues={{ remember: true }} size="large" onFinish={onFinish}>
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-mail" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              autoComplete="password"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t('auth.remember')}</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
              {t('auth.login')}
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }

  return (
    <OuterContainer>
      <InnerContainer>
        <Flex center="true">
          <img className="logo" src={logo} alt="logo"></img>
          <h2>Goodrone</h2>
        </Flex>
        <p>The platform for heavy music lovers</p>
        <div style={{ borderTop: 1, marginTop: '7px', paddingTop: '24px' }}>
          <Tabs
            defaultActiveKey="1"
            centered
            items={[
              {
                key: 'login',
                label: t('auth.login'),
                children: <SignInForm />
              },
              {
                key: 'signup',
                label: t('auth.register'),
                children: <div style={{ minHeight: '256px' }} />
              }
            ]}
          />
        </div>
      </InnerContainer>
    </OuterContainer>
  );
}

export default Authorization;
