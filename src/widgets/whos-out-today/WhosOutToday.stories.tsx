import type { Meta, StoryObj } from '@storybook/vue3'
import { WhosOutToday } from '.'

const meta = {
  title: 'WhosOutToday',
  component: WhosOutToday,
} satisfies Meta<typeof WhosOutToday>

export default meta

export const Default: StoryObj<typeof meta> = {
  storyName: 'WhosOutToday',
}
