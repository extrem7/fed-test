<script setup lang="ts">
import { computed, ref } from 'vue'
import { refDebounced } from '@vueuse/core'
import { useFuse } from '@vueuse/integrations/useFuse'
import { UseVirtualList } from '@vueuse/components'
import { Search } from 'lucide-vue-next'

import { leaveRequests } from './db'

import { type LeaveRequest, LeaveRequestType } from '@/shared/types'

import { Input } from '@/shared/ui/input'
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

const StaffTabs = {
  All: 'All',
  OnLeave: 'On leave',
  Holidays: 'Holidays',
} as const
// eslint-disable-next-line ts/no-redeclare
type StaffTabs = typeof StaffTabs[keyof typeof StaffTabs]

const input = ref('')
const debouncedInput = refDebounced(input, 1000)

const { results } = useFuse(
  debouncedInput,
  leaveRequests,
  {
    fuseOptions: {
      keys: ['employee.firstName', 'employee.lastName'],
      threshold: 0,
    },
    matchAllWhenSearchEmpty: true,
  },
)

const staffTabs = computed((): Record<StaffTabs, LeaveRequest[]> => {
  const list = results.value.map(lr => lr.item)

  return {
    [StaffTabs.All]: list,
    [StaffTabs.OnLeave]: list.filter(lr => lr.leaveRequestType === LeaveRequestType.Holiday),
    [StaffTabs.Holidays]: list.filter(lr => lr.leaveRequestType === LeaveRequestType.Leave),
  }
})
</script>

<template>
  <body class="bg-gray-100">
    <div class="flex min-h-screen items-center justify-center">
      <Dialog open>
        <DialogContent
          class="
            w-full max-w-sm rounded-lg bg-white px-4 py-3 shadow-lg

            lg:max-w-4xl
          "
        >
          <div
            class="-mx-4 flex items-center border-b px-4 pb-2"
          >
            <img src="./assets/logo.svg">

            <DialogTitle class="text-sm font-medium text-slate-900" as="h2">
              Who's out today
            </DialogTitle>
          </div>

          <div class="relative">
            <Search class="absolute left-3 top-3 size-4 text-slate-500" />
            <Input v-model="input" placeholder="Search..." class="indent-5" />
          </div>

          <Tabs :default-value="StaffTabs.All">
            <TabsList>
              <TabsTrigger
                v-for="(list, tab) in staffTabs"
                :key="tab"
                :value="tab"
                class="gap-2 tabs-trigger"
                :aria-label="tab"
              >
                {{ tab }}

                <span
                  class="
                    rounded border border-white bg-slate-100 px-1.5 py-0.5
                    text-xs font-medium text-gray-500 tabs-trigger-count
                  "
                >
                  {{ list.length }}
                </span>
              </TabsTrigger>
            </TabsList>

            <div id="tabs-content-target" class="overflow-x-hidden">
              <TabsContent
                v-for="(list, tab) in staffTabs"
                :key="tab"
                :value="tab"
                class="
                  opacity-1 transition-opacity duration-1000

                  [&[hidden]]:block [&[hidden]]:opacity-0
                "
              >
                <UseVirtualList
                  class="
                    mt-4 pr-1 scrollbar-thin
                    scrollbar-track-transparentscrollbar-thumb-slate-200
                    scrollbar-thumb-rounded-full
                  "
                  :list="list"
                  :options="{ itemHeight: 52, overscan: 14 }"
                  height="308px"
                >
                  <template
                    #default="{
                      data: {
                        employee: {
                          firstName,
                          lastName,
                          position,
                          avatar,
                        },
                      },
                    }"
                  >
                    <div
                      class="mb-2 flex h-[44px] items-center justify-between"
                    >
                      <div class="flex items-center">
                        <img
                          class="h-10 w-10 rounded-full"
                          :src="avatar"
                        >

                        <div class="ml-3">
                          <p class="text-sm font-medium">
                            {{ firstName }} {{ lastName }}
                          </p>

                          <p class="text-xs text-gray-500">
                            {{ position }}
                          </p>
                        </div>
                      </div>

                      <div class="flex gap-2">
                        <span class="text-xs text-gray-500">Till 16 Jul</span>

                        <div class="bg-slate-100 p-1.5">
                          <img src="./assets/plane.svg">
                        </div>
                      </div>
                    </div>
                  </template>
                </UseVirtualList>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  </body>
</template>

<style>
.tabs-trigger[data-state="active"] .tabs-trigger-count{
    @apply bg-white !important;
}
</style>
