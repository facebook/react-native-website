import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

export default function BlogSidebarDesktop({sidebar}) {
  let cachedYear = null;
  return (
    <aside className="col col--3">
      <nav
        className={clsx(styles.sidebar, 'thin-scrollbar')}
        aria-label={translate({
          id: 'theme.blog.sidebar.navAriaLabel',
          message: 'Blog recent posts navigation',
          description: 'The ARIA label for recent posts in the blog sidebar',
        })}>
        <div className={clsx(styles.sidebarHeader, 'margin-bottom--md')}>
          {sidebar.title}
        </div>
        <ul className={clsx(styles.sidebarItemList, 'clean-list')}>
          {sidebar.items.map(item => {
            const postYear = item.permalink.split('/')[2];
            const yearHeader = cachedYear !== postYear && (
              <h5 className={styles.sidebarItemTitle}>{postYear}</h5>
            );
            cachedYear = postYear;
            return (
              <>
                {yearHeader}
                <li key={item.permalink} className={styles.sidebarItem}>
                  <Link
                    isNavLink
                    to={item.permalink}
                    className={styles.sidebarItemLink}
                    activeClassName={styles.sidebarItemLinkActive}>
                    {item.title}
                  </Link>
                </li>
              </>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
