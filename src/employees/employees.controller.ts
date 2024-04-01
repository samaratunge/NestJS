import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeStatus, EmployeeTier } from "./Employee.enum";
import { EmployeeSearchDto } from './EmployeeSearch.dto';
import { UpdateEmployeeCityDto } from './UpdateEmployeeCity.dto';
import { UpdateEmployeeDTO } from './UpdateEmployee.dto';
import { CreateEmployeeDTO } from './CreateEmployee.dto';
import { EmployeeTierValidationPipe } from 'src/employee-tier-validation/employee-tier-validation.pipe';

@Controller('employees')
export class EmployeesController {

    //Constructor Injection
    constructor(private employeesService : EmployeesService){
    }
    
    @Get()
    getAllEmployees(@Query() param : EmployeeSearchDto){
        if(Object.keys(param).length){
            return this.employeesService.employeeSearch(param);
        }else{
            return this.employeesService.getAllEmployees();
        }
    }

    @Get("/:id")
    getEmployeeByID(@Param('id') id:string){
        return this.employeesService.getEmployeeByID(id);
    }

    //1st Approach
    // @Post()
    // createEmployee2(@Body() request){
    //      return  this.employeesService.createEmployees(request.firstName, request.lastName, request.designation, 
    //         request.nearestCity, request.tier);
    // }

    //2nd Approach
    // @Post()
    // createEmployee(@Body('firstName') firstName:string, 
    //                @Body('lastName') lastName:string,
    //                @Body('designation') designation:string, 
    //                @Body('nearestCity') nearestCity:string,
    //                @Body('tier') tier: EmployeeTier,
    //                @Body('status') status: EmployeeStatus){
    //      return  this.employeesService.createEmployees(firstName, lastName, designation, nearestCity, tier, status);
    // }

    //3rd approach
    @Post()
    @UsePipes(ValidationPipe)
    @UsePipes(EmployeeTierValidationPipe)
    createEmployee(@Body() createEmployeeDTO : CreateEmployeeDTO){
         return  this.employeesService.createEmployees(createEmployeeDTO);
    }

    @Put("/:id/update")
    updateEmployee(@Param('id') id:string, @Body() updateEmployeeDto : UpdateEmployeeDTO){
        updateEmployeeDto.id = id;
        return this.employeesService.updateEmployee(updateEmployeeDto);
    }

    @Put("/:id/city")
    updateEmployeeCity(@Param('id') id:string, @Body() updateEmployeeCityDTO : UpdateEmployeeCityDto){
        updateEmployeeCityDTO.id = id;
        return this.employeesService.updateEmployeeCity(updateEmployeeCityDTO);
    }

    @Delete("/:id")
    @HttpCode(204)
    deleteEmployee(@Param('id') id:string){
        if(!this.employeesService.deleteEmployee(id)){
            throw new NotFoundException("Employee Not Exist");
        }       
    }

    

}
