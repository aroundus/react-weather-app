import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { createBrowserHistory } from 'history';
import { ConfigProvider } from 'antd';
import ko_KR from 'antd/lib/locale-provider/ko_KR';

import store from 'store';
import Layout from 'views/Layout';

import 'styles/style.less';

export default function App() {
  const history = createBrowserHistory();

  return (
    <Provider store={store}>
      <ConfigProvider locale={ko_KR}>
        <Router history={history}>
          <Helmet titleTemplate="%s :: OPEN WEATHER"></Helmet>
          <Layout />
        </Router>
      </ConfigProvider>
    </Provider>
  );
}
