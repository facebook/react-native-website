/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Head from '@docusaurus/Head';
import {useTitleFormatter} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocPaginator from '@theme/DocPaginator';
import DocVersionSuggestions from '../DocVersionSuggestions';
import TOC from '@theme/TOC';
import IconEdit from '@theme/IconEdit';
import clsx from 'clsx';
import styles from './styles.module.css';
import {
  useActivePlugin,
  useVersions,
  useActiveVersion,
} from '@theme/hooks/useDocs';
// import DocsRating from '../../../core/DocsRating';

function SponsorHeader() {
  return (
    <a
      href="https://datayi.cn/w/Yo1vDOv9"
      target="_blank"
      style={{
        display: 'block',
        padding: 12,
        backgroundColor: '#eee',
        color: '#666',
        marginBottom: 15,
      }}>
      <span style={{fontWeight: 'bold', color: '#05a5d1'}}>React 实战教程</span>{' '}
      深入学习一线大厂必备前端技能，VIP 教程限时免费领取。{' '}
      <span
        style={{
          border: 'solid 1px #666',
          padding: '4px 6px',
          marginLeft: 8,
          verticalAlign: 'middle',
        }}>
        立即查看 &gt;
      </span>
    </a>
  );
}

function DocItem(props) {
  const {siteConfig} = useDocusaurusContext();
  const {url: siteUrl} = siteConfig;
  const {content: DocContent} = props;
  const {
    metadata,
    frontMatter: {
      image: metaImage,
      keywords,
      hide_title: hideTitle,
      hide_table_of_contents: hideTableOfContents,
    },
  } = DocContent;
  const {
    description,
    title,
    permalink,
    editUrl,
    lastUpdatedAt,
    lastUpdatedBy,
    unversionedId,
  } = metadata;
  const {pluginId} = useActivePlugin({
    failfast: true,
  });
  const versions = useVersions(pluginId);
  const version = useActiveVersion(pluginId);
  const showVersionBadge = versions.length > 1 && !version.isLast;
  const metaTitle = useTitleFormatter(title);
  const metaImageUrl = useBaseUrl(metaImage, {
    absolute: true,
  });
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:title" content={metaTitle} />
        {description && <meta name="description" content={description} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {keywords && keywords.length && (
          <meta name="keywords" content={keywords.join(',')} />
        )}
        {metaImage && <meta property="og:image" content={metaImageUrl} />}
        {metaImage && <meta property="twitter:image" content={metaImageUrl} />}
        {metaImage && (
          <meta name="twitter:image:alt" content={`Image for ${title}`} />
        )}
        {permalink && <meta property="og:url" content={siteUrl + permalink} />}
        {permalink && <link rel="canonical" href={siteUrl + permalink} />}
      </Head>
      <div className="row">
        <div
          className={clsx('col', {
            [styles.docItemCol]: !hideTableOfContents,
          })}>
          <DocVersionSuggestions />
          <div className={styles.docItemContainer}>
            <article>
              {showVersionBadge && (
                <div>
                  <span className="badge badge--secondary">
                    版本: {version.label}
                  </span>
                </div>
              )}
              {!hideTitle && (
                <header>
                  <h1 className={styles.docTitle}>{title}</h1>
                </header>
              )}
              {/* <SponsorHeader /> */}
              <div className="markdown">
                <DocContent />
              </div>
            </article>
            {/* <DocsRating label={unversionedId} /> */}
            {(editUrl || lastUpdatedAt || lastUpdatedBy) && (
              <div className="docMetadata margin-vert--xl">
                <div className="row">
                  <div className="col">
                    {editUrl && (
                      <a
                        href={editUrl}
                        target="_blank"
                        rel="noreferrer noopener">
                        <IconEdit />
                        改进文档
                      </a>
                    )}
                  </div>
                  {(lastUpdatedAt || lastUpdatedBy) && (
                    <div className="col text--right">
                      <em>
                        <small className="docMetadata-updated">
                          最近更新{' '}
                          {lastUpdatedAt && (
                            <>
                              {' '}
                              <time
                                dateTime={new Date(
                                  lastUpdatedAt * 1000
                                ).toISOString()}
                                className={styles.docLastUpdatedAt}>
                                {new Date(
                                  lastUpdatedAt * 1000
                                ).toLocaleDateString('zh-CN')}
                              </time>
                              {lastUpdatedBy && ' '}
                            </>
                          )}
                          {lastUpdatedBy && (
                            <>
                              by <strong>{lastUpdatedBy}</strong>
                            </>
                          )}
                        </small>
                      </em>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="margin-vert--lg">
              <DocPaginator metadata={metadata} />
            </div>
          </div>
        </div>
        {!hideTableOfContents && DocContent.toc && (
          <div className="col col--3">
            <TOC toc={DocContent.toc} />
          </div>
        )}
      </div>
    </>
  );
}

export default DocItem;
