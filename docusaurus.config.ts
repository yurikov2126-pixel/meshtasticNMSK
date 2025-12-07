import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Node.js ≥20 exposes `globalThis.localStorage` as an experimental getter that
// throws unless the `--localstorage-file` flag is provided. During the static
// build we don't need real localStorage, but referencing the getter (for
// example, inside inline scripts) crashes the build. Remove it proactively so
// SSR doesn't hit the SecurityError while the browser runtime remains
// unaffected.
if (typeof globalThis !== 'undefined' && 'localStorage' in globalThis) {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  if (descriptor && (descriptor.get || descriptor.set)) {
    try {
      Object.defineProperty(globalThis, 'localStorage', {
        value: undefined,
        writable: true,
        configurable: true,
      });
    } catch {
      /* noop */
    }
  }
}

const config: Config = {
  title: 'Meshtastik NMSK',
  tagline: 'База знаний Mesh-NMSK',
  favicon: 'img/favicon-light.png',
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        href: '/img/favicon-light.png',
        media: '(prefers-color-scheme: light)',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        href: '/img/favicon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        name: ['База знаний', 'Контрибьютинг', 'О нас'],
        url: [
          'https://wiki.meshtastik-nmsk.ru/',
          'https://wiki.meshtastik-nmsk.ru/wiki/how-to-edit',
          'https://wiki.meshtastik-nmsk.ru/about',
        ],
      }),
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
    },
    {
      tagName: 'noscript',
      attributes: {},
      innerHTML:
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"/>',
    },
    {
      tagName: 'noscript',
      attributes: {},
      innerHTML:
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"/>',
    },
  ],
  future: {
    v4: true,
  },
  url: 'https://wiki.meshtastik-nmsk.ru',
  baseUrl: '/',
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
      rel: 'preload',
      as: 'style',
      onload: "this.onload=null;this.rel='stylesheet'",
    },
    {
      href:
        'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&display=swap',
      rel: 'preload',
      as: 'style',
      onload: "this.onload=null;this.rel='stylesheet'",
    },
  ],
  organizationName: 'Mesh-NMSK',
  projectName: 'wiki',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/yurikov2126-pixel/meshtasticNMSK/edit/main/',
          admonitions: {
            keywords: ['favorite'],
            extendDefaults: true,
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.7,
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexPages: true,
        docsRouteBasePath: '/',
        language: ['ru', 'en'],
      },
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-4M85P2LD5J',
        anonymizeIP: true,
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1600,
        min: 400,
        steps: 4,
      },
    ],
    [
      '@docusaurus/plugin-content-pages',
      {
        id: 'extra-pages',
        path: 'static-pages',
        routeBasePath: '/',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        editUrl: 'https://github.com/yurikov2126-pixel/meshtasticNMSK/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: process.env.NODE_ENV === 'development',
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo-light.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#7eb81b',
          },
        ],
      },
    ],
  ],
  themeConfig: {
    image: 'img/logo-light.png',
    metadata: [
      {
        name: 'description',
        content:
          'Meshtastic-Новомосковск — русскоязычная база знаний о Meshtastic, LoRa mesh-сетях и устройствах для автономной связи.',
      },
      {
        name: 'keywords',
        content:
          'meshtastic, Meshtastic-NMSK, lora mesh, loRa сеть, автономная связь, wiki meshtastic, инструкции lora',
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    breadcrumbs: {
      homePageLabel: 'Meshtastic-NMSK',
    },
    // Algolia is disabled; using local search plugin
    navbar: {
      title: 'Meshtastic-NMSK',
      logo: {
        alt: 'Meshtastic-NMSK',
        src: 'img/logo-light.png',
        srcDark: 'img/logo-dark.png',
      },
      items: [
        {
          to: '/',
          position: 'left',
          label: 'База знаний',
          activeBaseRegex: '^(?!/(?:about|wiki)).*$',
        },
        {
          to: '/wiki/how-to-edit',
          position: 'left',
          label: 'Контрибьютинг',
          activeBaseRegex: '^/wiki/how-to-edit/?$',
        },
        {
          to: '/about',
          position: 'left',
          label: 'О нас',
          activeBaseRegex: '^/about/?$',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          html: [
            "<div class='footer__links-row'>",
            '</div>',
            "<div class='footer__trademark'>Meshtastic® is a registered trademark of Meshtastic LLC.</div>",
          ].join(''),
        },
      ],
      copyright: `© ${new Date().getFullYear()} Mesh-NMSK`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
