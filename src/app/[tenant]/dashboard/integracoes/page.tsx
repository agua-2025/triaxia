'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Plug,
  Search,
  Settings,
  CheckCircle,
  XCircle,
  Plus,
  ExternalLink,
  Zap,
  Globe,
  Mail,
  MessageSquare,
  Calendar,
  FileText,
  Users,
  BarChart3,
  Shield,
  Clock,
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'ats' | 'communication' | 'analytics' | 'calendar' | 'social' | 'crm' | 'other';
  provider: string;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  icon: React.ReactNode;
  features: string[];
  lastSync?: string;
  isPopular?: boolean;
  isPremium?: boolean;
}

const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'LinkedIn Recruiter',
    description: 'Importe candidatos e publique vagas diretamente no LinkedIn',
    category: 'social',
    provider: 'LinkedIn',
    status: 'connected',
    icon: <Users className="w-6 h-6 text-blue-600" />,
    features: ['Importar candidatos', 'Publicar vagas', 'Busca avançada'],
    lastSync: '2024-01-15T10:30:00',
    isPopular: true,
  },
  {
    id: '2',
    name: 'Google Calendar',
    description: 'Sincronize entrevistas e eventos com o Google Calendar',
    category: 'calendar',
    provider: 'Google',
    status: 'connected',
    icon: <Calendar className="w-6 h-6 text-green-600" />,
    features: ['Agendamento automático', 'Lembretes', 'Convites'],
    lastSync: '2024-01-15T09:15:00',
  },
  {
    id: '3',
    name: 'Slack',
    description: 'Receba notificações e atualizações no Slack',
    category: 'communication',
    provider: 'Slack',
    status: 'disconnected',
    icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
    features: ['Notificações', 'Comandos', 'Relatórios'],
    isPopular: true,
  },
  {
    id: '4',
    name: 'Microsoft Teams',
    description: 'Integração com Microsoft Teams para comunicação',
    category: 'communication',
    provider: 'Microsoft',
    status: 'error',
    icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
    features: ['Videochamadas', 'Chat', 'Compartilhamento'],
    lastSync: '2024-01-14T16:45:00',
  },
  {
    id: '5',
    name: 'Workday HCM',
    description: 'Sincronize dados com o sistema Workday HCM',
    category: 'ats',
    provider: 'Workday',
    status: 'pending',
    icon: <FileText className="w-6 h-6 text-orange-600" />,
    features: ['Sincronização de dados', 'Relatórios', 'Workflows'],
    isPremium: true,
  },
  {
    id: '6',
    name: 'Salesforce',
    description: 'Integração com CRM Salesforce para gestão de leads',
    category: 'crm',
    provider: 'Salesforce',
    status: 'disconnected',
    icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
    features: ['Gestão de leads', 'Pipeline', 'Relatórios'],
    isPremium: true,
  },
  {
    id: '7',
    name: 'Zapier',
    description: 'Conecte com mais de 5000 aplicativos via Zapier',
    category: 'other',
    provider: 'Zapier',
    status: 'connected',
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    features: ['Automações', 'Workflows', 'Triggers'],
    lastSync: '2024-01-15T08:00:00',
    isPopular: true,
  },
  {
    id: '8',
    name: 'Indeed',
    description: 'Publique vagas automaticamente no Indeed',
    category: 'social',
    provider: 'Indeed',
    status: 'disconnected',
    icon: <Globe className="w-6 h-6 text-blue-700" />,
    features: ['Publicação de vagas', 'Candidatos', 'Analytics'],
  },
];

const getStatusColor = (status: Integration['status']) => {
  switch (status) {
    case 'connected':
      return 'bg-green-100 text-green-800';
    case 'disconnected':
      return 'bg-gray-100 text-gray-800';
    case 'error':
      return 'bg-red-100 text-red-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: Integration['status']) => {
  switch (status) {
    case 'connected':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'disconnected':
      return <XCircle className="w-4 h-4 text-gray-600" />;
    case 'error':
      return <XCircle className="w-4 h-4 text-red-600" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-600" />;
    default:
      return <XCircle className="w-4 h-4 text-gray-600" />;
  }
};

const getCategoryName = (category: Integration['category']) => {
  switch (category) {
    case 'ats':
      return 'ATS';
    case 'communication':
      return 'Comunicação';
    case 'analytics':
      return 'Analytics';
    case 'calendar':
      return 'Calendário';
    case 'social':
      return 'Redes Sociais';
    case 'crm':
      return 'CRM';
    case 'other':
      return 'Outros';
    default:
      return 'Outros';
  }
};

const formatLastSync = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Agora mesmo';
  if (diffInHours < 24) return `${diffInHours}h atrás`;
  if (diffInHours < 48) return 'Ontem';
  return `${Math.floor(diffInHours / 24)} dias atrás`;
};

export default function IntegracoesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [isAddIntegrationOpen, setIsAddIntegrationOpen] = useState(false);

  const filteredIntegrations = mockIntegrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'todas' || integration.category === categoryFilter;
    const matchesStatus = statusFilter === 'todos' || integration.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: mockIntegrations.length,
    connected: mockIntegrations.filter(i => i.status === 'connected').length,
    pending: mockIntegrations.filter(i => i.status === 'pending').length,
    errors: mockIntegrations.filter(i => i.status === 'error').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Integrações
            </h1>
            <p className="text-gray-600">
              Conecte suas ferramentas favoritas para automatizar processos
            </p>
          </div>
          <Dialog open={isAddIntegrationOpen} onOpenChange={setIsAddIntegrationOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 sm:mt-0">
                <Plus className="w-4 h-4 mr-2" />
                Nova Integração
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Solicitar Nova Integração</DialogTitle>
                <DialogDescription>
                  Não encontrou a integração que precisa? Solicite uma nova!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="integration-name">Nome da Ferramenta</Label>
                  <Input id="integration-name" placeholder="Ex: HubSpot, Greenhouse..." />
                </div>
                <div>
                  <Label htmlFor="integration-url">Website/URL</Label>
                  <Input id="integration-url" placeholder="https://exemplo.com" />
                </div>
                <div>
                  <Label htmlFor="integration-description">Descrição do Uso</Label>
                  <Input id="integration-description" placeholder="Como você usaria esta integração?" />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddIntegrationOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsAddIntegrationOpen(false)}>
                    Enviar Solicitação
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Plug className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conectadas</p>
                  <p className="text-2xl font-bold text-green-600">{stats.connected}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendentes</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Com Erro</p>
                  <p className="text-2xl font-bold text-red-600">{stats.errors}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar integrações..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todas">Todas as Categorias</option>
                <option value="ats">ATS</option>
                <option value="communication">Comunicação</option>
                <option value="analytics">Analytics</option>
                <option value="calendar">Calendário</option>
                <option value="social">Redes Sociais</option>
                <option value="crm">CRM</option>
                <option value="other">Outros</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos os Status</option>
                <option value="connected">Conectadas</option>
                <option value="disconnected">Desconectadas</option>
                <option value="error">Com Erro</option>
                <option value="pending">Pendentes</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-50 rounded-lg mr-3">
                      {integration.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {integration.name}
                        {integration.isPopular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                        {integration.isPremium && (
                          <Badge className="text-xs bg-gradient-to-r from-purple-500 to-pink-500">
                            <Shield className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{integration.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(integration.status)}
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status === 'connected' ? 'Conectada' :
                       integration.status === 'disconnected' ? 'Desconectada' :
                       integration.status === 'error' ? 'Erro' : 'Pendente'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {integration.description}
                </CardDescription>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Categoria:</p>
                  <Badge variant="outline">{getCategoryName(integration.category)}</Badge>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Recursos:</p>
                  <div className="flex flex-wrap gap-1">
                    {integration.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {integration.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{integration.features.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {integration.lastSync && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500">
                      Última sincronização: {formatLastSync(integration.lastSync)}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  {integration.status === 'connected' ? (
                    <>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar
                      </Button>
                      <Button size="sm" variant="destructive" className="flex-1">
                        Desconectar
                      </Button>
                    </>
                  ) : integration.status === 'error' ? (
                    <>
                      <Button size="sm" className="flex-1">
                        Reconectar
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </>
                  ) : integration.status === 'pending' ? (
                    <Button size="sm" disabled className="flex-1">
                      Aguardando...
                    </Button>
                  ) : (
                    <>
                      <Button size="sm" className="flex-1">
                        Conectar
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Plug className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma integração encontrada
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou termos de busca.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}