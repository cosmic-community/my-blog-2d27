# My Blog

![App Preview](https://imgix.cosmicjs.com/531eda50-622c-11f1-ac86-a9b6c7f3b674-autopilot-photo-1526772662000-3f88f10405ff-1780807793576.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, responsive blog and creative portfolio built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). Browse posts, authors, and categories with a clean, content-first reading experience.

## Features

- 📝 **Posts** — Full blog posts with featured images, rich content, and tags
- 👤 **Authors** — Dedicated author pages with avatars, bios, and their posts
- 🏷️ **Categories** — Browse posts grouped by category
- 🎨 **Modern Design** — Responsive, accessible UI built with Tailwind CSS
- ⚡ **Server Components** — Fast data fetching with Next.js App Router
- 🔍 **SEO-friendly** — Per-page metadata and optimized images via imgix

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6a24f83310572de5839e0996&clone_repository=6a24f90310572de5839e09bb)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic SDK](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account and bucket

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set your environment variables (these are provided automatically when cloning in Cosmic):

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with connected authors & categories
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .depth(1)
```

## Cosmic CMS Integration

This application uses the [Cosmic SDK](https://www.cosmicjs.com/docs) to fetch content from your bucket. The following object types power the app:

- **authors** — name, bio, avatar, email
- **categories** — name, description
- **posts** — title, content, featured_image, tags, author, category

Connected objects (author and category on each post) are fetched using the `depth` parameter for a single efficient query.

## Deployment Options

### Vercel (Recommended)

1. Push your code to a Git repository
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy

### Netlify

1. Connect your repository to [Netlify](https://netlify.com)
2. Set build command to `bun run build`
3. Add environment variables
4. Deploy

<!-- README_END -->