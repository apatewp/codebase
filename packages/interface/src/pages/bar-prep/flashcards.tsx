import {
  FlashcardContainer
} from '@neonlaw/shared-ui/src/components/flashcardContainer';
import { Link } from 'gatsby';
import { PublicLayout } from '@neonlaw/shared-ui/src/layouts/publicLayout';
import React from 'react';
import { Section } from '@neonlaw/shared-ui/src/components/section';
import { Seo } from '../../components/seo';
/* eslint-disable */
// @ts-nocheck
/* eslint-enable */
import { Text } from '@chakra-ui/core';

const Flashcards = () => {
  return (
    <PublicLayout>
      <Seo title="Bar Prep Flashcards" />

      <Section
        title='Bar Prep Flashcards'
        isTitleUnderlined={true}
        titleTestId='flashcards-heading'
      >
        <FlashcardContainer />
        <Text textDecoration="underline">
          <Link to="/bar-prep">
            Read about our approach to bar prep.
          </Link>
        </Text>
      </Section>
    </PublicLayout>
  );
};

/* eslint-disable-next-line import/no-default-export */
export default Flashcards;
