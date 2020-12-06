import { Testimonial, TestimonialProps } from './testimonial';

import React from 'react';
import { Section } from '@neonlaw/shared-ui/src/components/section';
import styled from '@emotion/styled';
import { useIntl } from 'gatsby-plugin-intl';

const StyledTestimonials = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Testimonials = () => {
  const intl = useIntl();

  const testimonails: TestimonialProps[] = [];

  return (
    <Section 
      title={intl.formatMessage({ id: 'testimonials.title' })}
      isTitleUnderlined={true}
    >
      <StyledTestimonials>
        {testimonails.map((t: TestimonialProps, i: any) => (
          <Testimonial key={t.author + i} {...t} />
        ))}
      </StyledTestimonials>
    </Section>
  );
};
