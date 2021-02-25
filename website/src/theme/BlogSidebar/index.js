/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

export default function BlogSidebar({sidebar}) {
  if (sidebar.items.length === 0) {
    return null;
  }

  let cachedYear = null;

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.sidebarItemTitle}>{sidebar.title}</h3>
      <ul className={styles.sidebarItemList}>
        {sidebar.items.map(item => {
          const postYear = item.permalink.split('/')[2];
          const yearHeader =
            cachedYear !== postYear ? (
              <h4 className={styles.sidebarItemTitle}>{postYear}</h4>
            ) : null;
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
    </div>
  );
}
