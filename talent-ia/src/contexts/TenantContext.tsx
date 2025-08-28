'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

// Tipos
interface Tenant {
  id: string
  slug: string
  name: string
  subdomain: string
  customDomain?: string
  primaryColor: string
  secondaryColor: string
  logo?: string
  favicon?: string
  status: 'ACTIVE' | 'SUSPENDED' | 'TRIAL'
}

interface TenantContextType {
  tenant: Tenant | null
  isLoading: boolean
  branding: {
    primaryColor: string
    secondaryColor: string
    logo?: string
    favicon?: string
  }
}

// Context
const TenantContext = createContext<TenantContextType | undefined>(undefined)

// Provider
export function TenantProvider({ 
  children, 
  slug 
}: { 
  children: React.ReactNode
  slug?: string 
}) {
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchTenant(slug)
    } else {
      setIsLoading(false)
    }
  }, [slug])

  const fetchTenant = async (slug: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/tenant/${slug}`)
      
      if (!response.ok) {
        throw new Error('Tenant não encontrado')
      }
      
      const tenantData = await response.json()
      setTenant(tenantData)
    } catch (error) {
      console.error('Erro ao carregar tenant:', error)
      setTenant(null)
    } finally {
      setIsLoading(false)
    }
  }

  const branding = {
    primaryColor: tenant?.primaryColor || '#3B82F6',
    secondaryColor: tenant?.secondaryColor || '#1E40AF',
    logo: tenant?.logo,
    favicon: tenant?.favicon
  }

  return (
    <TenantContext.Provider value={{ tenant, isLoading, branding }}>
      {children}
    </TenantContext.Provider>
  )
}

// Hook
export function useTenant() {
  const context = useContext(TenantContext)
  if (context === undefined) {
    throw new Error('useTenant deve ser usado dentro de um TenantProvider')
  }
  return context
}

// Hook para verificar se estamos em um contexto de tenant
export function useIsTenantContext() {
  const { tenant } = useTenant()
  return !!tenant
}

// Hook para aplicar branding
export function useBranding() {
  const { branding } = useTenant()
  
  useEffect(() => {
    // Aplicar cores CSS customizadas
    const root = document.documentElement
    root.style.setProperty('--primary-color', branding.primaryColor)
    root.style.setProperty('--secondary-color', branding.secondaryColor)
    
    // Aplicar favicon se disponível
    if (branding.favicon) {
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
      if (favicon) {
        favicon.href = branding.favicon
      }
    }
  }, [branding])
  
  return branding
}