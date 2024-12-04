/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Head from '@docusaurus/Head';

import Layout from '@theme/Layout';

import Home from './Home';

const Index = () => {
  return (
    <Layout
      description="A framework for building native apps using React"
      wrapperClassName="homepage">
      <Head>
        <title>React Native · Learn once, write anywhere</title>
        <meta
          property="og:title"
          content="React Native · Learn once, write anywhere"
        />
        <meta
          property="twitter:title"
          content="React Native · Learn once, write anywhere"
        />
      </Head>
      <Home />
    </Layout>
  );
};

export default Index;
