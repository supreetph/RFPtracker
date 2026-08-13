<template>
  <div class="space-y-8">
    <!-- ================================================================= -->
    <!-- SECTION 4: PIPELINE SUMMARY METRICS BAR -->
    <!-- Displays exactly 5 summary cards in strict chronological order: -->
    <!-- 1. Total RFPs ➔ 2. Bid ➔ 3. Draft ➔ 4. Submitted ➔ 5. Won -->
    <!-- Layout: grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6 -->
    <!-- Styling: text-xs font-semibold uppercase tracking-wider text-gray-500 -->
    <!-- paired with large bold text-2xl font-bold text-gray-900 -->
    <!-- ================================================================= -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm font-bold uppercase tracking-wider text-gray-700">Pipeline Operational Summary</h2>
        <span class="text-xs text-gray-400">Strict Pipeline Stage Sequence</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        <div
          v-for="metric in store.summaryMetrics.value"
          :key="metric.key"
          class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md"
        >
          <!-- Subtle Gray Title -->
          <div class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
            {{ metric.label }}
          </div>
          <!-- Large Bold Indicator -->
          <div class="text-2xl font-bold text-gray-900">
            {{ metric.count }}
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================================= -->
    <!-- SECTION 7: DEADLINE OVERVIEW TILES -->
    <!-- Distinct visual row/grid of critical timeline micro-metrics: -->
    <!-- Due Today: border-l-4 border-red-500 bg-red-50 text-red-900 -->
    <!-- Due Date Crossed: border-l-4 border-rose-600 bg-rose-50 text-rose-900 -->
    <!-- This Week: border-l-4 border-orange-500 bg-orange-50 text-orange-900 -->
    <!-- Approval Pending: border-l-4 border-indigo-500 bg-indigo-50 text-indigo-900 -->
    <!-- At Risk: border-l-4 border-amber-500 bg-amber-50 text-amber-900 -->
    <!-- ================================================================= -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm font-bold uppercase tracking-wider text-gray-700">Deadline & Critical Risk Overview</h2>
        <span class="text-xs text-gray-400">Real-time Timeline Tracking</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Tile 1: Due Today -->
        <div class="p-4 rounded-r-lg border-l-4 border-red-500 bg-red-50 text-red-900 shadow-sm transition-transform hover:-translate-y-0.5">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold uppercase tracking-wider">Due Today</span>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800">Urgent</span>
          </div>
          <div class="text-2xl font-black">
            {{ store.deadlineMetrics.value.dueToday }}
          </div>
          <p class="text-xs text-red-700 mt-1 opacity-90">Requires immediate submission</p>
        </div>

        <!-- Tile 2: Due Date Crossed -->
        <div class="p-4 rounded-r-lg border-l-4 border-rose-600 bg-rose-50 text-rose-900 shadow-sm transition-transform hover:-translate-y-0.5">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold uppercase tracking-wider">Due Date Crossed</span>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-800">Overdue</span>
          </div>
          <div class="text-2xl font-black">
            {{ store.deadlineMetrics.value.dateCrossed }}
          </div>
          <p class="text-xs text-rose-700 mt-1 opacity-90">Missed submission window</p>
        </div>

        <!-- Tile 3: This Week -->
        <div class="p-4 rounded-r-lg border-l-4 border-orange-500 bg-orange-50 text-orange-900 shadow-sm transition-transform hover:-translate-y-0.5">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold uppercase tracking-wider">This Week</span>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-orange-100 text-orange-800">Upcoming</span>
          </div>
          <div class="text-2xl font-black">
            {{ store.deadlineMetrics.value.thisWeek }}
          </div>
          <p class="text-xs text-orange-700 mt-1 opacity-90">Due within next 7 days</p>
        </div>

        <!-- Tile 4: Approval Pending -->
        <div class="p-4 rounded-r-lg border-l-4 border-indigo-500 bg-indigo-50 text-indigo-900 shadow-sm transition-transform hover:-translate-y-0.5">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold uppercase tracking-wider">Approval Pending</span>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-indigo-100 text-indigo-800">Review</span>
          </div>
          <div class="text-2xl font-black">
            {{ store.deadlineMetrics.value.approvalPending }}
          </div>
          <p class="text-xs text-indigo-700 mt-1 opacity-90">Internal sign-off required</p>
        </div>

        <!-- Tile 5: At Risk -->
        <div class="p-4 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 text-amber-900 shadow-sm transition-transform hover:-translate-y-0.5">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold uppercase tracking-wider">At Risk</span>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">Warning</span>
          </div>
          <div class="text-2xl font-black">
            {{ store.deadlineMetrics.value.atRisk }}
          </div>
          <p class="text-xs text-amber-700 mt-1 opacity-90">Resource or tech bottleneck</p>
        </div>
      </div>
    </div>

    <!-- ================================================================= -->
    <!-- SECTION 6: REVENUE CHART FILTER CONTROLLERS & VISUALIZATION -->
    <!-- Directly above dashboard's revenue space: row layout toggle Revenue by: -->
    <!-- Choice tags/styled inline filter buttons: Industry, Client, Geography -->
    <!-- ================================================================= -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <!-- Toolbar Filter Controllers -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-gray-100">
        <div>
          <h3 class="text-base font-bold text-gray-900">Potential Revenue Pipeline Analytics</h3>
          <p class="text-xs text-gray-500">Total pipeline financial volume aggregated in Euros (€)</p>
        </div>

        <!-- Row layout displaying options to toggle "Revenue by:" -->
        <div class="flex items-center space-x-2">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue by:</span>
          <div class="inline-flex p-1 bg-gray-100 rounded-lg space-x-1">
            <button
              v-for="cat in (['Industry', 'Client', 'Geography'] as const)"
              :key="cat"
              @click="store.setRevenueFilter(cat)"
              class="px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150"
              :class="
                store.revenueFilterCategory.value === cat
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              "
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>

      <!-- Visualization Chart Area -->
      <div class="space-y-4">
        <div class="flex justify-between items-center text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">
          <span>{{ store.revenueBreakdown.value.category }} Segment</span>
          <span>Revenue Volume (€) & Distribution</span>
        </div>

        <div
          v-for="item in store.revenueBreakdown.value.sortedEntries"
          :key="item.name"
          class="space-y-1.5"
        >
          <div class="flex justify-between items-center text-sm">
            <span class="font-medium text-gray-800">{{ item.name }}</span>
            <div class="flex items-center space-x-3">
              <span class="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                {{ item.percentage }}%
              </span>
              <span class="font-bold text-gray-900">
                €{{ item.value.toLocaleString('de-DE') }}
              </span>
            </div>
          </div>

          <!-- Progress Bar Graphic -->
          <div class="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div
              class="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${item.percentage}%` }"
            ></div>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-bold text-gray-900">
          <span>Grand Total Pipeline Potential Revenue</span>
          <span class="text-lg text-blue-700">€{{ store.revenueBreakdown.value.grandTotal.toLocaleString('de-DE') }}</span>
        </div>
      </div>
    </div>

    <!-- ================================================================= -->
    <!-- SECTION 5: ACCORDION STRUCTURE FOR OUTCOMES -->
    <!-- Custom vertical accordion toggle to easily collapse or dive into processed opportunities -->
    <!-- Group headers by outcome: Won, Lost, and Submitted -->
    <!-- Controlled via reactive Vue booleans per section -->
    <!-- Styling: bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-t-lg cursor-pointer flex justify-between items-center -->
    <!-- Rotating chevron icon (transition-transform duration-200) for open/closed state -->
    <!-- ================================================================= -->
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-lg font-bold text-gray-900">Processed Opportunity Outcomes</h2>
          <p class="text-xs text-gray-500">Grouped accordions for Won, Lost, and Submitted opportunities</p>
        </div>
        <div class="flex space-x-2 text-xs">
          <button @click="expandAll" class="text-blue-600 hover:underline">Expand All</button>
          <span class="text-gray-300">|</span>
          <button @click="collapseAll" class="text-gray-600 hover:underline">Collapse All</button>
        </div>
      </div>

      <!-- ACCORDION 1: WON OUTCOMES -->
      <div class="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white">
        <!-- Header -->
        <div
          @click="isWonOpen = !isWonOpen"
          class="bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-t-lg cursor-pointer flex justify-between items-center transition-colors"
        >
          <div class="flex items-center space-x-3">
            <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span class="font-bold text-gray-900 text-sm">Won Opportunities</span>
            <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
              {{ store.wonOpportunities.value.length }} Items
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-xs font-semibold text-emerald-700">
              Total Won: €{{ totalWonRevenue.toLocaleString('de-DE') }}
            </span>
            <!-- Pure CSS/Tailwind rotating chevron icon -->
            <svg
              class="w-5 h-5 text-gray-500 transition-transform duration-200 transform"
              :class="{ 'rotate-180': isWonOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- Accordion Body -->
        <div v-show="isWonOpen" class="p-4 border-t border-gray-100 space-y-3">
          <div v-if="store.wonOpportunities.value.length === 0" class="text-xs text-gray-400 italic">
            No won opportunities logged yet.
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                  <th class="py-2 px-3">Opportunity Name</th>
                  <th class="py-2 px-3">Client</th>
                  <th class="py-2 px-3">Business Unit</th>
                  <th class="py-2 px-3">Owner</th>
                  <th class="py-2 px-3 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="opp in store.wonOpportunities.value" :key="opp.id" class="hover:bg-emerald-50/40">
                  <td class="py-2.5 px-3 font-semibold text-gray-900">{{ opp.name }}</td>
                  <td class="py-2.5 px-3 text-gray-700">{{ opp.client }}</td>
                  <td class="py-2.5 px-3 text-gray-600">{{ opp.businessUnit }}</td>
                  <td class="py-2.5 px-3 text-gray-600">{{ opp.rfpOwnerPM }}</td>
                  <td class="py-2.5 px-3 font-bold text-emerald-700 text-right">€{{ opp.potentialRevenue.toLocaleString('de-DE') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ACCORDION 2: LOST OUTCOMES -->
      <div class="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white">
        <!-- Header -->
        <div
          @click="isLostOpen = !isLostOpen"
          class="bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-t-lg cursor-pointer flex justify-between items-center transition-colors"
        >
          <div class="flex items-center space-x-3">
            <span class="w-3 h-3 rounded-full bg-rose-500"></span>
            <span class="font-bold text-gray-900 text-sm">Lost Opportunities</span>
            <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-100 text-rose-800">
              {{ store.lostOpportunities.value.length }} Items
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-xs font-semibold text-rose-700">
              Lost Potential: €{{ totalLostRevenue.toLocaleString('de-DE') }}
            </span>
            <!-- Pure CSS/Tailwind rotating chevron icon -->
            <svg
              class="w-5 h-5 text-gray-500 transition-transform duration-200 transform"
              :class="{ 'rotate-180': isLostOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- Accordion Body -->
        <div v-show="isLostOpen" class="p-4 border-t border-gray-100 space-y-3">
          <div v-if="store.lostOpportunities.value.length === 0" class="text-xs text-gray-400 italic">
            No lost opportunities logged.
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                  <th class="py-2 px-3">Opportunity Name</th>
                  <th class="py-2 px-3">Client</th>
                  <th class="py-2 px-3">Tech Stack</th>
                  <th class="py-2 px-3">Owner</th>
                  <th class="py-2 px-3 text-right">Lost Value</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="opp in store.lostOpportunities.value" :key="opp.id" class="hover:bg-rose-50/40">
                  <td class="py-2.5 px-3 font-semibold text-gray-900">{{ opp.name }}</td>
                  <td class="py-2.5 px-3 text-gray-700">{{ opp.client }}</td>
                  <td class="py-2.5 px-3 text-gray-600">{{ opp.infrastructureProvider }} / {{ opp.microservicesLanguage }}</td>
                  <td class="py-2.5 px-3 text-gray-600">{{ opp.rfpOwnerPM }}</td>
                  <td class="py-2.5 px-3 font-bold text-rose-700 text-right">€{{ opp.potentialRevenue.toLocaleString('de-DE') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ACCORDION 3: SUBMITTED OUTCOMES -->
      <div class="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white">
        <!-- Header -->
        <div
          @click="isSubmittedOpen = !isSubmittedOpen"
          class="bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-t-lg cursor-pointer flex justify-between items-center transition-colors"
        >
          <div class="flex items-center space-x-3">
            <span class="w-3 h-3 rounded-full bg-blue-500"></span>
            <span class="font-bold text-gray-900 text-sm">Submitted Opportunities</span>
            <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              {{ store.submittedOpportunities.value.length }} Items
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-xs font-semibold text-blue-700">
              Pending Volume: €{{ totalSubmittedRevenue.toLocaleString('de-DE') }}
            </span>
            <!-- Pure CSS/Tailwind rotating chevron icon -->
            <svg
              class="w-5 h-5 text-gray-500 transition-transform duration-200 transform"
              :class="{ 'rotate-180': isSubmittedOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- Accordion Body -->
        <div v-show="isSubmittedOpen" class="p-4 border-t border-gray-100 space-y-3">
          <div v-if="store.submittedOpportunities.value.length === 0" class="text-xs text-gray-400 italic">
            No submitted opportunities pending evaluation.
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                  <th class="py-2 px-3">Opportunity Name</th>
                  <th class="py-2 px-3">Client</th>
                  <th class="py-2 px-3">Stage</th>
                  <th class="py-2 px-3">Due Date</th>
                  <th class="py-2 px-3 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="opp in store.submittedOpportunities.value" :key="opp.id" class="hover:bg-blue-50/40">
                  <td class="py-2.5 px-3 font-semibold text-gray-900">{{ opp.name }}</td>
                  <td class="py-2.5 px-3 text-gray-700">{{ opp.client }}</td>
                  <td class="py-2.5 px-3">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {{ opp.lifecycleStage }}
                    </span>
                  </td>
                  <td class="py-2.5 px-3 text-gray-600">{{ opp.dueDate }}</td>
                  <td class="py-2.5 px-3 font-bold text-blue-700 text-right">€{{ opp.potentialRevenue.toLocaleString('de-DE') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRFPStore } from '../store/rfpStore'

const store = useRFPStore()

// Reactive Vue booleans per section for Section 5 Accordion control
const isWonOpen = ref<boolean>(true)
const isLostOpen = ref<boolean>(false)
const isSubmittedOpen = ref<boolean>(true)

const expandAll = () => {
  isWonOpen.value = true
  isLostOpen.value = true
  isSubmittedOpen.value = true
}

const collapseAll = () => {
  isWonOpen.value = false
  isLostOpen.value = false
  isSubmittedOpen.value = false
}

const totalWonRevenue = computed(() =>
  store.wonOpportunities.value.reduce((acc, o) => acc + (o.potentialRevenue || 0), 0)
)

const totalLostRevenue = computed(() =>
  store.lostOpportunities.value.reduce((acc, o) => acc + (o.potentialRevenue || 0), 0)
)

const totalSubmittedRevenue = computed(() =>
  store.submittedOpportunities.value.reduce((acc, o) => acc + (o.potentialRevenue || 0), 0)
)
</script>
