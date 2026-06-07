import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const metadata = {
  title: 'Posts | My Blog',
  description: 'Browse all blog posts',
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-extrabold text-gray-900">All Posts</h1>
      <p className="mb-10 text-gray-600">
        {posts.length} {posts.length === 1 ? 'post' : 'posts'} to explore.
      </p>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}