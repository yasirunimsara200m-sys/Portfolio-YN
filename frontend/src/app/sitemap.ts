import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Exact live domain from Google Search Console
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yasirunimsara-yn.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
