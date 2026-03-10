import rss from '@astrojs/rss';

export async function GET(context) {
  const posts = import.meta.glob('./blog/*.md', { eager: true });
  const items = Object.values(posts).map((post) => ({
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
