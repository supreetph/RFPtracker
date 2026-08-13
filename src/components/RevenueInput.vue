<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <!-- Absolute positioned layout container for structural currency prefix -->
    <div class="relative rounded-md shadow-sm">
      <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none font-medium select-none">
        {{ currencySymbol }}
      </div>
      
      <!-- Base text element with pl-7 directly applied -->
      <input
        :id="id"
        type="text"
        :value="displayValue"
        @input="handleInput"
        @blur="handleBlur"
        :placeholder="placeholder"
        :required="required"
        class="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-150"
      />
    </div>
    <p v-if="error" class="mt-1 text-xs text-red-600 font-medium">{{ error }}</p>
    <p v-else class="mt-1 text-xs text-gray-500">Value automatically sanitized to raw integer payload in Euros ({{ currencySymbol }}).</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: number | null | undefined
    label?: string
    id?: string
    currencySymbol?: string
    placeholder?: string
    required?: boolean
    error?: string
  }>(),
  {
    currencySymbol: '€',
    placeholder: 'e.g. 250000',
    required: false,
    id: 'potential-revenue-input'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

// Format integer into locale string for pleasant user display, while bound value remains raw integer
const rawString = ref<string>(props.modelValue ? props.modelValue.toString() : '')

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal === null || newVal === undefined || isNaN(newVal)) {
      rawString.value = ''
    } else {
      rawString.value = newVal.toString()
    }
  },
  { immediate: true }
)

const displayValue = computed(() => {
  if (!rawString.value) return ''
  const num = parseInt(rawString.value, 10)
  if (isNaN(num)) return ''
  return num.toLocaleString('de-DE') // Clean European integer formatting e.g. 250.000
})

// Input event interceptor: regex matching numbers only (/^\d+$/) and stripping formatting dynamically
const handleInput = (event: Event) => {
  const inputEl = event.target as HTMLInputElement
  const rawInput = inputEl.value

  // Strip all non-digit characters (including accidental $, €, commas, letters)
  const cleanedDigits = rawInput.replace(/\D/g, '')

  if (!cleanedDigits) {
    rawString.value = ''
    emit('update:modelValue', 0)
    return
  }

  // Verify regex numbers only (/^\d+$/)
  if (/^\d+$/.test(cleanedDigits)) {
    const cleanInteger = parseInt(cleanedDigits, 10)
    rawString.value = cleanInteger.toString()
    emit('update:modelValue', cleanInteger)
  }
}

const handleBlur = () => {
  if (!rawString.value) {
    emit('update:modelValue', 0)
  }
}
</script>
