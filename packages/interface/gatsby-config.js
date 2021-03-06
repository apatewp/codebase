const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${activeEnv}`,
});

module.exports = {
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-leaflet',
    {
      options: {
        siteUrl: 'https://www.neonlaw.com',
      },
      resolve: 'gatsby-plugin-canonical-urls',
    },
    {
      options: {
        fieldName: 'neon',
        typeName: 'neon',
        url: 'https://www.neonlaw.com/api/graphql',
      },
      resolve: 'gatsby-source-graphql',
    },
    {
      options: {
        prodKey: 'g3YZhuTc2vremmKADQUySeqE55Zv0FYI',
        trackPage: true
      },
      resolve: 'gatsby-plugin-segment-js'
    },
    {
      options: {
        defaultLanguage: 'en',
        languages: ['en', 'es'],
        path: `${__dirname}/src/intl`,
      },
      resolve: 'gatsby-plugin-intl',
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        name: 'content',
        path: `${__dirname}/src/content/`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        name: 'blogPosts',
        path: `${__dirname}/src/blogPosts`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        background_color: '#000',
        display: 'standalone',
        icon: 'src/images/logo.png',
        name: 'Neon Law',
        short_name: 'Neon Law',
        start_url: '/',
        theme_color: '#3B27BA',
      },
      resolve: 'gatsby-plugin-manifest',
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-mdx',
    'gatsby-plugin-react-axe',
    'gatsby-plugin-sitemap',
    {
      options: {
        env: {
          development: {
            policy: [{ disallow: ['/'], userAgent: '*' }]
          },
          production: {
            policy: [{ allow: '/', userAgent: '*' }]
          },
          staging: {
            policy: [{ disallow: ['/'], userAgent: '*' }]
          },
        },
        host: process.env.GATSBY_SITE_URL,
        sitemap: `${process.env.GATSBY_SITE_URL}/sitemap.xml`,
      },
      resolve: 'gatsby-plugin-robots-txt',
    },
    {
      options: {
        prefixes: [
          '/upward-mobility/*',
        ]
      },
      resolve: 'gatsby-plugin-create-client-paths',
    },
  ],
  siteMetadata: {
    author: '@neonlaw',
    description: 'Neon Law. The Upward Mobility Law Firm.',
    siteUrl: process.env.GATSBY_SITE_URL,
    title: 'Neon Law',
  },
};
