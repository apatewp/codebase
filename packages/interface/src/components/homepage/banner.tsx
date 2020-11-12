/* eslint-disable */
// @ts-nocheck
/* eslint-enable */
import { Box, Heading, Text } from '@chakra-ui/core';
import { colors, gutters, sizes } from '@neonlaw/shared-ui/src/themes/neonLaw';

import BannerBg from '../../images/banner.jpg';
import { Button } from '@neonlaw/shared-ui/src/components/button';
import { Container } from '@neonlaw/shared-ui/src/components/container';
import React from 'react';
import { navigate } from 'gatsby';
import { theme } from '@chakra-ui/core';

interface BannerProps {
  title: string;
  text: string;
  buttonText: string;
}

export const Banner = ({ title, text, buttonText }: BannerProps) => (
  <Box
    as="section"
    display="flex"
    alignItems="center"
    maxHeight="1200px"
    minHeight="600px"
    height="100vh"
    color={colors.text.dark}
    background={`linear-gradient(
      to right, rgba(0,0,0, .6), rgba(0,0,0, .9)),
      url(${BannerBg})`}
    backgroundSize="cover"
    backgroundPosition="left"
    backgroundAttachment="fixed"
  >
    <Container>
      <Box maxWidth={['400px', '500px', sizes.textContainerSmall]}>
        <Heading
          as="h1"
          fontSize={[
            theme.fontSizes['xl1'],
            theme.fontSizes['xl0'],
            theme.fontSizes.xl,
          ]}
          fontWeight="400"
        >
          {title}
        </Heading>
        <Text
          margin={`${gutters.xSmall} 0 ${gutters.small}`}
          color={colors.text.darkLight}
        >
          {text}
        </Text>
        <Button
          flash={true}
          bg={colors.cyanDark}
          _hover={{ bg: colors.cyanDark1 }}
          onClick={() => {
            navigate('/contact');
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Container>
  </Box>
);
