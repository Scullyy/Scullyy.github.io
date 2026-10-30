import React from 'react';
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';

const STORE_URL = 'https://scullys-development.tebex.io/';
const DISCORD_URL = 'https://discord.gg/scully';

function useHead() {
  const { asPath } = useRouter();
  const { frontMatter, title } = useConfig();
  const url = `https://scullyy.github.io${asPath}`;
  const description = frontMatter.description || "Documentation for resources created by Scully\'s Development.";

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#070b12" />
      <link rel="icon" type="image/x-icon" href="/scully.ico" />
      <link rel="apple-touch-icon" href="/icon.png" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:url" content={url} />
      <meta name="og:image" content="https://scullyy.github.io/logo.png" />
    </>
  );
}

function useNextSeoProps() {
  const { asPath } = useRouter();
  const arr = asPath.replace(/[-_]/g, ' ').split('/');
  const category = (arr[1][0] !== '#' && arr[1]) || 'Scully\'s Development';
  const rawTitle = arr[arr.length - 1];
  const title = /[a-z]/.test(rawTitle) && /[A-Z]/.test(rawTitle) ? rawTitle : '%s';

  return {
    titleTemplate: `${title} - ${
      rawTitle === category ? 'Documentation' : category.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
    }`,
  };
}

const config: DocsThemeConfig = {
  primaryHue: 205,
  primarySaturation: 92,
  darkMode: false,
  nextThemes: {
    defaultTheme: 'dark',
    forcedTheme: 'dark',
  },
  logo: (
    <span className="sd-brand">
      <img src="/logo.png" alt="" className="sd-brand-avatar" />
      <span className="sd-brand-name">
        Scully's <span>Development</span>
      </span>
      <span className="sd-brand-tag">Docs</span>
    </span>
  ),
  head: useHead,
  useNextSeoProps: useNextSeoProps,
  project: {
    link: STORE_URL,
    icon: (
      <span className="sd-nav-cta">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        Store
      </span>
    ),
  },
  chat: {
    link: DISCORD_URL,
  },
  docsRepositoryBase: 'https://github.com/Scullyy/Scullyy.github.io/tree/main',
  sidebar: {
    defaultMenuCollapseLevel: 2,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  editLink: {
    text: 'Edit this page on GitHub →',
  },
  feedback: {
    content: 'Question? Ask on Discord →',
    useLink: () => DISCORD_URL,
  },
  footer: {
    text: (
      <div className="sd-footer">
        <div className="sd-footer-brand">
          <img src="/logo.png" alt="" />
          <div>
            <strong>Scully's <span>Development</span></strong>
            <p>Premium, optimised and fully configurable FiveM resources.</p>
          </div>
        </div>
        <div className="sd-footer-links">
          <a href={STORE_URL} target="_blank" rel="noreferrer">Store</a>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer">Discord</a>
          <a href="https://forum.cfx.re/u/scullyy/" target="_blank" rel="noreferrer">Cfx.re</a>
          <a href="https://github.com/Scullyy" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <div className="sd-footer-copy">© {new Date().getFullYear()} Scully's Development. Not affiliated with Rockstar Games or Cfx.re.</div>
      </div>
    ),
  },
}

export default config
