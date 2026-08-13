<template>
  <!-- Centralized Card Wizard Container -->
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <!-- Header Title & Close Button -->
    <div class="flex justify-between items-center pb-4 mb-6 border-b border-gray-100">
      <div>
        <h2 class="text-xl font-bold text-gray-900">Create New Opportunity</h2>
        <p class="text-xs text-gray-500 mt-1">Complete all 3 steps to register a new RFP in the enterprise tracker.</p>
      </div>
      <button
        @click="$emit('cancel')"
        type="button"
        class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
        title="Close Wizard"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Progressive Step Indicator Bar -->
    <div class="mb-8">
      <div class="flex items-center justify-between relative">
        <!-- Progress Line Background -->
        <div class="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
        <!-- Dynamic Active Progress Line -->
        <div
          class="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-300 ease-in-out"
          :style="{ width: progressLineWidth }"
        ></div>

        <!-- Step 1 Indicator -->
        <div
          class="relative z-10 flex flex-col items-center cursor-pointer"
          @click="currentStep = 1"
        >
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-200"
            :class="
              currentStep === 1
                ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                : currentStep > 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-500 border border-gray-300'
            "
          >
            <span v-if="currentStep > 1">✓</span>
            <span v-else>1</span>
          </div>
          <span
            class="text-xs font-semibold mt-2 tracking-wide"
            :class="currentStep === 1 ? 'text-blue-600' : 'text-gray-500'"
          >
            General Info
          </span>
        </div>

        <!-- Step 2 Indicator -->
        <div
          class="relative z-10 flex flex-col items-center cursor-pointer"
          @click="canGoToStep(2) && (currentStep = 2)"
        >
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-200"
            :class="
              currentStep === 2
                ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                : currentStep > 2
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-500 border border-gray-300'
            "
          >
            <span v-if="currentStep > 2">✓</span>
            <span v-else>2</span>
          </div>
          <span
            class="text-xs font-semibold mt-2 tracking-wide"
            :class="currentStep === 2 ? 'text-blue-600' : 'text-gray-500'"
          >
            Tech Stack
          </span>
        </div>

        <!-- Step 3 Indicator -->
        <div
          class="relative z-10 flex flex-col items-center cursor-pointer"
          @click="canGoToStep(3) && (currentStep = 3)"
        >
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-200"
            :class="
              currentStep === 3
                ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                : 'bg-gray-100 text-gray-500 border border-gray-300'
            "
          >
            3
          </div>
          <span
            class="text-xs font-semibold mt-2 tracking-wide"
            :class="currentStep === 3 ? 'text-blue-600' : 'text-gray-500'"
          >
            Team & Status
          </span>
        </div>
      </div>
    </div>

    <!-- Form Content Container -->
    <form @submit.prevent="handleSubmit">
      <!-- =============================================================== -->
      <!-- SCREEN 1: GENERAL INFO -->
      <!-- Arrange fields in responsive grid grid-cols-1 md:grid-cols-2 gap-4 -->
      <!-- =============================================================== -->
      <div v-show="currentStep === 1" class="space-y-4">
        <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Screen 1: General Info</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Opportunity Name -->
          <div class="md:col-span-2">
            <label for="opp-name" class="block text-sm font-medium text-gray-700 mb-1">
              Opportunity Name <span class="text-red-500">*</span>
            </label>
            <input
              id="opp-name"
              v-model="form.name"
              type="text"
              required
              placeholder="e.g. Next-Gen Enterprise Payment Gateway"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Client -->
          <div>
            <label for="opp-client" class="block text-sm font-medium text-gray-700 mb-1">
              Client <span class="text-red-500">*</span>
            </label>
            <input
              id="opp-client"
              v-model="form.client"
              type="text"
              required
              placeholder="e.g. Acme Financial Group"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Industry -->
          <div>
            <label for="opp-industry" class="block text-sm font-medium text-gray-700 mb-1">
              Industry <span class="text-red-500">*</span>
            </label>
            <select
              id="opp-industry"
              v-model="form.industry"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="" disabled>Select Industry</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
              <option value="Telecommunications">Telecommunications</option>
              <option value="Transportation & Logistics">Transportation & Logistics</option>
              <option value="Retail & eCommerce">Retail & eCommerce</option>
              <option value="Energy & Utilities">Energy & Utilities</option>
              <option value="Automotive & Manufacturing">Automotive & Manufacturing</option>
            </select>
          </div>

          <!-- Geography -->
          <div>
            <label for="opp-geography" class="block text-sm font-medium text-gray-700 mb-1">
              Geography <span class="text-red-500">*</span>
            </label>
            <select
              id="opp-geography"
              v-model="form.geography"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="EMEA">EMEA</option>
              <option value="North America">North America</option>
              <option value="APAC">APAC</option>
              <option value="LATAM">LATAM</option>
            </select>
          </div>

          <!-- Business Unit -->
          <div>
            <label for="opp-bu" class="block text-sm font-medium text-gray-700 mb-1">
              Business Unit <span class="text-red-500">*</span>
            </label>
            <select
              id="opp-bu"
              v-model="form.businessUnit"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="Digital Transformation">Digital Transformation</option>
              <option value="Cloud & Infra">Cloud & Infra</option>
              <option value="Data & AI">Data & AI</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Enterprise Apps">Enterprise Apps</option>
            </select>
          </div>

          <!-- Opportunity Type -->
          <div>
            <label for="opp-type" class="block text-sm font-medium text-gray-700 mb-1">
              Opportunity Type <span class="text-red-500">*</span>
            </label>
            <select
              id="opp-type"
              v-model="form.opportunityType"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="New Business">New Business</option>
              <option value="Renewal">Renewal</option>
              <option value="Expansion">Expansion</option>
              <option value="Sole Source">Sole Source</option>
            </select>
          </div>

          <!-- Client Status -->
          <div>
            <label for="opp-client-status" class="block text-sm font-medium text-gray-700 mb-1">
              Client Status <span class="text-red-500">*</span>
            </label>
            <select
              id="opp-client-status"
              v-model="form.clientStatus"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="Existing Client">Existing Client</option>
              <option value="New Prospect">New Prospect</option>
              <option value="Strategic Account">Strategic Account</option>
            </select>
          </div>
        </div>
      </div>

      <!-- =============================================================== -->
      <!-- SCREEN 2: TECHNOLOGY STACK & POTENTIAL REVENUE -->
      <!-- Fields: Infrastructure Provider, API Management Platform, Integration Platform, Microservices Language -->
      <!-- =============================================================== -->
      <div v-show="currentStep === 2" class="space-y-4">
        <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Screen 2: Technology Stack & Revenue</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Infrastructure Provider -->
          <div>
            <label for="opp-infra" class="block text-sm font-medium text-gray-700 mb-1">
              Infrastructure Provider <span class="text-red-500">*</span>
            </label>
            <input
              id="opp-infra"
              v-model="form.infrastructureProvider"
              type="text"
              required
              placeholder="e.g. AWS / Azure / Private Cloud"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- API Management Platform -->
          <div>
            <label for="opp-apim" class="block text-sm font-medium text-gray-700 mb-1">
              API Management Platform <span class="text-red-500">*</span>
            </label>
            <input
              id="opp-apim"
              v-model="form.apiManagementPlatform"
              type="text"
              required
              placeholder="e.g. MuleSoft / Apigee / Kong"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Integration Platform -->
          <div>
            <label for="opp-integ" class="block text-sm font-medium text-gray-700 mb-1">
              Integration Platform <span class="text-red-500">*</span>
            </label>
            <input
              id="opp-integ"
              v-model="form.integrationPlatform"
              type="text"
              required
              placeholder="e.g. Kafka / IBM App Connect / Boomi"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Microservices Language -->
          <div>
            <label for="opp-lang" class="block text-sm font-medium text-gray-700 mb-1">
              Microservices Language <span class="text-red-500">*</span>
            </label>
            <input
              id="opp-lang"
              v-model="form.microservicesLanguage"
              type="text"
              required
              placeholder="e.g. Java Spring Boot / Go / Python"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Section 8 Bug Fix Component: Potential Revenue in Euros (€) -->
          <div class="md:col-span-2">
            <RevenueInput
              id="opp-revenue"
              v-model="form.potentialRevenue"
              label="Potential Revenue (€)"
              currencySymbol="€"
              placeholder="e.g. 1500000"
              :required="true"
            />
          </div>
        </div>
      </div>

      <!-- =============================================================== -->
      <!-- SCREEN 3: TEAM ASSIGNMENT & STATUS ARCHITECTURE -->
      <!-- Fields: RFP Owner / PM, Sales Lead, Presales Lead, Technical SME, BDAI CCS -->
      <!-- Section 9: Structural Status Architecture (lifecycleStage, outcome, noBidReason) -->
      <!-- =============================================================== -->
      <div v-show="currentStep === 3" class="space-y-4">
        <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Screen 3: Team Assignment & Status</h3>

        <!-- Team Assignment Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- RFP Owner / PM -->
          <div>
            <label for="opp-owner" class="block text-sm font-medium text-gray-700 mb-1">
              RFP Owner / PM <span class="text-red-500">*</span>
            </label>
            <input
              id="opp-owner"
              v-model="form.rfpOwnerPM"
              type="text"
              required
              placeholder="e.g. Sarah Jenkins"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Sales Lead -->
          <div>
            <label for="opp-sales" class="block text-sm font-medium text-gray-700 mb-1">
              Sales Lead <span class="text-red-500">*</span>
            </label>
            <input
              id="opp-sales"
              v-model="form.salesLead"
              type="text"
              required
              placeholder="e.g. Marcus Vance"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Presales Lead -->
          <div>
            <label for="opp-presales" class="block text-sm font-medium text-gray-700 mb-1">
              Presales Lead <span class="text-red-500">*</span>
            </label>
            <input
              id="opp-presales"
              v-model="form.presalesLead"
              type="text"
              required
              placeholder="e.g. David Chen"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Technical SME -->
          <div>
            <label for="opp-sme" class="block text-sm font-medium text-gray-700 mb-1">
              Technical SME <span class="text-red-500">*</span>
            </label>
            <input
              id="opp-sme"
              v-model="form.technicalSME"
              type="text"
              required
              placeholder="e.g. Elena Rostova"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- BDAI CCS -->
          <div>
            <label for="opp-bdai" class="block text-sm font-medium text-gray-700 mb-1">
              BDAI CCS <span class="text-red-500">*</span>
            </label>
            <input
              id="opp-bdai"
              v-model="form.bdaiCCS"
              type="text"
              required
              placeholder="e.g. Alex Rivera"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Due Date -->
          <div>
            <label for="opp-duedate" class="block text-sm font-medium text-gray-700 mb-1">
              Target Submission Due Date <span class="text-red-500">*</span>
            </label>
            <input
              id="opp-duedate"
              v-model="form.dueDate"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        <!-- Section 9: Two-Dimensional Status Mapping Divider -->
        <div class="pt-4 mt-4 border-t border-gray-200">
          <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Structural Status Architecture</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- lifecycleStage ('Draft' | 'Internal Review' | 'Submitted') -->
            <div>
              <label for="opp-stage" class="block text-sm font-medium text-gray-700 mb-1">
                Lifecycle Stage <span class="text-red-500">*</span>
              </label>
              <select
                id="opp-stage"
                v-model="form.lifecycleStage"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="Draft">Draft</option>
                <option value="Internal Review">Internal Review</option>
                <option value="Submitted">Submitted</option>
              </select>
            </div>

            <!-- outcome ('Pending' | 'Won' | 'Lost' | 'No-Bid') -->
            <div>
              <label for="opp-outcome" class="block text-sm font-medium text-gray-700 mb-1">
                Outcome <span class="text-red-500">*</span>
              </label>
              <select
                id="opp-outcome"
                v-model="form.outcome"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
                <option value="No-Bid">No-Bid</option>
              </select>
            </div>

            <!-- Conditional Mandatory No-Bid Reason (v-if="form.outcome === 'No-Bid'") -->
            <div v-if="form.outcome === 'No-Bid'" class="md:col-span-2 bg-amber-50 p-3 rounded-md border border-amber-200">
              <label for="opp-nobid-reason" class="block text-sm font-semibold text-amber-900 mb-1">
                Corporate No-Bid Pushback Reason <span class="text-red-500">*</span>
              </label>
              <select
                id="opp-nobid-reason"
                v-model="form.noBidReason"
                required
                class="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900"
              >
                <option value="" disabled>Select Corporate Pushback Reason</option>
                <option value="Lack of Resources">Lack of Resources</option>
                <option value="Budget Mismatch">Budget Mismatch</option>
                <option value="Tight Timeline">Tight Timeline</option>
                <option value="Skill Gap">Skill Gap</option>
                <option value="Strategic Mismatch">Strategic Mismatch</option>
                <option value="Other">Other</option>
              </select>
              <p class="mt-1 text-xs text-amber-700">Mandatory corporate compliance capture required when declaring No-Bid outcome.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls Footer: Back, Next, Submit Triggers -->
      <div class="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
        <!-- Back Button -->
        <button
          v-if="currentStep > 1"
          type="button"
          @click="prevStep"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Back
        </button>
        <div v-else></div>

        <!-- Right Side Triggers (Next / Submit) -->
        <div class="flex items-center space-x-3">
          <button
            type="button"
            @click="$emit('cancel')"
            class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>

          <!-- Next Trigger -->
          <button
            v-if="currentStep < 3"
            type="button"
            @click="nextStep"
            class="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors inline-flex items-center"
          >
            Next Step
            <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Submit Trigger -->
          <button
            v-else
            type="submit"
            class="px-6 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors inline-flex items-center"
          >
            Submit Opportunity
            <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import RevenueInput from './RevenueInput.vue'
import type {
  RFPOpportunity,
  Geography,
  BusinessUnit,
  OpportunityType,
  ClientStatus,
  LifecycleStage,
  Outcome,
  NoBidReason
} from '../types'

const emit = defineEmits<{
  (e: 'submit', payload: Omit<RFPOpportunity, 'id' | 'createdDate'>): void
  (e: 'cancel'): void
}>()

const currentStep = ref<number>(1)

const progressLineWidth = computed(() => {
  if (currentStep.value === 1) return '0%'
  if (currentStep.value === 2) return '50%'
  return '100%'
})

// Reactive Form Payload State
const form = reactive({
  name: '',
  client: '',
  industry: 'Financial Services',
  geography: 'EMEA' as Geography,
  businessUnit: 'Digital Transformation' as BusinessUnit,
  opportunityType: 'New Business' as OpportunityType,
  clientStatus: 'Existing Client' as ClientStatus,

  infrastructureProvider: 'AWS',
  apiManagementPlatform: 'MuleSoft API Manager',
  integrationPlatform: 'Kafka',
  microservicesLanguage: 'Java Spring Boot',
  potentialRevenue: 500000,
  currency: '€',

  rfpOwnerPM: '',
  salesLead: '',
  presalesLead: '',
  technicalSME: '',
  bdaiCCS: '',

  // Structural Status Architecture (Section 9)
  lifecycleStage: 'Draft' as LifecycleStage,
  outcome: 'Pending' as Outcome,
  noBidReason: '' as NoBidReason | '',

  dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
})

const canGoToStep = (step: number) => {
  if (step === 2) return validateStep1()
  if (step === 3) return validateStep1() && validateStep2()
  return true
}

const validateStep1 = (): boolean => {
  return !!(
    form.name.trim() &&
    form.client.trim() &&
    form.industry &&
    form.geography &&
    form.businessUnit &&
    form.opportunityType &&
    form.clientStatus
  )
}

const validateStep2 = (): boolean => {
  return !!(
    form.infrastructureProvider.trim() &&
    form.apiManagementPlatform.trim() &&
    form.integrationPlatform.trim() &&
    form.microservicesLanguage.trim() &&
    form.potentialRevenue > 0
  )
}

const nextStep = () => {
  if (currentStep.value === 1) {
    if (!validateStep1()) {
      alert('Please fill in all mandatory General Info fields before proceeding.')
      return
    }
    currentStep.value = 2
  } else if (currentStep.value === 2) {
    if (!validateStep2()) {
      alert('Please fill in all Tech Stack fields and potential revenue before proceeding.')
      return
    }
    currentStep.value = 3
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const handleSubmit = () => {
  if (!validateStep1() || !validateStep2()) {
    alert('Please review previous screens for missing required information.')
    return
  }

  if (
    !form.rfpOwnerPM.trim() ||
    !form.salesLead.trim() ||
    !form.presalesLead.trim() ||
    !form.technicalSME.trim() ||
    !form.bdaiCCS.trim() ||
    !form.dueDate
  ) {
    alert('Please complete all team assignment and timeline fields.')
    return
  }

  if (form.outcome === 'No-Bid' && !form.noBidReason) {
    alert('Please select a mandatory No-Bid Reason when outcome is set to No-Bid.')
    return
  }

  // Emit clean payload to store
  emit('submit', {
    name: form.name,
    client: form.client,
    industry: form.industry,
    geography: form.geography,
    businessUnit: form.businessUnit,
    opportunityType: form.opportunityType,
    clientStatus: form.clientStatus,
    infrastructureProvider: form.infrastructureProvider,
    apiManagementPlatform: form.apiManagementPlatform,
    integrationPlatform: form.integrationPlatform,
    microservicesLanguage: form.microservicesLanguage,
    potentialRevenue: Number(form.potentialRevenue),
    currency: '€',
    rfpOwnerPM: form.rfpOwnerPM,
    salesLead: form.salesLead,
    presalesLead: form.presalesLead,
    technicalSME: form.technicalSME,
    bdaiCCS: form.bdaiCCS,
    lifecycleStage: form.lifecycleStage,
    outcome: form.outcome,
    noBidReason: form.outcome === 'No-Bid' ? (form.noBidReason as NoBidReason) : undefined,
    dueDate: form.dueDate
  })
}
</script>
