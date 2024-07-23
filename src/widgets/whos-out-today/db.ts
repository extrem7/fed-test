import { ref } from 'vue'
import { faker } from '@faker-js/faker'
import { type LeaveRequest, LeaveRequestType } from '@/shared/types'

export const leaveRequests = ref(
  Array.from({ length: 100 }).fill(null).map((): LeaveRequest => ({
    employee: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      avatar: faker.image.avatar(),
      position: faker.person.jobTitle(),
      team: faker.person.jobArea(),
      department: faker.person.jobArea(),
      division: faker.person.jobArea(),
      location: faker.location.city(),
    },
    endDate: faker.date.future(),
    leaveRequestType: faker.helpers.arrayElement(Object.values(LeaveRequestType)),
  })),
)
