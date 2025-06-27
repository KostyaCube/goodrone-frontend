import { JSX, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '@src/app/store/reducers/user';
import { useLoginMutation, useRegisterMutation } from '@src/app/store/api/auth';
import { useTranslation } from 'react-i18next';

import { Tabs, Button, Checkbox, Form, Input } from 'antd';
import { Flex } from '@src/shared/ui/styled components';
import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeOutlined, FormOutlined } from '@ant-design/icons';
import { InnerContainer, OuterContainer, TabsWrapper } from './styles';
import logo from '@src/assets/goodrone-logo.png';
import { AuthResponse, ISignin, ISignup } from '@src/shared/types';
import { useNotification } from '@src/app/providers/notifications';

function Authorization({ close }: { close: () => void }): JSX.Element {
  const [loginUser, { isLoading: loadingLogin, isSuccess: successLogin }] = useLoginMutation();
  const [registerUser, { isLoading: loadingRegister, isSuccess: successRegister }] = useRegisterMutation();

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const notify = useNotification();

  const processResponse = (res: AuthResponse, remember: boolean) => {
    dispatch(setToken(res.token));
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('token', res.token);
  };

  const logIn = async ({ email, password, remember }: ISignin) => {
    try {
      const res = await loginUser({ email: email.trim(), password }).unwrap();
      processResponse(res, !!remember);
    } catch (err: any) {
      notify('error', err?.data?.message || err?.data?.error || t('auth.error'));
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
    } catch (err: any) {
      notify('error', err?.data?.message || err?.data?.error || t('auth.error'));
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
          <Form.Item
            validateTrigger={[]}
            name="email"
            rules={[
              { required: true, message: t('auth.emailMessage') },
              {
                type: 'email',
                message: t('auth.emailValid')
              }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder={t('auth.email')} />
          </Form.Item>

          <Form.Item
            validateTrigger={[]}
            name="password"
            rules={[
              { required: true, message: t('auth.passwordMessage') },
              { min: 6, message: t('auth.passwordValid') }
            ]}
          >
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
          <Form.Item
            validateTrigger={[]}
            name="email"
            rules={[
              { required: true, message: t('auth.emailMessage') },
              {
                type: 'email',
                message: t('auth.emailValid')
              }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder={t('auth.email')} />
          </Form.Item>

          <Form.Item
            name="firstname"
            validateTrigger={[]}
            rules={[
              { required: true, message: t('auth.firstMessage') },
              { pattern: /^[A-Za-z\u0400-\u04FF]+$/, message: t('auth.firstnameValid') }
            ]}
          >
            <Input prefix={<FormOutlined />} placeholder={t('auth.firstname')} />
          </Form.Item>

          <Form.Item
            name="lastname"
            rules={[
              { required: true, message: t('auth.lastMessage') },
              { pattern: /^[A-Za-z\u0400-\u04FF]+$/, message: t('auth.lastnameValid') }
            ]}
            validateTrigger={[]}
          >
            <Input prefix={<FormOutlined />} placeholder={t('auth.lastname')} />
          </Form.Item>

          <Form.Item
            validateTrigger={[]}
            name="password"
            rules={[
              { required: true, message: t('auth.passwordMessage') },
              { min: 6, message: t('auth.passwordValid') }
            ]}
          >
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
        <Flex $center="true">
          <img className="logo" src={logo} alt="logo"></img>
          <h2>Goodrone</h2>
        </Flex>
        <p>The platform for heavy music lovers</p>
        <TabsWrapper>
          <Tabs
            defaultActiveKey="signin"
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
