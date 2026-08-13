import { reactive, computed, ref } from 'vue'
import type {
  RFPOpportunity,
  RevenueFilterCategory,
  Outcome,
  LifecycleStage,
  Geography,
  BusinessUnit,
  NoBidReason
} from '../types'

// Helper to format date string
const getFormattedDate = (offsetDays: number = 0): string => {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().split('T')[0]
}

const todayStr = getFormattedDate(0)
const yesterdayStr = getFormattedDate(-2)
const next3DaysStr = getFormattedDate(3)
const next6DaysStr = getFormattedDate(6)
const pastWeekStr = getFormattedDate(-10)

// Initial Enterprise Mock Data
const initialRFPs: RFPOpportunity[] = [
  {
    id: 'rfp-101',
    name: 'Global Omnichannel Banking Portal',
    client: 'EuroBank Group',
    industry: 'Financial Services',
    geography: 'EMEA',
    businessUnit: 'Digital Transformation',
    opportunityType: 'New Business',
    clientStatus: 'Strategic Account',
    infrastructureProvider: 'AWS',
    apiManagementPlatform: 'MuleSoft API Manager',
    integrationPlatform: 'Kafka & IBM App Connect',
    microservicesLanguage: 'Java Spring Boot & TypeScript',
    potentialRevenue: 1850000,
    currency: '€',
    rfpOwnerPM: 'Sarah Jenkins',
    salesLead: 'Marcus Vance',
    presalesLead: 'David Chen',
    technicalSME: 'Elena Rostova',
    bdaiCCS: 'Alex Rivera',
    lifecycleStage: 'Submitted',
    outcome: 'Won',
    dueDate: pastWeekStr,
    createdDate: '2026-07-01',
    isAtRisk: false,
    isApprovalPending: false
  },
  {
    id: 'rfp-102',
    name: 'Next-Gen Cloud Migration & Kubernetes Modernization',
    client: 'Nordic Logistics SE',
    industry: 'Transportation & Logistics',
    geography: 'EMEA',
    businessUnit: 'Cloud & Infra',
    opportunityType: 'Expansion',
    clientStatus: 'Existing Client',
    infrastructureProvider: 'Microsoft Azure',
    apiManagementPlatform: 'Apigee',
    integrationPlatform: 'Azure Service Bus',
    microservicesLanguage: 'Go & Kotlin',
    potentialRevenue: 940000,
    currency: '€',
    rfpOwnerPM: 'Thomas Wright',
    salesLead: 'Clara Oswald',
    presalesLead: 'Siddharth Nair',
    technicalSME: 'Michael Scott',
    bdaiCCS: 'Alex Rivera',
    lifecycleStage: 'Internal Review',
    outcome: 'Pending',
    dueDate: todayStr, // Due Today
    createdDate: '2026-08-01',
    isAtRisk: false,
    isApprovalPending: true // Approval Pending
  },
  {
    id: 'rfp-103',
    name: 'AI-Driven Predictive Patient Care Platform',
    client: 'BioHealth Pharma',
    industry: 'Healthcare & Life Sciences',
    geography: 'North America',
    businessUnit: 'Data & AI',
    opportunityType: 'New Business',
    clientStatus: 'New Prospect',
    infrastructureProvider: 'Google Cloud Platform',
    apiManagementPlatform: 'Google Cloud Endpoints',
    integrationPlatform: 'Apache NiFi',
    microservicesLanguage: 'Python & FastAPI',
    potentialRevenue: 2400000,
    currency: '€',
    rfpOwnerPM: 'Rachel Green',
    salesLead: 'Ross Geller',
    presalesLead: 'Chandler Bing',
    technicalSME: 'Monica Geller',
    bdaiCCS: 'Joey Tribbiani',
    lifecycleStage: 'Draft',
    outcome: 'Pending',
    dueDate: yesterdayStr, // Due Date Crossed
    createdDate: '2026-07-20',
    isAtRisk: true, // At Risk
    isApprovalPending: false
  },
  {
    id: 'rfp-104',
    name: '5G Core Network Analytics & Billing Engine',
    client: 'Telco Global Systems',
    industry: 'Telecommunications',
    geography: 'APAC',
    businessUnit: 'Enterprise Apps',
    opportunityType: 'Sole Source',
    clientStatus: 'Existing Client',
    infrastructureProvider: 'Hybrid Private Cloud',
    apiManagementPlatform: 'Kong Enterprise',
    integrationPlatform: 'RabbitMQ',
    microservicesLanguage: 'Rust & Java',
    potentialRevenue: 3100000,
    currency: '€',
    rfpOwnerPM: 'Anita Desai',
    salesLead: 'Vikram Mehta',
    presalesLead: 'Priya Sharma',
    technicalSME: 'Rajesh Kumar',
    bdaiCCS: 'Sunita Rao',
    lifecycleStage: 'Submitted',
    outcome: 'Pending',
    dueDate: next3DaysStr, // This Week
    createdDate: '2026-07-15',
    isAtRisk: false,
    isApprovalPending: true
  },
  {
    id: 'rfp-105',
    name: 'Zero-Trust Cybersecurity Architecture Refresh',
    client: 'Apex Retail Group',
    industry: 'Retail & eCommerce',
    geography: 'LATAM',
    businessUnit: 'Cybersecurity',
    opportunityType: 'Renewal',
    clientStatus: 'Strategic Account',
    infrastructureProvider: 'AWS & Azure',
    apiManagementPlatform: 'AWS API Gateway',
    integrationPlatform: 'Dell Boomi',
    microservicesLanguage: 'TypeScript / Node.js',
    potentialRevenue: 620000,
    currency: '€',
    rfpOwnerPM: 'Carlos Rodriguez',
    salesLead: 'Isabella Gomez',
    presalesLead: 'Mateo Hernandez',
    technicalSME: 'Sofia Martinez',
    bdaiCCS: 'Diego Lopez',
    lifecycleStage: 'Draft',
    outcome: 'No-Bid',
    noBidReason: 'Tight Timeline',
    dueDate: pastWeekStr,
    createdDate: '2026-07-10',
    isAtRisk: false,
    isApprovalPending: false
  },
  {
    id: 'rfp-106',
    name: 'Automotive IoT Telematics & Fleet Platform',
    client: 'Veloce Motors',
    industry: 'Automotive & Manufacturing',
    geography: 'EMEA',
    businessUnit: 'Data & AI',
    opportunityType: 'New Business',
    clientStatus: 'New Prospect',
    infrastructureProvider: 'AWS Cloud',
    apiManagementPlatform: 'Apigee',
    integrationPlatform: 'AWS Kinesis',
    microservicesLanguage: 'C++ & Go',
    potentialRevenue: 1450000,
    currency: '€',
    rfpOwnerPM: 'Hans Gruber',
    salesLead: 'John McClane',
    presalesLead: 'Holly Gennaro',
    technicalSME: 'Al Powell',
    bdaiCCS: 'Argyle Smith',
    lifecycleStage: 'Submitted',
    outcome: 'Lost',
    dueDate: pastWeekStr,
    createdDate: '2026-06-25',
    isAtRisk: false,
    isApprovalPending: false
  },
  {
    id: 'rfp-107',
    name: 'Smart Grid Energy Analytics Modernization',
    client: 'EcoPower Utilities',
    industry: 'Energy & Utilities',
    geography: 'North America',
    businessUnit: 'Digital Transformation',
    opportunityType: 'Expansion',
    clientStatus: 'Existing Client',
    infrastructureProvider: 'Microsoft Azure',
    apiManagementPlatform: 'Azure API Management',
    integrationPlatform: 'MuleSoft',
    microservicesLanguage: '.NET Core & C#',
    potentialRevenue: 1280000,
    currency: '€',
    rfpOwnerPM: 'Laura Croft',
    salesLead: 'Nathan Drake',
    presalesLead: 'Victor Sullivan',
    technicalSME: 'Elena Fisher',
    bdaiCCS: 'Chloe Frazer',
    lifecycleStage: 'Submitted',
    outcome: 'Won',
    dueDate: pastWeekStr,
    createdDate: '2026-06-18',
    isAtRisk: false,
    isApprovalPending: false
  },
  {
    id: 'rfp-108',
    name: 'Core Insurance Claims Engine Automation',
    client: 'Helvetia Assurance',
    industry: 'Financial Services',
    geography: 'EMEA',
    businessUnit: 'Enterprise Apps',
    opportunityType: 'New Business',
    clientStatus: 'New Prospect',
    infrastructureProvider: 'IBM Cloud & On-Prem',
    apiManagementPlatform: 'IBM API Connect',
    integrationPlatform: 'WSO2 API Manager',
    microservicesLanguage: 'Java & Scala',
    potentialRevenue: 890000,
    currency: '€',
    rfpOwnerPM: 'Beatrix Kiddo',
    salesLead: 'Bill Preston',
    presalesLead: 'Ted Logan',
    technicalSME: 'Rufus Carlin',
    bdaiCCS: 'Missy Preston',
    lifecycleStage: 'Internal Review',
    outcome: 'Pending',
    dueDate: next6DaysStr, // This Week
    createdDate: '2026-08-05',
    isAtRisk: true, // At Risk
    isApprovalPending: true // Approval Pending
  }
]

// Centralized Reactive State
const opportunities = ref<RFPOpportunity[]>([...initialRFPs])
const revenueFilterCategory = ref<RevenueFilterCategory>('Industry')

export function useRFPStore() {
  // -------------------------------------------------------------
  // Section 4: Pipeline Summary Metrics Bar
  // Strictly 5 summary cards in chronological/operational pipeline order:
  // 1. Total RFPs ➔ 2. Bid ➔ 3. Draft ➔ 4. Submitted ➔ 5. Won
  // -------------------------------------------------------------
  const summaryMetrics = computed(() => {
    const totalRFPs = opportunities.value.length
    const bidCount = opportunities.value.filter((o) => o.outcome !== 'No-Bid').length
    const draftCount = opportunities.value.filter((o) => o.lifecycleStage === 'Draft').length
    const submittedCount = opportunities.value.filter((o) => o.lifecycleStage === 'Submitted').length
    const wonCount = opportunities.value.filter((o) => o.outcome === 'Won').length

    return [
      { label: '1. Total RFPs', count: totalRFPs, key: 'total' },
      { label: '2. Bid', count: bidCount, key: 'bid' },
      { label: '3. Draft', count: draftCount, key: 'draft' },
      { label: '4. Submitted', count: submittedCount, key: 'submitted' },
      { label: '5. Won', count: wonCount, key: 'won' }
    ]
  })

  // -------------------------------------------------------------
  // Section 7: Deadline Overview Micro-Metrics
  // Micro-metrics tiles for timeline tracking
  // -------------------------------------------------------------
  const deadlineMetrics = computed(() => {
    let dueToday = 0
    let dateCrossed = 0
    let thisWeek = 0
    let approvalPending = 0
    let atRisk = 0

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const in7Days = new Date(today)
    in7Days.setDate(today.getDate() + 7)

    opportunities.value.forEach((opp) => {
      const due = new Date(opp.dueDate)
      due.setHours(0, 0, 0, 0)

      if (opp.dueDate === todayStr) {
        dueToday++
      } else if (due < today && opp.outcome === 'Pending') {
        dateCrossed++
      }

      if (due >= today && due <= in7Days && opp.outcome === 'Pending') {
        thisWeek++
      }

      if (opp.isApprovalPending || opp.lifecycleStage === 'Internal Review') {
        approvalPending++
      }

      if (opp.isAtRisk) {
        atRisk++
      }
    })

    return {
      dueToday,
      dateCrossed,
      thisWeek,
      approvalPending,
      atRisk
    }
  })

  // -------------------------------------------------------------
  // Section 5: Outcome Accordions Data
  // Grouped opportunities by outcome: Won, Lost, and Submitted
  // -------------------------------------------------------------
  const wonOpportunities = computed(() =>
    opportunities.value.filter((o) => o.outcome === 'Won')
  )

  const lostOpportunities = computed(() =>
    opportunities.value.filter((o) => o.outcome === 'Lost')
  )

  const submittedOpportunities = computed(() =>
    opportunities.value.filter(
      (o) => o.lifecycleStage === 'Submitted' || (o.outcome === 'Pending' && o.lifecycleStage !== 'Draft')
    )
  )

  const noBidOpportunities = computed(() =>
    opportunities.value.filter((o) => o.outcome === 'No-Bid')
  )

  // -------------------------------------------------------------
  // Section 6: Revenue Analytics Toolbar Breakdown
  // Aggregates potential revenue by Industry, Client, or Geography
  // -------------------------------------------------------------
  const revenueBreakdown = computed(() => {
    const category = revenueFilterCategory.value
    const totals: Record<string, number> = {}
    let grandTotal = 0

    opportunities.value.forEach((opp) => {
      let key = 'Unassigned'
      if (category === 'Industry') key = opp.industry || 'Other Industry'
      else if (category === 'Client') key = opp.client || 'Unknown Client'
      else if (category === 'Geography') key = opp.geography || 'Other Geography'

      const rev = opp.potentialRevenue || 0
      totals[key] = (totals[key] || 0) + rev
      grandTotal += rev
    })

    const sortedEntries = Object.entries(totals)
      .map(([name, value]) => ({
        name,
        value,
        percentage: grandTotal > 0 ? Math.round((value / grandTotal) * 100) : 0
      }))
      .sort((a, b) => b.value - a.value)

    return {
      category,
      sortedEntries,
      grandTotal
    }
  })

  // -------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------
  const addOpportunity = (newOpp: Omit<RFPOpportunity, 'id' | 'createdDate'>) => {
    const id = `rfp-${Date.now().toString().slice(-4)}`
    const createdDate = todayStr
    const fullOpp: RFPOpportunity = {
      ...newOpp,
      id,
      createdDate,
      currency: '€'
    }
    opportunities.value.unshift(fullOpp)
  }

  const updateOpportunity = (updated: RFPOpportunity) => {
    const idx = opportunities.value.findIndex((o) => o.id === updated.id)
    if (idx !== -1) {
      opportunities.value[idx] = { ...updated }
    }
  }

  const deleteOpportunity = (id: string) => {
    opportunities.value = opportunities.value.filter((o) => o.id !== id)
  }

  const setRevenueFilter = (filter: RevenueFilterCategory) => {
    revenueFilterCategory.value = filter
  }

  return {
    opportunities,
    revenueFilterCategory,
    summaryMetrics,
    deadlineMetrics,
    wonOpportunities,
    lostOpportunities,
    submittedOpportunities,
    noBidOpportunities,
    revenueBreakdown,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    setRevenueFilter
  }
}
