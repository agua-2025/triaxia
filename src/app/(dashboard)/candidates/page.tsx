"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Download,
  Users,
  UserCheck,
  TrendingUp,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Loading } from "@/components/ui/loading";
import { EmptyState } from "@/components/ui/empty-state";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/ui/stats-card";
import { Candidate, CandidateStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

interface CandidatesResponse {
  success: boolean;
  data: Candidate[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface CandidateStats {
  total: number;
  disponivel: number;
  contratado: number;
  inativo: number;
  averageScore: number;
}

const statusColors: Record<CandidateStatus, string> = {
  disponivel: "bg-green-100 text-green-800",
  em_processo: "bg-blue-100 text-blue-800",
  contratado: "bg-purple-100 text-purple-800",
  inativo: "bg-gray-100 text-gray-800",
};

const statusLabels: Record<CandidateStatus, string> = {
  disponivel: "Disponível",
  em_processo: "Em Processo",
  contratado: "Contratado",
  inativo: "Inativo",
};

export default function CandidatesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [stats, setStats] = useState<CandidateStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CandidateStatus | "">("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  /// Definir colunas da tabela
  const columns: ColumnDef<Candidate>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-sm text-gray-500">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Localização",
      cell: ({ row }) => row.original.location || "-",
    },
    {
      accessorKey: "experience",
      header: "Experiência",
      cell: ({ row }) => `${row.original.experience} anos`,
    },
    {
      accessorKey: "skills",
      header: "Principais Skills",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {row.original.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{row.original.skills.length - 3}
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "overallScore",
      header: "Score IA",
      cell: ({ row }) => {
        const score = row.original.overallScore;
        if (!score) return "-";

        const color =
          score >= 80
            ? "text-green-600"
            : score >= 60
            ? "text-yellow-600"
            : "text-red-600";
        return <span className={`font-medium ${color}`}>{score}%</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className={statusColors[row.original.status as CandidateStatus]}>
          {statusLabels[row.original.status as CandidateStatus]}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Cadastrado em",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString("pt-BR"),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/candidates/${row.original.id}`)}
        >
          Ver Detalhes
        </Button>
      ),
    },
  ];

  // Buscar candidatos
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
      });

      const response = await fetch(`/api/candidates?${params}`);
      const data: CandidatesResponse = await response.json();

      if (data.success) {
        setCandidates(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  // Buscar estatísticas
  const fetchStats = async () => {
    try {
      const response = await fetch("/api/candidates/stats");
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Efeitos
  useEffect(() => {
    if (status === "authenticated") {
      fetchCandidates();
      fetchStats();
    }
  }, [status, pagination.page, searchTerm, statusFilter]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // Handlers
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleStatusFilter = (status: CandidateStatus | "") => {
    setStatusFilter(status);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleExport = async () => {
    try {
      const response = await fetch("/api/candidates/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `candidatos-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting candidates:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <DashboardLayout>
        <Loading text="Carregando candidatos..." />
      </DashboardLayout>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Candidatos</h1>
            <p className="text-muted-foreground">
              Gerencie e analise candidatos com inteligência artificial
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button onClick={() => router.push("/candidates/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Candidato
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        {stats && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <StatsCard
              title="Total de Candidatos"
              value={stats.total.toString()}
              icon={Users}
            />
            <StatsCard
              title="Disponíveis"
              value={stats.disponivel.toString()}
              description="Candidatos ativos"
              icon={Users}
            />
            <StatsCard
              title="Contratados"
              value={stats.contratado.toString()}
              description="Sucesso nas contratações"
              icon={UserCheck}
            />
            <StatsCard
              title="Score Médio IA"
              value={`${stats.averageScore.toFixed(1)}%`}
              description="Qualidade dos candidatos"
              icon={TrendingUp}
            />
            <StatsCard
              title="Inativos"
              value={stats.inativo.toString()}
              description="Candidatos arquivados"
              icon={UserX}
            />
          </div>
        )}

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Use os filtros abaixo para encontrar candidatos específicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nome, email ou localização..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    handleStatusFilter(e.target.value as CandidateStatus | "")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos os status</option>
                  <option value="disponivel">Disponível</option>
                  <option value="em_processo">Em Processo</option>
                  <option value="contratado">Contratado</option>

                  <option value="inativo">Inativo</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Candidatos */}
        {candidates.length > 0 ? (
          <Card>
            <CardContent className="p-0">
              <DataTable
                columns={columns}
                data={candidates}
                searchKey="name"
                searchPlaceholder="Buscar candidatos..."
              />
            </CardContent>
          </Card>
        ) : (
          <EmptyState
            icon={Users}
            title="Nenhum candidato encontrado"
            description="Comece adicionando seu primeiro candidato ao sistema."
            action={{
              label: "Adicionar Candidato",
              onClick: () => router.push("/candidates/new"),
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
