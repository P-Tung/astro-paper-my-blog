const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate the blog content using Gemini
    const prompt = `Write a comprehensive blog post about "${randomTopic}". The post should be 800-1200 words, include practical examples, and be suitable for developers of all skill levels. Include an engaging introduction, main content sections, and a conclusion with key takeaways. Format the content in markdown with proper headings, bullet points, and code blocks where appropriate. Start with a clear title using # heading.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const blogContent = response.text();

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