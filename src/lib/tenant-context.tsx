'use client'

import { createContext, useContext, ReactNode } from 'react'

interface TenantContextType {
  tenantId: string | null
  tenantSlug: string | null
  isLoading: boolean
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

export function TenantProvider({ 
  children, 
  tenantId, 
  tenantSlug 
}: { 
  children: ReactNode
  tenantId: string | null
  tenantSlug: string | null
}) {
  return (
    <TenantContext.Provider value={{ 
      tenantId, 
      tenantSlug, 
      isLoading: false 
    }}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return context
}