import { BaseLayout } from '@neonlaw/shared-ui/src/layouts/base';
import { ColorModeScript } from '@chakra-ui/core';
import React from 'react';

export const wrapPageElement = ({ element, props }) => {
  return <BaseLayout {...props}>{element}</BaseLayout>;
};

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents();

  headComponents.push(
    <script key="ze-settings" src="/scripts/ze-settings.js" />,
  );

  replaceHeadComponents(headComponents);
};

export const onRenderBody = ({
  setPostBodyComponents,
  setPreBodyComponents,
}) => {
  setPreBodyComponents([<ColorModeScript key="chakra-ui-no-flash" />]);
  if (
    process.env.NODE_ENV == 'development' ||
    process.env.GATSBY_ACTIVE_ENV == 'development'
  ) {
    return;
  }
  if (process.env.GATSBY_ACTIVE_ENV == 'staging') {
    setPostBodyComponents([
      <script
        src="https://cdn.lr-ingest.io/LogRocket.min.js"
        key="logrocket-cdn"
        crossOrigin="anonymous"
      />,
      /* eslint-disable */
      <script key="logrocket-init">
        window.LogRocket && window.LogRocket.init('4qbrpw/staging');
      </script>,
      /* eslint-enable */
    ]);
    return;
  }

  const zendeskKey = '81e26970-baa7-4b83-a913-984711a0b5f1';

  setPostBodyComponents([
    <script
      src="https://cdn.lr-ingest.io/LogRocket.min.js"
      key="logrocket-cdn"
      crossOrigin="anonymous"
    />,
    /* eslint-disable */
    <script key="logrocket-init">
      window.LogRocket && window.LogRocket.init('4qbrpw/production-hoje7');
    </script>,
    /* eslint-enable */
    <script
      id="ze-snippet"
      key="zendesk"
      src={`https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`}
    />,
    <script
      key="fathom"
      src="https://anglerfish.neonlaw.com/script.js"
      site="DUBLGHDJ"
      excluded-domains="127.0.0.1,localhost,neonlaw.net"
      defer
    />,
  ]);
};
