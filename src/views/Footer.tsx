import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import { State } from 'store/reducers';
import { logout } from 'store/auth/actions';

import { TabBar, Modal } from 'antd-mobile';
import { HomeOutlined, HomeFilled, OrderedListOutlined, LogoutOutlined } from '@ant-design/icons';

const _ = require('lodash');

enum Path {
  Home = '/home'
}

function Footer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const isLoggedIn = useSelector((state: State) => state.auth.isLoggedIn);
  const isKeyboardVisible = useSelector((state: State) => state.app.isKeyboardVisible);

  const email = useSelector((state: State) => state.auth.user.email);

  const [pressLogout, setPressLogout] = useState(false);

  function matchPath(path: string) {
    return _.isNull(location.pathname.match(path))
      ? false : true;
  }

  return (
    <Fragment>
      {isLoggedIn && isKeyboardVisible
        && (
          <footer>
            <TabBar
              className="app-tab-bar" // WHY: 렌더링 시 클래스 이름을 반영하지 않는 이유?
              unselectedTintColor="#949494"
              tintColor="#33A3F4"
              barTintColor="white"
              prerenderingSiblingsNumber={0}>
              <TabBar.Item
                title="Home"
                key="Home"
                icon={<HomeOutlined />}
                selectedIcon={<HomeFilled />}
                selected={location.pathname == '/' || matchPath(Path.Home)}
                onPress={() => {
                  history.push(Path.Home);
                }}
              >
              </TabBar.Item>
              <TabBar.Item
                title="Logout"
                key="Logout"
                icon={<LogoutOutlined />}
                selectedIcon={<LogoutOutlined />}
                onPress={() => {
                  setPressLogout(true);
                }}
              >
              </TabBar.Item>
            </TabBar>
            <Modal
              visible={pressLogout}
              transparent
              title={(<span style={{ fontWeight: 500 }}>{email}</span>)}
              footer={[
                {
                  text: 'Logout',
                  onPress: () => {
                    setPressLogout(false);
                    dispatch(logout());
                  }
                },
                {
                  text: 'Cancel',
                  onPress: () => {
                    setPressLogout(false);
                  }
                }
              ]}>
              Logout and go to the login screen.
            </Modal>
          </footer>
        )
      }
    </Fragment>
  );
}

export default Footer;
