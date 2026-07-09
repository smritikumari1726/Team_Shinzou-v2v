export interface BiasHighlight {
  category: string;
  text: string;
  explanation: string;
}

export interface AnalysisResult {
  score: number;
  biasLevel: string;
  highlights: BiasHighlight[];
  rewrite: string;
  isFallback?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  parts: [{ text: string }];
  timestamp: Date;
}

export interface FinancialProfile {
  businessName: string;
  industry: string;
  businessType: string;
  monthlyRevenue: string;
  fundingNeeded: string;
  isRegisteredMSME: boolean;
}

export interface LoanScheme {
  id: string;
  name: string;
  sponsor: string;
  maxAmount: string;
  interestRate: string;
  repaymentPeriod: string;
  eligibility: string;
  keyBenefits: string[];
}
