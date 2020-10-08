import { BaseLayout } from '@neonlaw/shared-ui/src/layouts/base';
import LogRocket from 'logrocket';
import React from 'react';

export const wrapPageElement = ({ element, props }) => {
  return <BaseLayout {...props}>{element}</BaseLayout>;
};

export const onClientEntry = () => {
  LogRocket.init('4qbrpw/production-hoje7');
};
