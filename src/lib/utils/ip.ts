// src/lib/utils/ip.ts
import { NextRequest } from 'next/server'

/**
 * Extrai o endereço IP do cliente de uma requisição Next.js
 * @param request - Objeto NextRequest
 * @returns Endereço IP do cliente ou 'unknown' se não encontrado
 */
export function getClientIP(request: NextRequest): string {
  // Verificar headers de proxy/load balancer primeiro
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    // x-forwarded-for pode conter múltiplos IPs separados por vírgula
    // O primeiro é geralmente o IP original do cliente
    return forwardedFor.split(',')[0].trim()
  }

  // Verificar outros headers comuns
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }

  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
  if (cfConnectingIP) {
    return cfConnectingIP.trim()
  }

  const xClientIP = request.headers.get('x-client-ip')
  if (xClientIP) {
    return xClientIP.trim()
  }

  // Fallback para IP da conexão (pode ser do proxy)
  const remoteAddr = request.headers.get('x-forwarded-host') || 
                    request.headers.get('host') ||
                    'unknown'

  return remoteAddr
}

/**
 * Valida se um endereço IP é válido (IPv4 ou IPv6)
 * @param ip - Endereço IP para validar
 * @returns true se o IP for válido
 */
export function isValidIP(ip: string): boolean {
  // Regex para IPv4
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  
  // Regex para IPv6 (simplificada)
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip)
}

/**
 * Anonimiza um endereço IP para logs (remove os últimos octetos)
 * @param ip - Endereço IP para anonimizar
 * @returns IP anonimizado
 */
export function anonymizeIP(ip: string): string {
  if (!isValidIP(ip)) {
    return 'unknown'
  }

  // Para IPv4, remover o último octeto
  if (ip.includes('.')) {
    const parts = ip.split('.')
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`
    }
  }

  // Para IPv6, remover os últimos grupos
  if (ip.includes(':')) {
    const parts = ip.split(':')
    if (parts.length >= 4) {
      return `${parts.slice(0, 4).join(':')}:xxxx:xxxx:xxxx:xxxx`
    }
  }

  return 'xxx.xxx.xxx.xxx'
}

/**
 * Verifica se um IP está em uma lista de IPs permitidos
 * @param ip - IP para verificar
 * @param allowedIPs - Lista de IPs ou ranges permitidos
 * @returns true se o IP estiver permitido
 */
export function isIPAllowed(ip: string, allowedIPs: string[]): boolean {
  if (!isValidIP(ip)) {
    return false
  }

  return allowedIPs.some(allowedIP => {
    // Verificação exata
    if (allowedIP === ip) {
      return true
    }

    // Verificação de range CIDR (implementação básica)
    if (allowedIP.includes('/')) {
      // Para implementação completa de CIDR, seria necessária uma biblioteca específica
      // Por enquanto, apenas verificação de prefixo
      const [network] = allowedIP.split('/')
      return ip.startsWith(network.substring(0, network.lastIndexOf('.')))
    }

    return false
  })
}