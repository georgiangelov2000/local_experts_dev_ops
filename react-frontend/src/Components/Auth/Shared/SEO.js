import { Helmet } from 'react-helmet-async';

/**
 * SEO component for setting meta tags and Open Graph/Twitter tags.
 * @param {Object} props
 * @param {string} props.title - The page title
 * @param {string} props.description - The page description
 * @param {string} props.url - The canonical URL for the page
 * @param {string} props.image - The image URL for social sharing
 * @param {React.ReactNode} [props.children] - Any extra meta tags/scripts
 */
export default function SEO({ title, description, url, image, children }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
      {children}
    </Helmet>
  );
} 