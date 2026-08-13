export type LifecycleStage = 'Draft' | 'Internal Review' | 'Submitted';

export type Outcome = 'Pending' | 'Won' | 'Lost' | 'No-Bid';

export type NoBidReason =
  | 'Lack of Resources'
  | 'Budget Mismatch'
  | 'Tight Timeline'
  | 'Skill Gap'
  | 'Strategic Mismatch'
  | 'Other';

export type Geography = 'North America' | 'EMEA' | 'APAC' | 'LATAM';

export type BusinessUnit =
  | 'Digital Transformation'
  | 'Cloud & Infra'
  | 'Data & AI'
  | 'Cybersecurity'
  | 'Enterprise Apps';

export type OpportunityType = 'New Business' | 'Renewal' | 'Expansion' | 'Sole Source';

export type ClientStatus = 'Existing Client' | 'New Prospect' | 'Strategic Account';

export type RevenueFilterCategory = 'Industry' | 'Client' | 'Geography';

export interface RFPOpportunity {
  id: string;
  // Screen 1: General Info
  name: string;
  client: string;
  geography: Geography;
  businessUnit: BusinessUnit;
  opportunityType: OpportunityType;
  clientStatus: ClientStatus;
  industry: string;

  // Screen 2: Technology Stack & Revenue
  infrastructureProvider: string;
  apiManagementPlatform: string;
  integrationPlatform: string;
  microservicesLanguage: string;
  potentialRevenue: number; // Stored as clean integer
  currency: string; // e.g. '€' or '$'

  // Screen 3: Team Assignment
  rfpOwnerPM: string;
  salesLead: string;
  presalesLead: string;
  technicalSME: string;
  bdaiCCS: string;

  // Structural Status Architecture (Section 9)
  lifecycleStage: LifecycleStage;
  outcome: Outcome;
  noBidReason?: NoBidReason;

  // Dates & Timeline
  dueDate: string; // YYYY-MM-DD
  createdDate: string; // YYYY-MM-DD
  isAtRisk?: boolean;
  isApprovalPending?: boolean;
}

export interface MetricCard {
  label: string;
  count: number;
  subtext?: string;
}

export interface DeadlineTile {
  title: string;
  count: number;
  cssClass: string;
  badgeText: string;
}
