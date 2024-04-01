import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { EmployeeStatus, EmployeeTier } from "src/employees/Employee.enum";

//Mongo uses all Strings with Capital "S" hence modify as folllows.
/** 
export const EmployeeSchema = ({
    id:String,
    firstName:String,
    lastName:String,
    designation:String,
    nearestCity:String,
    tier : EmployeeTier,
    status : EmployeeStatus
})
*/

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee{

    @Prop()
    id:string

    @Prop({required:true})
    firstName:string

    @Prop()
    lastName:String

    @Prop()
    designation:string

    @Prop()
    nearestCity:string

    @Prop()
    tier : EmployeeTier

    @Prop()
    status : EmployeeStatus
}