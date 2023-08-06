import React from 'react';
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';

function useHead() {
  const { asPath } = useRouter();
  const { frontMatter, title } = useConfig();
  const url = `https://scullyy.github.io${asPath}`;
  const description = frontMatter.description || "Documentation for resources created by Scully\'s Development.";

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/x-icon" href="scully.ico" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:url" content={url} />
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
  primarySaturation: 100,
  logo: (
    <div style={{
        paddingLeft: '45px',
        lineHeight: '45px',
        background: "url('https://avatars.githubusercontent.com/u/51968381?v=4') no-repeat left",
        backgroundSize: '38px',
        fontWeight: 500,
      }}
    >Scully's Development</div>
  ),
  head: useHead,
  useNextSeoProps: useNextSeoProps,
  project: {
    link: 'https://scullyy.github.io',
  },
  chat: {
    link: 'https://discord.gg/scully',
  },
  docsRepositoryBase: 'https://github.com/Scullyy/Scullyy.github.io/tree/main',
  footer: {
    text: 'Scully\'s Development',
  },
}

export default config
