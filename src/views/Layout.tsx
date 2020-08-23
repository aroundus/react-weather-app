import React from 'react';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';

import Routes from 'routes';
import Header from 'views/Header';
import Footer from 'views/Footer';

function Layout() {
  const query = {
    'screen-xs': {
      maxWidth: 575
    },
    'screen-sm': {
      minWidth: 576,
      maxWidth: 767
    },
    'screen-md': {
      minWidth: 768,
      maxWidth: 991
    },
    'screen-lg': {
      minWidth: 992,
      maxWidth: 1199
    },
    'screen-xl': {
      minWidth: 1200,
      maxWidth: 1599
    },
    'screen-xxl': {
      minWidth: 1600
    }
  };

  return (
    <ContainerQuery query={query}>
      {params => (
        <div className={classNames(params)}>
          <Header />
          <Routes />
          <Footer />
        </div>
      )}
    </ContainerQuery>
  );
}

export default Layout;
