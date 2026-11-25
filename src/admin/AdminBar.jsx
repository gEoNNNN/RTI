import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { api, getToken, setToken } from './api'
import { isEditMode, setEditMode, useEditMode } from './editMode'
import './admin.css'

export default function AdminBar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const editing = useEditMode()
  const [token, setLocalToken] = useState(getToken())

  useEffect(() => {
    const sync = () => setLocalToken(getToken())
    window.addEventListener('rti-admin-auth', sync)
    return () => window.removeEventListener('rti-admin-auth', sync)
  }, [])

  // Without a session (signed out, or the dev server restarted) edit mode
  // must not stay on — it would keep blocking every link on the site.
  useEffect(() => {
    if (!token && isEditMode()) setEditMode(false)
  }, [token])

  if (!token || pathname.startsWith('/admin')) return null

  const signOut = () => {
    api.logout()
    setToken(null)
    setEditMode(false)
  }

  return createPortal(
    <div className="adm-bar" data-admin-ui>
      {editing ? <span className="adm-bar-hint">Click any text, image or button</span> : null}
      <button
        type="button"
        className={editing ? 'adm-btn adm-btn-primary' : 'adm-btn'}
        onClick={() => setEditMode(!editing)}
      >
        {editing ? 'Done editing' : 'Edit site'}
      </button>
      <button type="button" className="adm-btn" onClick={() => navigate('/admin')}>
        Admin
      </button>
      <button type="button" className="adm-btn adm-btn-ghost" onClick={signOut}>
        Sign out
      </button>
    </div>,
    document.body
  )
}
