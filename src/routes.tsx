import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { State } from 'store/reducers';
import { loginSuccess } from 'store/auth/actions';

import Login from 'views/auth/Login';
import Home from 'views/app/Home';

const _ = require('lodash');
const jwt = require('jsonwebtoken');

declare global {
  interface Window {
    MOBILE: boolean;
  }
}

function isAuthorizedToken(accessToken: string | null, refreshToken: string | null): boolean {
  try {
    /**
     * Payload Claim 확인
     *
     * Payload: 페이로드. 토큰에 담을 정보
     * Claim: 클레임. 정보의 한 조각
     *
     * sub: subject, 토큰 제목
     * aud: audience, 토큰 대상자
     * iat: issued at, 토큰 발급 시각
     * exp: expiraton, 토큰 만료 시각
     */
    const requiredKeys = ['sub', 'aud', 'iat', 'exp'];

    if (
      _.every(requiredKeys, _.partial(_.has, jwt.decode(accessToken))) &&
      _.every(requiredKeys, _.partial(_.has, jwt.decode(refreshToken)))
    ) {
      return true;
    }
  } catch (error) {
    console.error(error.message);
  }

  return false;
}

export default function Routes() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: State) => state.auth.isLoggedIn);

  useEffect(() => {
    if (window.MOBILE) {
      setTimeout(function () {
        window.postMessage(
          JSON.stringify({
            messageType: 'loadSuccess',
            description: 'login'
          }), '*'
        );
      }, 1000);
    }

    /**
     * 1. 실제로 로그인하지 않은 경우
     * 2. 로그인 상태에서 새로 고침을 한 경우
     */
    if (isLoggedIn == false) {
      const accessToken  = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (_.isNull(accessToken) || _.isNull(refreshToken)) return;

      isAuthorizedToken(accessToken, refreshToken)
        ? dispatch(loginSuccess(accessToken, refreshToken))
        : localStorage.clear();
    }
  }, []);

  return (
    <Fragment>
      {
        isLoggedIn
          ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Redirect from="/login" to="/" />
              <Route component={Home} />
            </Switch>
          )
          : (
            <Switch>
              <Route component={Login} />
            </Switch>
          )
      }
    </Fragment>
  );
}
