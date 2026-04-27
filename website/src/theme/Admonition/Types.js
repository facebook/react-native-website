import React from 'react';
import clsx from 'clsx';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';

const {info: Info} = DefaultAdmonitionTypes;

function MyCustomAdmonition(props) {
  return (
    <Info className={clsx(props.className, 'alert--important')} {...props} />
  );
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,
  important: MyCustomAdmonition,
};

export default AdmonitionTypes;
