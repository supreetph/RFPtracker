<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
    <!-- Main Top Navigation Bar -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo & Brand Title -->
          <div class="flex items-center space-x-3">
            <div class="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              RFP
            </div>
            <div>
              <h1 class="text-lg font-bold text-gray-900 leading-tight">RFP Opportunity Tracker</h1>
              <div class="flex items-center space-x-2 text-xs text-gray-500">
                <span>Target Remote:</span>
                <a
                  href="https://github.com/supreetph/RFPtracker"
                  target="_blank"
                  rel="noopener"
                  class="text-blue-600 hover:underline font-mono"
                >
                  git@github.com:supreetph/RFPtracker.git
                </a>
              </div>
            </div>
          </div>

          <!-- Action Controls & View Toggles -->
          <div class="flex items-center space-x-3">
            <!-- Navigation View Tabs -->
            <div class="inline-flex p-1 bg-gray-100 rounded-lg space-x-1">
              <button
                @click="activeTab = 'dashboard'"
                class="px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150"
                :class="activeTab === 'dashboard' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
              >
                Dashboard Analytics
              </button>
              <button
                @click="activeTab = 'all'"
                class="px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150"
                :class="activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
              >
                All RFPs ({{ store.opportunities.value.length }})
              </button>
            </div>

            <!-- "Create Opportunity" Wizard Trigger -->
            <button
              @click="showWizard = true"
              class="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors duration-150 flex items-center space-x-1.5"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Create Opportunity</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Container -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Wizard Modal View -->
      <div v-if="showWizard" class="fixed inset-0 z-50 overflow-y-auto bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <RFPWizard
          @submit="handleWizardSubmit"
          @cancel="showWizard = false"
        />
      </div>

      <!-- Main Dashboard View -->
      <RFPDashboard v-else-if="activeTab === 'dashboard'" />

      <!-- All Opportunities Table View -->
      <div v-else-if="activeTab === 'all'" class="space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div>
            <h2 class="text-lg font-bold text-gray-900">All RFP Opportunities</h2>
            <p class="text-xs text-gray-500">Comprehensive database of active, submitted, and closed bids.</p>
          </div>

          <!-- Search & Filter Controls -->
          <div class="flex items-center space-x-3 w-full sm:w-auto">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search opportunity, client..."
              class="w-full sm:w-64 px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              v-model="outcomeFilter"
              class="px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="ALL">All Outcomes</option>
              <option value="Pending">Pending</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
              <option value="No-Bid">No-Bid</option>
            </select>
          </div>
        </div>

        <!-- Comprehensive Table -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                  <th class="py-3 px-4">Opportunity</th>
                  <th class="py-3 px-4">Client & Industry</th>
                  <th class="py-3 px-4">Tech Stack</th>
                  <th class="py-3 px-4">Lifecycle Stage</th>
                  <th class="py-3 px-4">Outcome & Pushback</th>
                  <th class="py-3 px-4">Due Date</th>
                  <th class="py-3 px-4 text-right">Potential Revenue</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="opp in filteredOpportunities" :key="opp.id" class="hover:bg-gray-50/80 transition-colors">
                  <!-- Name & Geo -->
                  <td class="py-3 px-4">
                    <div class="font-bold text-gray-900 text-sm">{{ opp.name }}</div>
                    <div class="text-xs text-gray-500">{{ opp.geography }} • {{ opp.businessUnit }}</div>
                  </td>

                  <!-- Client & Industry -->
                  <td class="py-3 px-4">
                    <div class="font-semibold text-gray-800">{{ opp.client }}</div>
                    <div class="text-xs text-gray-500">{{ opp.industry }}</div>
                  </td>

                  <!-- Tech Stack -->
                  <td class="py-3 px-4 text-gray-700">
                    <div><span class="text-gray-400">Infra:</span> {{ opp.infrastructureProvider }}</div>
                    <div><span class="text-gray-400">APIm:</span> {{ opp.apiManagementPlatform }}</div>
                    <div><span class="text-gray-400">Lang:</span> {{ opp.microservicesLanguage }}</div>
                  </td>

                  <!-- Lifecycle Stage -->
                  <td class="py-3 px-4">
                    <span
                      class="inline-flex items-center px-2 py-0.5 rounded font-semibold text-xs"
                      :class="
                        opp.lifecycleStage === 'Submitted'
                          ? 'bg-blue-100 text-blue-800'
                          : opp.lifecycleStage === 'Internal Review'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      "
                    >
                      {{ opp.lifecycleStage }}
                    </span>
                  </td>

                  <!-- Outcome & No-Bid Reason (Section 9) -->
                  <td class="py-3 px-4">
                    <div class="flex flex-col space-y-1">
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded font-bold text-xs w-max"
                        :class="
                          opp.outcome === 'Won'
                            ? 'bg-emerald-100 text-emerald-800'
                            : opp.outcome === 'Lost'
                            ? 'bg-rose-100 text-rose-800'
                            : opp.outcome === 'No-Bid'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-50 text-blue-700'
                        "
                      >
                        {{ opp.outcome }}
                      </span>
                      <!-- Mandatory No-Bid Reason Output (v-if="outcome === 'No-Bid'") -->
                      <div v-if="opp.outcome === 'No-Bid'" class="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                        Reason: {{ opp.noBidReason || 'Unspecified' }}
                      </div>
                    </div>
                  </td>

                  <!-- Due Date -->
                  <td class="py-3 px-4 font-mono text-gray-700">
                    {{ opp.dueDate }}
                  </td>

                  <!-- Potential Revenue in Euros (€) -->
                  <td class="py-3 px-4 text-right font-bold text-gray-900 text-sm">
                    €{{ opp.potentialRevenue.toLocaleString('de-DE') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import RFPDashboard from './components/RFPDashboard.vue'
import RFPWizard from './components/RFPWizard.vue'
import { useRFPStore } from './store/rfpStore'
import type { RFPOpportunity } from './types'

const store = useRFPStore()

const activeTab = ref<'dashboard' | 'all'>('dashboard')
const showWizard = ref<boolean>(false)
const searchQuery = ref<string>('')
const outcomeFilter = ref<string>('ALL')

const handleWizardSubmit = (payload: Omit<RFPOpportunity, 'id' | 'createdDate'>) => {
  store.addOpportunity(payload)
  showWizard.value = false
  activeTab.value = 'dashboard'
}

const filteredOpportunities = computed(() => {
  return store.opportunities.value.filter((opp) => {
    const matchesSearch =
      opp.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      opp.client.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      opp.industry.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesOutcome =
      outcomeFilter.value === 'ALL' || opp.outcome === outcomeFilter.value

    return matchesSearch && matchesOutcome
  })
})
</script>
