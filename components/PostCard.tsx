import Link from 'next/link'
import { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const title = getMetafieldValue(post.metadata?.title) || post.title

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/posts/${post.slug}`} className="block">
        {featuredImage ? (
          <div className="aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={title}
              width={400}
              height={225}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 to-brand-50" />
        )}
        <div className="p-5">
          {category && (
            <span className="mb-2 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              {getMetafieldValue(category.metadata?.name) || category.title}
            </span>
          )}
          <h3 className="text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-brand-600">
            {title}
          </h3>
          {author && (
            <p className="mt-3 text-sm text-gray-500">
              By {getMetafieldValue(author.metadata?.name) || author.title}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}