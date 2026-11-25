import { useEffect, useState } from 'react'

const KEY = 'rti-admin-edit'
const EVENT = 'rti-admin-edit-changed'

export function isEditMode() {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function setEditMode(on) {
  localStorage.setItem(KEY, on ? '1' : '0')
  document.body.classList.toggle('admin-edit', Boolean(on))
  window.dispatchEvent(new Event(EVENT))
}

export function useEditMode() {
  const [on, setOn] = useState(isEditMode)

  useEffect(() => {
    const update = () => setOn(isEditMode())
    window.addEventListener(EVENT, update)
    return () => window.removeEventListener(EVENT, update)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('admin-edit', on)
    return () => document.body.classList.toggle('admin-edit', false)
  }, [on])

  return on
}
