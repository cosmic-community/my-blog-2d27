import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const metadata = {
  title: 'Authors | My Blog',
  description: 'Meet the writers behind My Blog',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-extrabold text-gray-900">Authors</h1>
      <p className="mb-10 text-gray-600">Meet the writers behind the stories.</p>
      {authors.length === 0 ? (
        <p className="text-gray-500">No authors found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      )}
    </div>
  )
}