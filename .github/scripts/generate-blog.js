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
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const topics = [
  "Web Development Best Practices",
  "JavaScript Modern Features",
  "CSS Grid and Flexbox",
  "React Performance Optimization",
  "TypeScript Tips and Tricks",
  "Node.js Backend Development",
  "Frontend Testing Strategies",
  "Responsive Web Design",
  "Progressive Web Apps",
  "API Design Principles",
  "Database Optimization",
  "Security in Web Applications",
  "DevOps for Developers",
  "Mobile-First Development",
  "Accessibility in Web Development",
  "Modern CSS Techniques",
  "GraphQL vs REST",
  "Microservices Architecture",
  "Version Control with Git",
  "Performance Monitoring"
];

async function generateBlogPost() {
  try {
    // Pick a random topic
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    console.log(`Generating blog post about: ${randomTopic}`);

    // Generate the blog content using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional technical blog writer. Write engaging, informative blog posts about web development topics. Include practical examples, code snippets when relevant, and actionable insights. Format the content in markdown with proper headings, bullet points, and code blocks where appropriate."
        },
        {
          role: "user",
          content: `Write a comprehensive blog post about "${randomTopic}". The post should be 800-1200 words, include practical examples, and be suitable for developers of all skill levels. Include an engaging introduction, main content sections, and a conclusion with key takeaways.`
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const blogContent = completion.choices[0].message.content;
    
    // Extract title from the generated content or create one
    const lines = blogContent.split('\n');
    let title = lines.find(line => line.startsWith('# '));
    if (title) {
      title = title.replace('# ', '').trim();
    } else {
      title = `A Deep Dive into ${randomTopic}`;
    }

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
  - ${randomTopic.split(' ')[0].toLowerCase()}
description: "Auto-generated blog post about ${randomTopic}"
---

${blogContent}`;

    // Ensure the blog directory exists
    const blogDir = path.join(process.cwd(), '../../src', 'data', 'blog', 'auto-generated');
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    // Write the blog post file using slug as filename (no date prefix)
    const fileName = `${slug}.md`;
    const filePath = path.join(blogDir, fileName);
    
    // Check if file already exists to avoid duplicates
    if (fs.existsSync(filePath)) {
      console.log(`File ${fileName} already exists. Skipping generation.`);
      return;
    }

    fs.writeFileSync(filePath, frontmatter);
    console.log(`Blog post generated successfully: ${fileName}`);
    console.log(`File path: ${filePath}`);

  } catch (error) {
    console.error('Error generating blog post:', error);
    process.exit(1);
  }
}

// Run the function
generateBlogPost();
