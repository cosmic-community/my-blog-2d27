// app/about/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPage, getMetafieldValue } from '@/lib/cosmic'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about')
  return {
    title: page?.title ?? 'About',
    description: `Learn more about this blog.`,
  }
}

export default async function AboutPage() {
  const page = await getPage('about')

  if (!page) {
    notFound()
  }

  const content = getMetafieldValue(page.metadata?.content)
  const heroImage = page.metadata?.hero_image

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Hero image */}
      {heroImage && (
        <div className="mb-10 overflow-hidden rounded-2xl">
          <img
            src={`${heroImage.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
            alt={page.title}
            width={800}
            height={300}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Page title */}
      <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
        {page.title}
      </h1>

      {/* Page content (rich text from Cosmic) */}
      {content && (
        <div
          className="prose prose-lg mt-8 max-w-none prose-headings:font-bold prose-a:text-brand-600"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  )
}
