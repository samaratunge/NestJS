import { IsNotEmpty, NotEquals } from "class-validator";
import { EmployeeStatus, EmployeeTier } from "./Employee.enum";
import { notEqual } from "assert";

export class CreateEmployeeDTO{
    
    @IsNotEmpty()
    firstName:string
    @IsNotEmpty()
    lastName:string
    @NotEquals('CEO')
    designation:string
    nearestCity:string
    tier : EmployeeTier
    status : EmployeeStatus
}
