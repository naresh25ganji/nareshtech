import rss from '@astrojs/rss';
import { glob } from 'astro/loaders';

export async function GET(context) {
  const posts = import.meta.glob('./blog/*.md', { eager: true });
  const items = Object.values(posts).map((post: any) => ({
    title: post.frontmatter.title,
    pubDate: post.frontmatter.pubDate,
    description: post.frontmatter.description,
    link: post.url,
  }));

  return rss({
    title: 'NareshTech Blog',
    description: 'Tech & AI insights, tutorials, and tools by Naresh.',
    site: context.site,
    items,
  });
}
