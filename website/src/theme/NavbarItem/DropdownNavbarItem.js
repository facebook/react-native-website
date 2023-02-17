/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useState, useRef, useEffect} from 'react';
import clsx from 'clsx';
import {
  isRegexpStringMatch,
  useCollapsible,
  Collapsible,
  useDocsPreferredVersion,
} from '@docusaurus/theme-common';
import {isSamePath, useLocalPathname} from '@docusaurus/theme-common/internal';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import NavbarItem from '@theme/NavbarItem';
import {useLocation} from '@docusaurus/router';
import {
  useActiveDocContext,
  useDocsData,
  useLatestVersion,
} from '@docusaurus/plugin-content-docs/client';
function isItemActive(item, localPathname) {
  if (isSamePath(item.to, localPathname)) {
    return true;
  }
  if (isRegexpStringMatch(item.activeBaseRegex, localPathname)) {
    return true;
  }
  if (item.activeBasePath && localPathname.startsWith(item.activeBasePath)) {
    return true;
  }
  return false;
}
function containsActiveItems(items, localPathname) {
  return items.some(item => isItemActive(item, localPathname));
}
function DropdownNavbarItemDesktop({
  items,
  docsPluginId,
  position,
  className,
  onClick,
  ...props
}) {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const handleClickOutside = event => {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
        return;
      }
      setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div
      ref={dropdownRef}
      className={clsx('navbar__item', 'dropdown', 'dropdown--hoverable', {
        'dropdown--right': position === 'right',
        'dropdown--show': showDropdown,
      })}>
      <NavbarNavLink
        aria-haspopup="true"
        aria-expanded={showDropdown}
        role="button"
        href={props.to ? undefined : '#'}
        className={clsx('navbar__link', className)}
        {...props}
        onClick={props.to ? undefined : e => e.preventDefault()}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setShowDropdown(!showDropdown);
          }
        }}>
        {props.children ?? props.label}
      </NavbarNavLink>
      <ul className="dropdown__menu">
        {items.map((childItemProps, i) => (
          <NavbarItem
            isDropdownItem
            onKeyDown={e => {
              if (i === items.length - 1 && e.key === 'Tab') {
                e.preventDefault();
                setShowDropdown(false);
                const nextNavbarItem = dropdownRef.current.nextElementSibling;
                if (nextNavbarItem) {
                  const targetItem =
                    nextNavbarItem instanceof HTMLAnchorElement
                      ? nextNavbarItem
                      : // Next item is another dropdown; focus on the inner
                        // anchor element instead so there's outline
                        nextNavbarItem.querySelector('a');
                  targetItem.focus();
                }
              }
            }}
            activeClassName="dropdown__link--active"
            {...childItemProps}
            key={i}
          />
        ))}
      </ul>
    </div>
  );
}
function DropdownNavbarItemMobile({
  items,
  className,
  position, // Need to destructure position from props so that it doesn't get passed on.
  onClick,
  docsPluginId,
  ...props
}) {
  const localPathname = useLocalPathname();

  // (CUSTOM) Always expand the channel toggle.
  const containsActive =
    containsActiveItems(items, localPathname) ||
    props.label == 'Stable' ||
    props.label == 'New Architecture';
  const {collapsed, toggleCollapsed, setCollapsed} = useCollapsible({
    initialState: () => !containsActive,
  });
  // Expand/collapse if any item active after a navigation
  useEffect(() => {
    if (containsActive) {
      setCollapsed(!containsActive);
    }
  }, [localPathname, containsActive, setCollapsed]);
  return (
    <li
      className={clsx('menu__list-item', {
        'menu__list-item--collapsed': collapsed,
      })}>
      <NavbarNavLink
        role="button"
        className={clsx(
          'menu__link menu__link--sublist menu__link--sublist-caret',
          className
        )}
        {...props}
        onClick={e => {
          e.preventDefault();
          toggleCollapsed();
        }}>
        {props.children ?? props.label}
      </NavbarNavLink>
      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        {items.map((childItemProps, i) => (
          <NavbarItem
            mobile
            isDropdownItem
            onClick={onClick}
            activeClassName="menu__link--active"
            {...childItemProps}
            key={i}
          />
        ))}
      </Collapsible>
    </li>
  );
}
export default function DropdownNavbarItem({
  mobile = false,
  docsPluginId,
  items,
  ...props
}) {
  // (CUSTOM) Custom behavior for the channel dropdown.
  // This allows "Guides", "Components", and "APIs" to direct to the correct version.
  // Also allows the channel toggle to redirect to the current doc.
  const activeDocContext = useActiveDocContext(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);
  const {preferredVersion, savePreferredVersionName} =
    useDocsPreferredVersion(docsPluginId);
  const docsDataExperimental = useDocsData('experimental');
  const docsDataDefault = useDocsData();

  const modifiedItems = items;
  if (docsPluginId !== null) {
    const {pathname} = useLocation();

    if (
      !activeDocContext.activeDoc &&
      (props.label == 'Stable' || props.label == 'New Architecture')
    ) {
      return null;
    }

    if (docsPluginId === 'experimental' && !pathname.includes('experimental')) {
      return null;
    } else if (
      docsPluginId === 'default' &&
      pathname.includes('experimental')
    ) {
      return null;
    }

    const dropdownVersion =
      activeDocContext.activeVersion ?? preferredVersion ?? latestVersion;

    // Allows the channel toggle to redirect to the current doc.
    if (props.label == 'Stable' || props.label == 'New Architecture') {
      modifiedItems.forEach(item => {
        if (props.label == 'New Architecture') {
          const possibleTo = pathname.replace('/experimental', '/docs');
          const hasDoc = docsDataDefault.versions
            .find(version => version.name === dropdownVersion.name)
            .docs.find(doc => doc.path === possibleTo);
          item.to = hasDoc ? possibleTo : '/docs/getting-started';
        } else {
          const possibleTo = pathname.replace('/docs', '/experimental');
          let foundVersion = docsDataExperimental.versions.find(
            version => version.name === dropdownVersion.name
          );
          if (foundVersion == null) {
            foundVersion = docsDataExperimental.versions.find(
              version => version.name === latestVersion.name
            );
          }
          const hasDoc = foundVersion.docs.find(doc => doc.path === possibleTo);
          item.to = hasDoc ? possibleTo : '/experimental/getting-started';
        }
      });
    }
  }

  const Comp = mobile ? DropdownNavbarItemMobile : DropdownNavbarItemDesktop;
  return <Comp {...props} docsPluginId={docsPluginId} items={modifiedItems} />;
}
