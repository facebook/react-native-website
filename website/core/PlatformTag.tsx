import React from 'react';

const PlatformTag = ({platform}) => {
  const platformLabel = platform === 'ios' ? 'iOS' : 'Android';
  return (
    <div
      className={`label ${platform}`}
      title={`This section is related to ${platformLabel} platform`}>
      {platformLabel}
    </div>
  );
};

export default PlatformTag;
