import React from 'react';

export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface CodeIssue {
  line?: number;
  severity: Severity;
  description: string;
  suggestion: string;
}

export interface AnalysisResult {
  summary: string;
  language: string;
  score: number; // 0 to 100
  issues: CodeIssue[];
  refactoredSnippet?: string;
}

export interface Plan {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}

export interface BlogPost {
  id: number;
  image: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content: React.ReactNode;
}

export interface ProductOffer {
  category: string; // New field for grouping
  name: string;
  price: string; // Formatted "R$ XX,XX"
  oldPrice?: string;
}

export interface SupermarketResult {
  id: string;
  name: string;
  badgeType?: 'CHEAP' | 'MEDIUM' | 'EXPENSIVE';
  badgeText?: string;
  savings?: string;
  validity?: string;
  products: ProductOffer[];
  link?: string;
  isLoading?: boolean; // New field for UI state
}

export interface GroundingSource {
  title: string;
  url: string;
}

export interface SearchResponse {
  supermarkets: SupermarketResult[];
  sources: GroundingSource[];
}