import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { NavBar } from 'antd-mobile';

import { State } from 'store/reducers';
import { Step } from 'utils/enums';
import { LeftCircleOutlined } from '@ant-design/icons';

const _ = require('lodash');

function Header() {
  const history = useHistory();

  const isLoggedIn = useSelector((state: State) => state.auth.isLoggedIn);
  const condition = useSelector((state: State) => state.app.condition);

  const statusOfLoadingWeather = useSelector((state: State) => state.app.statusOfLoadingWeather);

  return (
    <Fragment>
      {isLoggedIn
        && (
          <header>
            <NavBar
              className="app-navbar"
              mode="light"
              leftContent={
                !(history.location.pathname == '/' || history.location.pathname.match('home')) && <LeftCircleOutlined />
              }
              onLeftClick={() => {
                !(history.location.pathname == '/' || history.location.pathname.match('home')) && history.goBack();
              }}>
              {
                statusOfLoadingWeather == Step.FINISH
                  ? condition.name.toUpperCase()
                  : (
                    <img
                      role="img"
                      alt="carbom-symbolmark"
                      src="/assets/images/sun.png"
                      onClick={() => {
                        window.location.reload();
                      }} />
                  )
              }
            </NavBar>
          </header>
        )
      }
    </Fragment>
  );
}

export default Header;
