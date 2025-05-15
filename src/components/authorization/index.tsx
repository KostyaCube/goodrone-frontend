import { JSX, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '@src/app/store/reducers/user';
import { useLoginMutation, useRegisterMutation } from '@src/app/store/api/API';
import { useTranslation } from 'react-i18next';

import { Tabs, Button, Checkbox, Form, Input } from 'antd';
import { Flex } from '@src/shared/ui';
import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeOutlined, FormOutlined } from '@ant-design/icons';
import { InnerContainer, OuterContainer, TabsWrapper } from './styles';
import logo from '@src/assets/goodrone-logo.png';
import { AuthResponse, ISignin, ISignup } from '@src/shared/types';

function Authorization({ close }: { close: () => void }): JSX.Element {
  const [loginUser, { isLoading: loadingLogin, isSuccess: successLogin, isError: errorLogin }] = useLoginMutation();
  const [registerUser, { isLoading: loadingRegister, isSuccess: successRegister, isError: errorRegister }] = useRegisterMutation();

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const processResponse = (res: AuthResponse, remember: boolean) => {
    dispatch(setToken(res.token));
    dispatch(setUser(res.user));
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('user', JSON.stringify(res.user));
    storage.setItem('token', res.token);
  };

  const logIn = async ({ email, password, remember }: ISignin) => {
    try {
      const res = await loginUser({ email: email.trim(), password }).unwrap();
      processResponse(res, !!remember);
    } catch (err) {
      console.error('Login error', err);
    }
  };

  const register = async ({ email, password, firstname, lastname }: ISignup) => {
    try {
      const res = await registerUser({
        email: email.trim(),
        password,
        firstname,
        lastname
      }).unwrap();

      processResponse(res, false);
    } catch (err) {
      console.error('Login error', err);
    }
  };

  useEffect(() => {
    if (successLogin || successRegister) {
      close();
    }
  }, [successLogin, successRegister]);

  function SignInForm() {
    return (
      <>
        <Form name="login" initialValues={{ remember: true }} size="large" onFinish={logIn}>
          <Form.Item name="email" rules={[{ required: true, message: t('auth.emailMessage') }]}>
            <Input prefix={<MailOutlined />} placeholder={t('auth.email')} />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: t('auth.passwordMessage') }]}>
            <Input.Password
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              prefix={<LockOutlined />}
              type="password"
              placeholder={t('auth.password')}
              autoComplete="password"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t('auth.remember')}</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button loading={loadingLogin} type="primary" htmlType="submit" className="form-button">
              {t('auth.login')}
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }

  function SignUpForm() {
    return (
      <>
        <Form name="registration" size="large" onFinish={register}>
          <Form.Item name="email" rules={[{ required: true, message: t('auth.emailMessage') }]}>
            <Input prefix={<MailOutlined />} placeholder={t('auth.email')} />
          </Form.Item>

          <Form.Item name="firstname" rules={[{ required: true, message: t('auth.firstMessage') }]}>
            <Input prefix={<FormOutlined />} placeholder={t('auth.firstname')} />
          </Form.Item>

          <Form.Item name="lastname" rules={[{ required: true, message: t('auth.lastMessage') }]}>
            <Input prefix={<FormOutlined />} placeholder={t('auth.lastname')} />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: t('auth.passwordMessage') }]}>
            <Input.Password
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              prefix={<LockOutlined />}
              type="password"
              placeholder={t('auth.password')}
              autoComplete="password"
            />
          </Form.Item>

          <Form.Item>
            <Button loading={loadingRegister} type="primary" htmlType="submit" className="form-button">
              {t('auth.register')}
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
        <TabsWrapper>
          <Tabs
            defaultActiveKey="1"
            centered
            items={[
              {
                key: 'signin',
                label: t('auth.login'),
                children: <SignInForm />
              },
              {
                key: 'signup',
                label: t('auth.register'),
                children: <SignUpForm />
              }
            ]}
          />
        </TabsWrapper>
      </InnerContainer>
    </OuterContainer>
  );
}

export default Authorization;
