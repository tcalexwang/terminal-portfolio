import React from "react";
import { Helmet } from "react-helmet-async";

type SEOProps = {
  title?: string;
  description?: string;
  section?: string;
};

const defaultDescription =
  "Alex Wang's terminal-style portfolio - Software Engineer specializing in web development and creative technology.";
const defaultTitle = "Alex Wang | Software Engineer";

export default function SEO({ title, description, section }: SEOProps) {
  const siteTitle =
    title || (section ? `${section} | Alex Wang` : defaultTitle);
  const siteDescription = description || defaultDescription;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:site_name" content="Alex Wang Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />

      {/* Additional SEO meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Alex Wang" />
      <meta
        name="keywords"
        content="Alex Wang, Software Engineer, Web Development, React, TypeScript, Creative Technology, Terminal Portfolio"
      />

      {/* Canonical URL */}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
}
