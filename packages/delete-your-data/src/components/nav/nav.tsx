import React from 'react';
import { gutters } from '@neonlaw/shared-ui/src/themes/neonLaw';
import { links } from './links';
import styled from '@emotion/styled';

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding:  0;

  @media(max-width: 540px) {
    justify-content: center;
  }

  a {
    display: inline-block;
    color: inherit;
    text-decoration: none;
    z-index: 1 !important;

    &:not(:last-child) {
      margin-right: ${gutters.medium};

      @media(max-width: 540px) {
        margin-right: ;
      }

      @media(max-width: 320px) {
        margin-right: ${gutters.xSmall};
      }
    }
  }
`;

export const Nav = () => (
  <div className="row">
    <StyledNav role="navigation">
      {links.map(({ label, route }) => (
        <a key={label} href={route}>
          {label}
        </a>
      ))}
    </StyledNav>
  </div>
);
