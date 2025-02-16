import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import AuthorSocials from '@theme/Blog/Components/Author/Socials';
import {Props as AuthorSocialsProps} from '@theme/Blog/Components/Author/Socials';
import {Props as LinkProps} from '@docusaurus/Link';
import {Props as HeadingProps} from '@theme/Heading';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function MaybeLink(props: LinkProps & {children: React.ReactNode}) {
  if (props.href) {
    return <Link {...props} />;
  }
  return <>{props.children}</>;
}
function AuthorTitle({title}: {title: string}) {
  return (
    <small className={styles.authorTitle} title={title}>
      {title}
    </small>
  );
}
function AuthorName({name, as}: {name: string; as?: HeadingProps['as']}) {
  if (!as) {
    return <span className={styles.authorName}>{name}</span>;
  } else {
    return (
      <Heading as={as} className={styles.authorName}>
        {name}
      </Heading>
    );
  }
}
function AuthorBlogPostCount({count}: {count: number}) {
  return <span className={clsx(styles.authorBlogPostCount)}>{count}</span>;
}
// Note: in the future we might want to have multiple "BlogAuthor" components
// Creating different display modes with the "as" prop may not be the best idea
// Explainer: https://kyleshevlin.com/prefer-multiple-compositions/
// For now, we almost use the same design for all cases, so it's good enough
export default function BlogAuthor({
  as,
  author,
  className,
  count,
}: {
  as: HeadingProps['as'];
  author: AuthorSocialsProps['author'];
  className?: string;
  count?: number;
}) {
  const {name, title, url, imageURL, email, page} = author;
  const link =
    page?.permalink || url || (email && `mailto:${email}`) || undefined;
  return (
    <div
      className={clsx(
        'avatar margin-bottom--md',
        className,
        styles[`author-as-${as}`]
      )}>
      {imageURL && (
        <MaybeLink href={link} className="avatar__photo-link">
          <img
            className={clsx('avatar__photo', styles.authorImage)}
            src={imageURL}
            alt={name}
          />
        </MaybeLink>
      )}

      {(name || title) && (
        <div className={clsx('avatar__intro', styles.authorDetails)}>
          <div className="avatar__name">
            {name && (
              <MaybeLink href={link}>
                <AuthorName name={name} as={as} />
              </MaybeLink>
            )}
            {count && <AuthorBlogPostCount count={count} />}
          </div>
          {!!title && <AuthorTitle title={title} />}

          {/*
              We always render AuthorSocials even if there's none
              This keeps other things aligned with flexbox layout
            */}
          <AuthorSocials author={author} />
        </div>
      )}
    </div>
  );
}
