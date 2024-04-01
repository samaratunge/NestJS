import { EmployeeStatus, EmployeeTier } from "./employees.model";

export interface UpdateEmployeeDTO{
        id: string,
        firstName: string,
        lastName: string,
        designation: string,
        nearestCity: string,
        tier: EmployeeTier,
        status: EmployeeStatus
}