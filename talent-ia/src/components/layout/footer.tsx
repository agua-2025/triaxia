import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              TalentIA
            </h3>
            <p className="text-gray-600 text-sm">
              Plataforma de recrutamento inteligente que conecta talentos e empresas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Para Candidatos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
                  Buscar Vagas
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                  Meu Perfil
                </Link>
              </li>
              <li>
                <Link href="/applications" className="text-gray-600 hover:text-gray-900">
                  Minhas Candidaturas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Para Empresas</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/post-job" className="text-gray-600 hover:text-gray-900">
                  Publicar Vaga
                </Link>
              </li>
              <li>
                <Link href="/candidates" className="text-gray-600 hover:text-gray-900">
                  Buscar Candidatos
                </Link>
              </li>
              <li>
                <Link href="/company-profile" className="text-gray-600 hover:text-gray-900">
                  Perfil da Empresa
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-gray-900">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 TalentIA. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}