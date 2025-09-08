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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Users,
  UserPlus,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit,
  Trash2,
  Crown,
  User,
  Settings,
  Activity,
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'recruiter' | 'manager' | 'viewer';
  department: string;
  joinDate: string;
  lastActive: string;
  status: 'ativo' | 'inativo' | 'pendente';
  avatar?: string;
  permissions: string[];
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    phone: '+55 11 99999-1111',
    role: 'admin',
    department: 'Tecnologia',
    joinDate: '2023-01-15',
    lastActive: '2024-01-15T10:30:00',
    status: 'ativo',
    permissions: ['all'],
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    phone: '+55 11 99999-2222',
    role: 'recruiter',
    department: 'Recursos Humanos',
    joinDate: '2023-03-20',
    lastActive: '2024-01-15T09:15:00',
    status: 'ativo',
    permissions: ['manage_jobs', 'view_candidates', 'manage_interviews'],
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@empresa.com',
    phone: '+55 11 99999-3333',
    role: 'manager',
    department: 'Vendas',
    joinDate: '2023-06-10',
    lastActive: '2024-01-14T16:45:00',
    status: 'ativo',
    permissions: ['view_analytics', 'manage_team'],
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@empresa.com',
    phone: '+55 11 99999-4444',
    role: 'viewer',
    department: 'Marketing',
    joinDate: '2023-09-05',
    lastActive: '2024-01-13T14:20:00',
    status: 'inativo',
    permissions: ['view_jobs', 'view_candidates'],
  },
  {
    id: '5',
    name: 'Pedro Almeida',
    email: 'pedro.almeida@empresa.com',
    phone: '+55 11 99999-5555',
    role: 'recruiter',
    department: 'Recursos Humanos',
    joinDate: '2023-11-12',
    lastActive: '2024-01-12T11:30:00',
    status: 'pendente',
    permissions: ['manage_jobs', 'view_candidates'],
  },
];

const getRoleColor = (role: TeamMember['role']) => {
  switch (role) {
    case 'admin':
      return 'bg-purple-100 text-purple-800';
    case 'recruiter':
      return 'bg-blue-100 text-blue-800';
    case 'manager':
      return 'bg-green-100 text-green-800';
    case 'viewer':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: TeamMember['status']) => {
  switch (status) {
    case 'ativo':
      return 'bg-green-100 text-green-800';
    case 'inativo':
      return 'bg-red-100 text-red-800';
    case 'pendente':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getRoleIcon = (role: TeamMember['role']) => {
  switch (role) {
    case 'admin':
      return <Crown className="w-4 h-4" />;
    case 'recruiter':
      return <Users className="w-4 h-4" />;
    case 'manager':
      return <Shield className="w-4 h-4" />;
    case 'viewer':
      return <User className="w-4 h-4" />;
    default:
      return <User className="w-4 h-4" />;
  }
};

const formatLastActive = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Agora mesmo';
  if (diffInHours < 24) return `${diffInHours}h atrás`;
  if (diffInHours < 48) return 'Ontem';
  return `${Math.floor(diffInHours / 24)} dias atrás`;
};

export default function EquipePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('todos');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'todos' || member.role === roleFilter;
    const matchesStatus = statusFilter === 'todos' || member.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: mockTeamMembers.length,
    ativos: mockTeamMembers.filter(m => m.status === 'ativo').length,
    pendentes: mockTeamMembers.filter(m => m.status === 'pendente').length,
    admins: mockTeamMembers.filter(m => m.role === 'admin').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gerenciar Equipe
            </h1>
            <p className="text-gray-600">
              Gerencie membros da equipe e suas permissões
            </p>
          </div>
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 sm:mt-0">
                <UserPlus className="w-4 h-4 mr-2" />
                Adicionar Membro
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Membro</DialogTitle>
                <DialogDescription>
                  Convide um novo membro para sua equipe
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Digite o nome completo" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@empresa.com" />
                </div>
                <div>
                  <Label htmlFor="role">Função</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="recruiter">Recrutador</SelectItem>
                      <SelectItem value="manager">Gerente</SelectItem>
                      <SelectItem value="viewer">Visualizador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Departamento</Label>
                  <Input id="department" placeholder="Ex: Recursos Humanos" />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsAddMemberOpen(false)}>
                    Enviar Convite
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
                  <p className="text-sm font-medium text-gray-600">Total de Membros</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Membros Ativos</p>
                  <p className="text-2xl font-bold text-green-600">{stats.ativos}</p>
                </div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendentes</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendentes}</p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Administradores</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.admins}</p>
                </div>
                <Crown className="w-8 h-8 text-purple-600" />
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
                    placeholder="Buscar por nome, email ou departamento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48"
              >
                <option value="todos">Todas as Funções</option>
                <option value="admin">Administrador</option>
                <option value="recruiter">Recrutador</option>
                <option value="manager">Gerente</option>
                <option value="viewer">Visualizador</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48"
              >
                <option value="todos">Todos os Status</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                  <option value="pendente">Pendente</option>
               </select>
            </div>
          </CardContent>
        </Card>

        {/* Team Members List */}
        <div className="space-y-4">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                          {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {member.name}
                          </h3>
                          <p className="text-gray-600">{member.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getRoleColor(member.role)}>
                          <span className="mr-1">{getRoleIcon(member.role)}</span>
                          {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                        </Badge>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {member.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {member.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Desde {new Date(member.joinDate).toLocaleDateString('pt-BR')}
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Activity className="w-4 h-4 mr-2" />
                      <span>Último acesso: {formatLastActive(member.lastActive)}</span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Permissões:</p>
                      <div className="flex flex-wrap gap-2">
                        {member.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission === 'all' ? 'Todas as permissões' : permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:ml-6">
                    <Button size="sm" variant="outline" className="w-full lg:w-auto">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button size="sm" variant="outline" className="w-full lg:w-auto">
                      <Settings className="w-4 h-4 mr-2" />
                      Permissões
                    </Button>
                    {member.role !== 'admin' && (
                      <Button size="sm" variant="destructive" className="w-full lg:w-auto">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remover
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum membro encontrado
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