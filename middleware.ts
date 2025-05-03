import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define common misspellings and redirects
const redirects = new Map([
  // Misspellings of Bharath
  ["/8harath", "/"],
  ["/bharath", "/"],
  ["/barath", "/"],
  ["/bharat", "/"],

  // Jain University variations
  ["/jain", "/"],
  ["/jain-university", "/"],
  ["/jain-deemed-university", "/"],
  ["/jain-deemed-to-be-university", "/"],

  // Study material variations
  ["/study-material", "/"],
  ["/study-materials", "/"],
  ["/materials", "/"],
  ["/resources", "/"],

  // Legacy paths (example)
  ["/old-resources", "/"],
  ["/legacy-materials", "/"],
  ["/old-site", "/"],
])

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const path = url.pathname.toLowerCase()

  // Check for exact path matches
  if (redirects.has(path)) {
    url.pathname = redirects.get(path) as string
    return NextResponse.redirect(url)
  }

  // Check for partial matches in the path
  for (const [key, value] of redirects.entries()) {
    if (path.includes(key.substring(1))) {
      url.pathname = value
      return NextResponse.redirect(url)
    }
  }

  // Handle search queries in URL
  const searchParams = url.searchParams
  if (searchParams.has("q") || searchParams.has("query") || searchParams.has("search")) {
    const query = searchParams.get("q") || searchParams.get("query") || searchParams.get("search")
    if (query) {
      const lowerQuery = query.toLowerCase()

      // Check if query contains any of our keywords
      if (
        lowerQuery.includes("bharath") ||
        lowerQuery.includes("8harath") ||
        lowerQuery.includes("jain") ||
        lowerQuery.includes("avalon") ||
        lowerQuery.includes("study material")
      ) {
        url.pathname = "/"
        return NextResponse.redirect(url)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
}
