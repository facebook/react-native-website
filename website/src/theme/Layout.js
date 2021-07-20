import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import {Redirect, useLocation} from '@docusaurus/router';

// Ensure we don't use trailing slashes, as it can break relative links
// See https://github.com/facebook/react-native-website/issues/2291
// Inspired by https://jasonwatmore.com/post/2020/03/23/react-router-remove-trailing-slash-from-urls
const RemoveTrailingSlashRedirect = () => {
  const {pathname} = useLocation();
  if (pathname.endsWith('/')) {
    return <Redirect to={pathname.slice(0, -1)} />;
  }
  if (pathname.endsWith('.html')) {
    return <Redirect to={pathname.slice(0, -5)} />;
  }
  return null;
};

const Layout = props => (
  <>
    <RemoveTrailingSlashRedirect />
    <OriginalLayout {...props} />
  </>
);

export default Layout;
