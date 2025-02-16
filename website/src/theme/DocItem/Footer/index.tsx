import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Translate from '@docusaurus/Translate';
import IconEdit from '@theme/Icon/Edit';
import LastUpdated from '@theme/LastUpdated';
import Link from '@docusaurus/Link';
import TagsListInline, {
  Props as TagsListInlineProps,
} from '@theme/TagsListInline';

import type {EditUrlButton} from '../../../../docusaurus.config';
import styles from './styles.module.css';
import DocsRating from '../../../../core/DocsRating';

function TagsRow(props: TagsListInlineProps) {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterTagsRow,
        'row margin-bottom--sm'
      )}>
      <div className="col">
        <TagsListInline {...props} />
      </div>
    </div>
  );
}
function EditPage({label, href}: {label: string; href: string}) {
  return (
    <Link to={href} className={ThemeClassNames.common.editThisPage}>
      <IconEdit />
      <Translate
        id="theme.common.editThisPage"
        description="The link label to edit the page">
        {label}
      </Translate>
    </Link>
  );
}
function EditMetaRow({
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
}: {
  editUrl: string;
  lastUpdatedAt: number;
  lastUpdatedBy: string;
}) {
  const buttons = React.useMemo((): EditUrlButton[] => {
    try {
      return JSON.parse(editUrl);
    } catch (e) {
      console.error(e);
      return [{href: editUrl, label: 'Edit this page'}];
    }
  }, [editUrl]);
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, 'row')}>
      <div className={clsx(styles.editButtons)}>
        {buttons.map(({label, href}, index) => (
          <EditPage key={index} label={label} href={href} />
        ))}
      </div>
      <div className={clsx(styles.lastUpdated)}>
        {(lastUpdatedAt || lastUpdatedBy) && (
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </div>
    </div>
  );
}
export default function DocItemFooter() {
  const {metadata} = useDoc();
  const {editUrl, lastUpdatedAt, lastUpdatedBy, tags} = metadata;
  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;
  if (!canDisplayFooter) {
    return null;
  }

  return (
    <>
      <DocsRating label={metadata.id} />
      <footer
        className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}>
        {canDisplayTagsRow && <TagsRow tags={tags} />}
        {canDisplayEditMetaRow && (
          <EditMetaRow
            editUrl={editUrl}
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </footer>
    </>
  );
}
