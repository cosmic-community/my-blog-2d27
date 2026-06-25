// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPost } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import { markdownToHtml } from '@/lib/markdown'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const rawContent = getMetafieldValue(post.metadata?.content)
  const contentHtml = markdownToHtml(rawContent)
  const tags = Array.isArray(post.metadata?.tags) ? post.metadata.tags : []

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      {category && (
        <Link
          href={`/categories/${category.slug}`}
          className="mb-4 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
        >
          {getMetafieldValue(category.metadata?.name) || category.title}
        </Link>
      )}

      <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
        {title}
      </h1>

      {author && (
        <div className="mt-6 flex items-center gap-3">
          {author.metadata?.avatar ? (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
              alt={getMetafieldValue(author.metadata?.name) || author.title}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-600">
              {(getMetafieldValue(author.metadata?.name) || author.title).charAt(0).toUpperCase()}
            </div>
          )}
          <Link
            href={`/authors/${author.slug}`}
            className="text-sm font-semibold text-gray-900 hover:text-brand-600"
          >
            {getMetafieldValue(author.metadata?.name) || author.title}
          </Link>
        </div>
      )}

      {featuredImage && (
        <div className="mt-8 overflow-hidden rounded-2xl">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={title}
            width={800}
            height={450}
            className="w-full object-cover"
          />
        </div>
      )}

      {contentHtml && (
        <div
          className="prose prose-lg mt-10 max-w-none prose-headings:font-bold prose-a:text-brand-600"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      )}

      {tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
            >
              #{getMetafieldValue(tag)}
            </span>
          ))}
        </div>
      )}

      <div className="mt-12">
        <Link href="/posts" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}
