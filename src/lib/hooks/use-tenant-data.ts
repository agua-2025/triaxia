import { useState, useEffect } from 'react'
import { useTenant } from '../tenant-context'

export function useTenantUsers() {
  const { tenantId } = useTenant()
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!tenantId) {
      setLoading(false)
      return
    }

    async function fetchUsers() {
      try {
        setLoading(true)
        const response = await fetch(`/api/users?tenantId=${tenantId}`)
        if (!response.ok) throw new Error('Failed to fetch users')
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [tenantId])

  return { users, loading, error }
}

export function useTenantProjects() {
  const { tenantId } = useTenant()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!tenantId) {
      setLoading(false)
      return
    }

    async function fetchProjects() {
      try {
        setLoading(true)
        const response = await fetch(`/api/projects?tenantId=${tenantId}`)
        if (!response.ok) throw new Error('Failed to fetch projects')
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [tenantId])

  return { projects, loading, error }
}