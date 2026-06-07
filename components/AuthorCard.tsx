import Link from 'next/link'
import { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const avatar = author.metadata?.avatar
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {avatar ? (
        <img
          src={`${avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
          alt={name}
          width={64}
          height={64}
          className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-600">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="min-w-0">
        <h3 className="font-bold text-gray-900 transition-colors group-hover:text-brand-600">
          {name}
        </h3>
        {bio && <p className="mt-1 line-clamp-2 text-sm text-gray-500">{bio}</p>}
      </div>
    </Link>
  )
}