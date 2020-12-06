import { Box } from '@chakra-ui/core';
import React from 'react';
import { Section } from '@neonlaw/shared-ui/src/components/section';
import { UnderlineLink } from '@neonlaw/shared-ui/src/utils/mdxComponents';
import { sizes } from '@neonlaw/shared-ui/src/themes/neonLaw';
import { useIntl } from 'gatsby-plugin-intl';

export const ProBono = () => {
  const intl = useIntl();

  return (
    <Section
      title={intl.formatMessage({ id: 'pro_bono.title' })}
      isTitleUnderlined={true}
    >
      <Box as="p" maxWidth={sizes.textContainerSmall}>
        Finally, and most importantly, we are proudest of&nbsp;
        our commitment to&nbsp;
        <UnderlineLink to="/pro-bono/">pro bono</UnderlineLink> work and&nbsp;
        wish we could do it full time.&nbsp;
        If you require assistance and have attained a&nbsp;
        {/*eslint-disable */}
        <UnderlineLink href="http://www.lacsnpro_bono.org/wp-content/uploads/2019/12/SOLA-Process-Service-FAQ-2020.pdf">
          SOLA
        </UnderlineLink>{' '}
        from either{' '}
        <UnderlineLink target="_blank" href="https://nlslaw.net">
          Nevada Legal Services
        </UnderlineLink>{' '}
        or{' '}
        <UnderlineLink target="_blank" href="https://www.lacsn.org/">
          Legal Aid Center of Southern Nevada
        </UnderlineLink>
        , you may <UnderlineLink to="/contact/">contact</UnderlineLink> to us
        for a free consultation.
      </Box>
    </Section>
  );
};
