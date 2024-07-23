export interface Employee {
  firstName: string
  lastName: string
  avatar: string
  position: string
  team: string
  department: string
  division: string
  location: string
}

export const LeaveRequestType = {
  Leave: 'Leave',
  Holiday: 'Holiday',
} as const
// eslint-disable-next-line ts/no-redeclare
export type LeaveRequestType = typeof LeaveRequestType[keyof typeof LeaveRequestType]

export interface LeaveRequest {
  employee: Employee
  endDate: Date
  leaveRequestType: LeaveRequestType
}
