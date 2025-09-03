/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Layout from '@theme/Layout';
import React, {useEffect} from 'react';

const Releases = () => {
  useEffect(() => {
    location.href = '/docs/next/releases';
  }, []);

  return (
    <Layout title="Releases" wrapperClassName="versions-page">
      <div style={{textAlign: 'center'}}>Redirecting...</div>
    </Layout>
  );
};

export default Releases;
