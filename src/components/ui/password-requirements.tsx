'use client';

import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { PASSWORD_REQUIREMENTS, validatePasswordSecurity } from '@/lib/auth/password-security';

interface PasswordRequirementsProps {
  password: string;
  userInfo?: {
    email?: string;
    name?: string;
    company?: string;
  };
  className?: string;
}

export function PasswordRequirements({ password, userInfo, className = '' }: PasswordRequirementsProps) {
  const [validation, setValidation] = useState({
    isValid: false,
    score: 0,
    errors: [] as string[],
    warnings: [] as string[],
    suggestions: [] as string[]
  });

  useEffect(() => {
    if (password) {
      const result = validatePasswordSecurity(password, userInfo);
      setValidation(result);
    } else {
      setValidation({
        isValid: false,
        score: 0,
        errors: PASSWORD_REQUIREMENTS.map(req => req.label),
        warnings: [],
        suggestions: []
      });
    }
  }, [password, userInfo]);

  const getRequirementStatus = (requirementLabel: string) => {
    return !validation.errors.includes(requirementLabel);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Muito Forte';
    if (score >= 60) return 'Forte';
    if (score >= 40) return 'Média';
    return 'Fraca';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {password && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Força da Senha:</span>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  validation.score >= 80 ? 'bg-green-500' :
                  validation.score >= 60 ? 'bg-yellow-500' :
                  validation.score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${validation.score}%` }}
              />
            </div>
            <span className={`text-sm font-medium ${getScoreColor(validation.score)}`}>
              {getScoreLabel(validation.score)}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Requisitos da Senha:</h4>
        <div className="space-y-1">
          {PASSWORD_REQUIREMENTS.map((requirement) => {
            const isValid = getRequirementStatus(requirement.label);
            return (
              <div key={requirement.id} className="flex items-center space-x-2">
                <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                  isValid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {isValid ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                </div>
                <span className={`text-sm ${
                  isValid ? 'text-green-700' : 'text-red-700'
                }`}>
                  {requirement.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {validation.warnings.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-yellow-700">Avisos:</h4>
          <div className="space-y-1">
            {validation.warnings.map((warning, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mt-0.5">
                  <span className="text-xs">!</span>
                </div>
                <span className="text-sm text-yellow-700">{warning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {validation.suggestions.length > 0 && password && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-blue-700">Sugestões:</h4>
          <div className="space-y-1">
            {validation.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5">
                  <span className="text-xs">💡</span>
                </div>
                <span className="text-sm text-blue-700">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}