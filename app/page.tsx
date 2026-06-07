import Link from 'next/link'
import { getPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])
  const featuredPosts = posts.slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Stories, ideas & creative work
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Welcome to My Blog — a collection of posts from talented authors across
            a range of categories.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/posts"
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Read the blog
            </Link>
            <Link
              href="/categories"
              className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Browse categories
            </Link>
          </div>
        </div>
      </section>

      {/* Latest posts */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
          <Link href="/posts" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            View all →
          </Link>
        </div>
        {featuredPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Explore Categories</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}