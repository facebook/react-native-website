/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import {NavbarSecondaryMenuFiller} from '@docusaurus/theme-common';
import styles from './styles.module.css';

function BlogSidebarMobileSecondaryMenu({sidebar}) {
  let cachedYear = null;
  return (
    <ul className="menu__list blog-menu__list">
      {sidebar.items.map(item => {
        const postYear = item.permalink.split('/')[2];
        const yearHeader = cachedYear !== postYear && (
          <h5 className={styles.sidebarItemTitle}>{postYear}</h5>
        );
        cachedYear = postYear;
        return (
          <>
            {yearHeader}
            <li key={item.permalink} className="menu__list-item">
              <Link
                isNavLink
                to={item.permalink}
                className="menu__link"
                activeClassName="menu__link--active">
                {item.title}
              </Link>
            </li>
          </>
        );
      })}
    </ul>
  );
}
export default function BlogSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={BlogSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}
