<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/shared/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    v-model="modelValue"
    :class="cn(`
      flex h-10 w-full rounded-md border border-blue-500 bg-slate-50 px-3 py-2
      text-sm shadow-[0_0_0_2px_rgba(0,133,255,.16)] ring-offset-background

      disabled:cursor-not-allowed disabled:opacity-50

      file:border-0 file:bg-transparent file:text-sm file:font-medium

      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
      focus-visible:ring-offset-2

      placeholder:text-slate-500
    `, props.class)"
  >
</template>
