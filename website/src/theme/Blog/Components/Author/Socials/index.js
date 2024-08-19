import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Twitter from '@theme/Icon/Socials/Twitter';
import GitHub from '@theme/Icon/Socials/GitHub';
import X from '@theme/Icon/Socials/X';
import StackOverflow from '@theme/Icon/Socials/StackOverflow';
import LinkedIn from '@theme/Icon/Socials/LinkedIn';
import DefaultSocialIcon from '@theme/Icon/Socials/Default';
import styles from './styles.module.css';
const SocialPlatformConfigs = {
  twitter: {Icon: Twitter, label: 'Twitter'},
  github: {Icon: GitHub, label: 'GitHub'},
  stackoverflow: {Icon: StackOverflow, label: 'Stack Overflow'},
  linkedin: {Icon: LinkedIn, label: 'LinkedIn'},
  x: {Icon: X, label: 'X'},
};
function getSocialPlatformConfig(platformKey) {
  return (
    SocialPlatformConfigs[platformKey] ?? {
      Icon: DefaultSocialIcon,
      label: platformKey,
    }
  );
}
function SocialLink({platform, link}) {
  const {Icon, label} = getSocialPlatformConfig(platform);
  return (
    <Link className={styles.authorSocialLink} href={link} title={label}>
      <Icon className={clsx(styles.authorSocialLink)} />
    </Link>
  );
}
export default function BlogAuthorSocials({author}) {
  const entries = Object.entries(author.socials ?? {});
  return (
    <div className={styles.authorSocials}>
      {entries.map(([platform, linkUrl]) => {
        return <SocialLink key={platform} platform={platform} link={linkUrl} />;
      })}
    </div>
  );
}
