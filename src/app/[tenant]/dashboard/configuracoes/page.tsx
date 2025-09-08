'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Building2,
  Palette,
  Upload,
  Save,
  Eye,
  RefreshCw,
  Globe,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
} from 'lucide-react';

interface CompanySettings {
  name: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export default function ConfiguracoesPage() {
  const params = useParams<{ tenant: string }>();
  const router = useRouter();
  const tenant = params?.tenant;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<CompanySettings>({
    name: 'Futura',
    description: 'Empresa inovadora focada em soluções tecnológicas avançadas',
    website: 'https://futura.com.br',
    email: 'contato@futura.com.br',
    phone: '+55 11 99999-9999',
    address: 'São Paulo, SP - Brasil',
    logo: '',
    favicon: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    accentColor: '#10B981',
  });

  useEffect(() => {
    if (!tenant) return;
    (async () => {
      try {
        const res = await fetch(`/api/tenant/${tenant}/settings`, {
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.settings)
            setSettings(prev => ({ ...prev, ...data.settings }));
        } else if (res.status !== 404) {
          console.error('Falha ao carregar configurações:', await res.text());
        }
      } catch (e) {
        console.error('Erro ao carregar configurações:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [tenant]);

  const handleSave = async () => {
    if (!tenant) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/tenant/${tenant}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`(${res.status}) ${msg}`);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar configurações. Verifique o console para detalhes.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof CompanySettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="w-6 h-6 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Configurações da Empresa — {tenant}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {saved && (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Salvo
                </Badge>
              )}
              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {saving ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
                {saved && (
                  <Button
                    onClick={() => router.replace(`/${tenant}/dashboard`)}
                    variant="outline"
                    className="border-green-500 text-green-700 hover:bg-green-50"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Continuar para Dashboard
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna Esquerda */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações da empresa */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                  Informações da Empresa
                </CardTitle>
                <CardDescription>
                  Configure as informações básicas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome da Empresa</Label>
                    <Input
                      id="name"
                      value={settings.name}
                      onChange={e => handleInputChange('name', e.target.value)}
                      placeholder="Nome da empresa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="website"
                        value={settings.website}
                        onChange={e =>
                          handleInputChange('website', e.target.value)
                        }
                        placeholder="https://exemplo.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={settings.description}
                    onChange={e =>
                      handleInputChange('description', e.target.value)
                    }
                    placeholder="Descreva sua empresa..."
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email de Contato</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={e =>
                          handleInputChange('email', e.target.value)
                        }
                        placeholder="contato@empresa.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        value={settings.phone}
                        onChange={e =>
                          handleInputChange('phone', e.target.value)
                        }
                        placeholder="+55 11 99999-9999"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="address"
                      value={settings.address}
                      onChange={e =>
                        handleInputChange('address', e.target.value)
                      }
                      placeholder="Cidade, Estado - País"
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-purple-600" />
                  Cores da Marca
                </CardTitle>
                <CardDescription>Personalize as cores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {(
                    ['primaryColor', 'secondaryColor', 'accentColor'] as const
                  ).map(key => (
                    <div key={key}>
                      <Label htmlFor={key}>
                        {key === 'primaryColor'
                          ? 'Cor Primária'
                          : key === 'secondaryColor'
                            ? 'Cor Secundária'
                            : 'Cor de Destaque'}
                      </Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <input
                          type="color"
                          id={key}
                          value={settings[key]}
                          onChange={e => handleInputChange(key, e.target.value)}
                          className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                        />
                        <Input
                          value={settings[key]}
                          onChange={e => handleInputChange(key, e.target.value)}
                          placeholder={
                            key === 'primaryColor'
                              ? '#3B82F6'
                              : key === 'secondaryColor'
                                ? '#1E40AF'
                                : '#10B981'
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Logo/Favicon (placeholder) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-green-600" />
                  Logo e Favicon
                </CardTitle>
                <CardDescription>Upload do logo e do favicon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Logo da Empresa</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Clique para fazer upload ou arraste
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG ou SVG até 2MB
                    </p>
                    <Button variant="outline" className="mt-3" disabled>
                      Selecionar Arquivo
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Favicon</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Favicon (16x16 ou 32x32)
                    </p>
                    <p className="text-xs text-gray-500">ICO, PNG até 1MB</p>
                    <Button variant="outline" className="mt-3" disabled>
                      Selecionar Arquivo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita – Preview */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-indigo-600" />
                  Pré-visualização
                </CardTitle>
                <CardDescription>Veja como ficará sua marca</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div
                    className="w-16 h-16 mx-auto mb-3 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className="font-bold text-lg"
                    style={{ color: settings.primaryColor }}
                  >
                    {settings.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {settings.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Paleta de Cores</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Primária', c: settings.primaryColor },
                      { label: 'Secundária', c: settings.secondaryColor },
                      { label: 'Destaque', c: settings.accentColor },
                    ].map(({ label, c }) => (
                      <div className="text-center" key={label}>
                        <div
                          className="w-full h-12 rounded-lg border-2 border-gray-200 mb-2"
                          style={{ backgroundColor: c }}
                        />
                        <p className="text-xs text-gray-600">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Botões</h4>
                  <div className="space-y-3">
                    <Button
                      className="w-full"
                      style={{
                        background: `linear-gradient(to right, ${settings.primaryColor}, ${settings.secondaryColor})`,
                      }}
                    >
                      Botão Primário
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      style={{
                        borderColor: settings.primaryColor,
                        color: settings.primaryColor,
                      }}
                    >
                      Botão Secundário
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Informações</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{settings.website}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{settings.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{settings.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{settings.address}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
