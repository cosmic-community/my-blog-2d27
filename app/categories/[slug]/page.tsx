// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategory, getPostsByCategory } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-lg">
          🏷️
        </span>
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900">{name}</h1>
        {description && <p className="mt-2 text-gray-600">{description}</p>}
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className="mt-12">
        <Link href="/categories" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
          ← Back to categories
        </Link>
      </div>
    </div>
  )
}