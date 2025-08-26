// Generate SEO-friendly slug from title (no date/time)
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .trim();

    // Create frontmatter
    const now = new Date();
    const frontmatter = `---
author: Auto Blog Generator
pubDatetime: ${now.toISOString()}
title: "${title}"
slug: "${slug}"
featured: false
draft: false
tags:
  - auto-generated
  - ${randomTopic.split(' ')[0]}
description: "Auto-generated blog post about ${randomTopic}"
---

${blogContent}`;

    // Ensure the blog directory exists
    const blogDir = path.join(process.cwd(), 'src', 'data', 'blog', 'auto-generated');
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    // Write the blog post file using slug as filename (no date prefix)
    const fileName = `${slug}.md`;
    const filePath = path.join(blogDir, fileName);