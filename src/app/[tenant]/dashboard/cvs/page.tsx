'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
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
// Componente select não disponível - usando select nativo
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Star,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Calendar,
  TrendingUp,
  Users,
  FileCheck,
} from 'lucide-react';

interface CV {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  experience: string;
  education: string;
  skills: string[];
  uploadDate: string;
  status: 'novo' | 'analisado' | 'aprovado' | 'rejeitado';
  score: number;
  fileName: string;
  fileSize: string;
}

const mockCVs: CV[] = [
  {
    id: '1',
    candidateName: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '+55 11 99999-1111',
    location: 'São Paulo, SP',
    position: 'Desenvolvedora Frontend',
    experience: '3 anos',
    education: 'Ciência da Computação',
    skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
    uploadDate: '2024-01-15',
    status: 'novo',
    score: 85,
    fileName: 'ana_silva_cv.pdf',
    fileSize: '1.2 MB',
  },
  {
    id: '2',
    candidateName: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    phone: '+55 11 99999-2222',
    location: 'Rio de Janeiro, RJ',
    position: 'Desenvolvedor Backend',
    experience: '5 anos',
    education: 'Engenharia de Software',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
    uploadDate: '2024-01-14',
    status: 'analisado',
    score: 92,
    fileName: 'carlos_santos_cv.pdf',
    fileSize: '980 KB',
  },
  {
    id: '3',
    candidateName: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    phone: '+55 11 99999-3333',
    location: 'Belo Horizonte, MG',
    position: 'UX Designer',
    experience: '4 anos',
    education: 'Design Gráfico',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    uploadDate: '2024-01-13',
    status: 'aprovado',
    score: 88,
    fileName: 'maria_oliveira_cv.pdf',
    fileSize: '1.5 MB',
  },
  {
    id: '4',
    candidateName: 'João Costa',
    email: 'joao.costa@email.com',
    phone: '+55 11 99999-4444',
    location: 'Porto Alegre, RS',
    position: 'DevOps Engineer',
    experience: '6 anos',
    education: 'Sistemas de Informação',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins'],
    uploadDate: '2024-01-12',
    status: 'rejeitado',
    score: 65,
    fileName: 'joao_costa_cv.pdf',
    fileSize: '800 KB',
  },
];

const getStatusColor = (status: CV['status']) => {
  switch (status) {
    case 'novo':
      return 'bg-blue-100 text-blue-800';
    case 'analisado':
      return 'bg-yellow-100 text-yellow-800';
    case 'aprovado':
      return 'bg-green-100 text-green-800';
    case 'rejeitado':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

export default function CVsPage() {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [positionFilter, setPositionFilter] = useState<string>('todas');

  const filteredCVs = mockCVs.filter(cv => {
    const matchesSearch = cv.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cv.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cv.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'todos' || cv.status === statusFilter;
    const matchesPosition = positionFilter === 'todas' || cv.position.toLowerCase().includes(positionFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesPosition;
  });

  const stats = {
    total: mockCVs.length,
    novos: mockCVs.filter(cv => cv.status === 'novo').length,
    analisados: mockCVs.filter(cv => cv.status === 'analisado').length,
    aprovados: mockCVs.filter(cv => cv.status === 'aprovado').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Análise de CVs
          </h1>
          <p className="text-gray-600">
            Gerencie e analise currículos recebidos
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de CVs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Novos</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.novos}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Analisados</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.analisados}</p>
                </div>
                <Eye className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aprovados</p>
                  <p className="text-2xl font-bold text-green-600">{stats.aprovados}</p>
                </div>
                <FileCheck className="w-8 h-8 text-green-600" />
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
                    placeholder="Buscar por nome, cargo ou habilidades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48"
              >
                <option value="todos">Todos os Status</option>
                <option value="novo">Novos</option>
                <option value="analisado">Analisados</option>
                <option value="aprovado">Aprovados</option>
                <option value="rejeitado">Rejeitados</option>
              </select>
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48"
              >
                <option value="todas">Todos os Cargos</option>
                <option value="desenvolvedor">Desenvolvedor</option>
                <option value="designer">Designer</option>
                <option value="devops">DevOps</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* CVs List */}
        <div className="space-y-4">
          {filteredCVs.map((cv) => (
            <Card key={cv.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {cv.candidateName}
                        </h3>
                        <p className="text-gray-600 font-medium">{cv.position}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(cv.status)}>
                          {cv.status.charAt(0).toUpperCase() + cv.status.slice(1)}
                        </Badge>
                        <div className="flex items-center">
                          <Star className={`w-4 h-4 mr-1 ${getScoreColor(cv.score)}`} />
                          <span className={`font-semibold ${getScoreColor(cv.score)}`}>
                            {cv.score}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {cv.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {cv.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {cv.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(cv.uploadDate).toLocaleDateString('pt-BR')}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span className="font-medium">Experiência:</span>
                        <span className="ml-1">{cv.experience}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        <span className="font-medium">Formação:</span>
                        <span className="ml-1">{cv.education}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Habilidades:</p>
                      <div className="flex flex-wrap gap-2">
                        {cv.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <FileText className="w-4 h-4 mr-2" />
                      <span>{cv.fileName} ({cv.fileSize})</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:ml-6">
                    <Button size="sm" className="w-full lg:w-auto">
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button size="sm" variant="outline" className="w-full lg:w-auto">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCVs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum CV encontrado
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