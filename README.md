# RFP Tracker (Vue 3 + TypeScript + Tailwind CSS)

An enterprise Request for Proposal (RFP) Opportunity Tracker built from scratch with Vue 3 Composition API (`<script setup>`), TypeScript, and native Tailwind CSS.

## Remote Repository Target
Remote Repository: `git@github.com:supreetph/RFPtracker.git`

To initialize or verify the remote origin, execute:
```bash
./setup-remote.sh
```
Or manually run:
```bash
git remote add origin git@github.com:supreetph/RFPtracker.git
```

## Key Features & Architecture

1. **Multi-Step Opportunity Wizard (`RFPWizard.vue`)**:
   - Progressive 3-step form (General Info ➔ Technology Stack ➔ Team Assignment).
   - Card container styled with `max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100`.
   - Unified inputs: `w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`.

2. **Structural Status Architecture & No-Bid Handling**:
   - Refactored two-dimensional state mapping:
     - `lifecycleStage`: (`Draft` | `Internal Review` | `Submitted`)
     - `outcome`: (`Pending` | `Won` | `Lost` | `No-Bid`)
   - Mandatory `noBidReason` capture on `No-Bid` selection (`v-if="outcome === 'No-Bid'"`).

3. **Potential Revenue Input Bug Fix (`RevenueInput.vue`)**:
   - Structural currency label locked to left margin (`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none`).
   - Base input with left padding `pl-7`.
   - Regex-based input interceptor `/^\d+$/` stripping non-numeric characters on input, ensuring clean integer payload bound to `v-model` in Euros (`€`).

4. **Pipeline Summary Metrics Bar (`RFPDashboard.vue`)**:
   - 5 exact summary cards in operational sequence:
     1. Total RFPs ➔ 2. Bid ➔ 3. Draft ➔ 4. Submitted ➔ 5. Won
   - Responsive grid `grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6`.
   - Labels: `text-xs font-semibold uppercase tracking-wider text-gray-500` paired with numbers `text-2xl font-bold text-gray-900`.

5. **Deadline Overview Tiles**:
   - Micro-metrics grid featuring status border indicators:
     - **Due Today**: `border-l-4 border-red-500 bg-red-50 text-red-900`
     - **Due Date Crossed**: `border-l-4 border-rose-600 bg-rose-50 text-rose-900`
     - **This Week**: `border-l-4 border-orange-500 bg-orange-50 text-orange-900`
     - **Approval Pending**: `border-l-4 border-indigo-500 bg-indigo-50 text-indigo-900`
     - **At Risk**: `border-l-4 border-amber-500 bg-amber-50 text-amber-900`

6. **Revenue Chart Analytics Toolbar**:
   - Interactive breakdown by **Industry**, **Client**, and **Geography**.

7. **Outcome Accordions**:
   - Grouped sections for **Won**, **Lost**, and **Submitted**.
   - Collapsible toggles with pure CSS/Tailwind rotating chevrons (`transition-transform duration-200 rotate-180`).

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
