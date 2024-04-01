import { EmployeeStatus } from "./employees.model";

export interface EmployeeSearchDto{
    status : EmployeeStatus,
    name : string
}