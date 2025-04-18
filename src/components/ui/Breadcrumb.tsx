'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

const Breadcrumb = () => {
  const pathname = usePathname()
  const pathParts = pathname.split('/').filter(part => part)

  const crumbs = pathParts.map((part, index) => {
    const href = '/' + pathParts.slice(0, index + 1).join('/')
    const label = part.charAt(0).toUpperCase() + part.slice(1)

    return { href, label }
  })

  return (
    <nav className="flex items-center text-sm text-gray-500 space-x-1">
      <Link href="/" className="hover:text-black">Home</Link>
      {crumbs.map((crumb, index) => (
        <Fragment key={crumb.href}>
          <span>/</span>
          <Link
            href={crumb.href}
            className={`hover:text-black ${index === crumbs.length - 1 ? 'text-black font-medium' : ''}`}
          >
            {crumb.label}
          </Link>
        </Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumb
