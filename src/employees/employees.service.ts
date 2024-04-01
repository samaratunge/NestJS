import { Injectable } from '@nestjs/common';
import { Employee, EmployeeStatus, EmployeeTier } from './employees.model';
import { v1 as uuid } from 'uuid';
import { EmployeeSearchDto } from './EmployeeSearch.dto';
import { UpdateEmployeeCityDto } from './UpdateEmployeeCity.dto';
import { UpdateEmployeeDTO } from './UpdateEmployee.dto';
import { CreateEmployeeDTO } from './CreateEmployee.dto';

@Injectable()
export class EmployeesService {

    private employees : Employee [] = [];


    getAllEmployees(){
        return this.employees;
    }
    
    createEmployees(createEmployeeDTO : CreateEmployeeDTO){
        const { firstName, lastName, designation, nearestCity, tier, status} = createEmployeeDTO;
        const employee = {
            id: uuid(),
            firstName,
            lastName,
            designation,
            nearestCity,
            tier,
            status : EmployeeStatus.ACTIVE
        }
        //Push these values to employees array
        this.employees.push(employee);
        return employee;
    }

    employeeSearch(employeeSearchDto : EmployeeSearchDto){

        const {status, name} = employeeSearchDto;
        let employees = this.getAllEmployees();
        if(status){
            employees = employees.filter(employee => employee.status === status)
        }
        if(name){
            employees = employees.filter(employee => employee.firstName.includes(name)||employee.lastName.includes(name))
        }
        return employees;
    }

    getEmployeeByID(id : string) : Employee{
        let employees = this.getAllEmployees()
        return employees.find(employee => employee.id === id);
    }

    updateEmployeeCity(updateEmployeeCityDTO : UpdateEmployeeCityDto) : Employee{
        const {id, newCity} = updateEmployeeCityDTO;
        let employee = this.getEmployeeByID(id);
        employee.nearestCity = newCity;
        return employee;
    }

    updateEmployee(updateEmployeeDTO : UpdateEmployeeDTO) : Employee{
        const {id, firstName, lastName, designation, nearestCity, tier, status} = updateEmployeeDTO;
        let employee = this.getEmployeeByID(id);        
        employee.firstName = firstName;
        employee.lastName = lastName;
        employee.designation = designation;
        employee.nearestCity = nearestCity;
        employee.tier = tier;
        employee.status = status;
        return employee;
    }

    deleteEmployee(id : string){
        let employees = this.getAllEmployees();
        this.employees = employees.filter(employee => employee.id != id);    
        return (employees.length != this.employees.length);     
    }
}
