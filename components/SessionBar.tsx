'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function SessionBar() {
  const { data: session } = useSession()

  return (
    <div style={{
      background: '#020408',
      borderBottom: '1px solid #00d4ff22',
      padding: '6px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Space Mono, monospace',
      fontSize: '11px',
      color: '#00d4ff',
      letterSpacing: '2px',
    }}>
      <span>NEOPROXY OS // v0.2</span>
      {session ? (
        <span>
          OPERATOR: <strong>{session.user?.name?.toUpperCase()}</strong>
          {' // '}
          ROLE: {((session.user as any)?.role || 'user').toUpperCase()}
          {' '}
          <button onClick={() => signOut()}
            style={{ color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit' }}>
            [LOGOUT]
          </button>
        </span>
      ) : (
        <Link href="/login" style={{ color: '#00d4ff55', textDecoration: 'none' }}>
          OPERATOR: ANONYMOUS // [ACCESO]
        </Link>
      )}
    </div>
  )
}
