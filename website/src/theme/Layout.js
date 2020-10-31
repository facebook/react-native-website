import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import {Redirect, useLocation} from '@docusaurus/router';

// Ensure we don't use trailing slashes, as it can break relative links
// See https://github.com/facebook/react-native-website/issues/2291
// Inspired by https://jasonwatmore.com/post/2020/03/23/react-router-remove-trailing-slash-from-urls
const RemoveTrailingSlashRedirect = () => {
  const location = useLocation();
  if (location.pathname.endsWith('/')) {
    return <Redirect to={location.pathname.slice(0, -1)} />;
  }
  return null;
};

export default function Layout(props) {
  return (
    <>
      <RemoveTrailingSlashRedirect />
      <OriginalLayout {...props} />
    </>
  );
}
