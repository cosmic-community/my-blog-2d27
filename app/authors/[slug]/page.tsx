// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAuthor, getPostsByAuthor } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const email = getMetafieldValue(author.metadata?.email)
  const avatar = author.metadata?.avatar

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-12 flex flex-col items-center text-center">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
            alt={name}
            width={120}
            height={120}
            className="h-28 w-28 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-brand-100 text-3xl font-bold text-brand-600">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">{name}</h1>
        {bio && <p className="mt-3 max-w-2xl text-gray-600">{bio}</p>}
        {email && (
          <a
            href={`mailto:${email}`}
            className="mt-4 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            {email}
          </a>
        )}
      </div>

      <h2 className="mb-8 text-2xl font-bold text-gray-900">
        Posts by {name}
      </h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts by this author yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className="mt-12">
        <Link href="/authors" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
          ← Back to authors
        </Link>
      </div>
    </div>
  )
}