import Head from 'next/head';
import React from 'react';

const Meta = ({
  title = 'Best Barber Shop',
  description = 'Rolex Barber Shop | Best Barber Shop',
  image = 'https://dress-shop.vercel.app/featured.png',
}) => {
  const siteTitle = `Rolex Barber Shop | ${title}`;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />

      {/* <!-- Twitter Card data --> */}
      <meta name="twitter:card" content={description} />
      <meta name="twitter:site" content="@rolexbarbershop" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* <!-- Open Graph data --> */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
};

export default Meta;