import { Module } from '@nestjs/common';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from './employees/employees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './app.properties';

@Module({
  imports: [MongooseModule.forRoot(MONGO_CONNECTION)],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class AppModule {}
