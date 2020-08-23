import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import { State } from 'store/reducers';
import { login, clear } from 'store/auth/actions';

import { Flex, WhiteSpace, InputItem, Button, Modal } from 'antd-mobile';
import { UserOutlined, SafetyOutlined, InfoCircleOutlined } from '@ant-design/icons';

const _ = require('lodash');

export default function Login() {
  const dispatch = useDispatch();

  const loading = useSelector((state: State) => state.auth.loading);
  const message = useSelector((state: State) => state.auth.message);

  const isLoginFailed = useSelector((state: State) => state.auth.isLoginFailed);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  function handleEmailChange(value: string) {
    if (_.isEmpty(value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter email.');

      return;
    }

    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (expression.test(value)) {
      setEmailError(false);
      setEmailErrorMessage('');
    } else {
      setEmailError(true);
      setEmailErrorMessage('Please enter it in email format.');
    }
  }

  function handlePasswordChange(value: string) {
    if (_.isEmpty(value)) {
      setPasswordError(true);
      setPasswordErrorMessage('Please enter password.');

      return;
    }

    setPasswordError(false);
  }

  function handleSubmit() {
    /**
     * 빈 값 유효성 검사
     *
     * 접속 후 바로 로그인 버튼을 클릭한 경우 발생한다.
     * 해당 경우 외에는 함수 실행 전에 유효성 검사를 진행하기 때문에 처리하지 않는다.
     */
    if (_.isEmpty(email) && _.isEmpty(password)) {
      setEmailError(true);
      setPasswordError(true);
      setEmailErrorMessage('Please enter email.');
      setPasswordErrorMessage('Please enter password.');

      return;
    }

    dispatch(login(email, password));
  }

  return (
    <main data-view="auth">
      <div id="login">
        <Helmet title="LOGIN" />
        <div className="app-container">
          <Flex
            className="app-flexbox"
            direction="column"
            wrap="wrap"
            alignContent="center">
            <Flex.Item className="app-title">OPEN WEATHER</Flex.Item>
            <WhiteSpace size="lg" />
            <Flex.Item className="app-animation-frame">
              <img role="img" alt="sun" src="/assets/images/sun.png" />
              <img role="img" alt="cloud" src="/assets/images/cloud.png" />
              <img role="img" alt="rain" src="/assets/images/rain.png" />
            </Flex.Item>
            <WhiteSpace />
            <Flex.Item>
              <label className="app-label">
                Email {emailError && <small>{'(' + emailErrorMessage + ')'}</small>}
              </label>
              <InputItem
                type="text"
                className="app-input-item"
                onChange={value => setEmail(value)}
                onBlur={() => handleEmailChange(email)}
                onFocus={() => setEmailError(false)}
                onKeyPress={event => {
                  const key = event.keyCode || event.which;

                  switch (key) {
                    case 13:
                      handleSubmit();
                      break;
                  }
                }}
                onVirtualKeyboardConfirm={handleSubmit}
                error={emailError}>
                <UserOutlined className="app-icon" />
              </InputItem>
              <WhiteSpace size="lg" />
              <label className="app-label">
                Password {passwordError && <small>{'(' + passwordErrorMessage + ')'}</small>}
              </label>
              <InputItem
                type="password"
                className="app-input-item"
                onChange={value => setPassword(value)}
                onBlur={() => handlePasswordChange(password)}
                onFocus={() => setPasswordError(false)}
                onKeyPress={event => {
                  const key = event.keyCode || event.which;

                  switch (key) {
                    case 13:
                      handleSubmit();
                      break;
                  }
                }}
                onVirtualKeyboardConfirm={handleSubmit}
                error={passwordError}>
                <SafetyOutlined className="app-icon" />
              </InputItem>
              <WhiteSpace size="xl" />
              <Button
                className="app-button"
                activeClassName="app-button-active"
                loading={loading}
                disabled={emailError || passwordError}
                onClick={handleSubmit}>
                  LOGIN
              </Button>
            </Flex.Item>
            <WhiteSpace size="lg" />
            <Flex.Item>
              <div className="app-description">
                <InfoCircleOutlined className="app-description-icon" />
                <span>Please enter <strong>ANY</strong> information.</span>
              </div>
            </Flex.Item>
          </Flex>
        </div>
        <Modal
          visible={isLoginFailed}
          transparent
          title="알림"
          footer={[
            {
              text: '확인',
              onPress: () => {
                dispatch(clear());
              }
            }
          ]}>
          {message}
        </Modal>
      </div>
    </main>
  );
}
