<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'radix-vue'
import { cn } from '@/shared/lib/utils'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="cn(
      `
        inline-flex items-center justify-center whitespace-nowrap rounded-sm
        px-3 py-2.5 text-sm font-medium text-slate-500 ring-offset-background
        transition-all

        data-[state=active]:border-slate-200 data-[state=active]:bg-slate-100
        data-[state=active]:text-slate-900

        disabled:pointer-events-none disabled:opacity-50

        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        focus-visible:ring-offset-2
      `,
      props.class,
    )"
  >
    <slot />
  </TabsTrigger>
</template>
