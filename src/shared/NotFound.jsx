
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="text-emerald-600 hover:underline">
        Go back to Home
      </Link>
    </div>
  )
}
