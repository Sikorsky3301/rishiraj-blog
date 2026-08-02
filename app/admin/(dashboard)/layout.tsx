import LogoutButton from '@/components/admin/LogoutButton'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell wrapper page-content">
      <nav className="admin-nav">
        <a className="admin-nav-link" href="/admin">Dashboard</a>
        <a className="admin-nav-link" href="/admin/posts/new">New Post</a>
        <a className="admin-nav-link" href="/admin/finds/new">New Find</a>
        <LogoutButton />
      </nav>
      <div className="admin-content">{children}</div>
    </div>
  )
}
