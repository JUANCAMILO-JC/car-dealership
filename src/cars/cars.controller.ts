import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) {

    }

    @Get()
    getAllCars() {
        return this.carsService.findAll()
    }

    @Get(':id')
    getCarById( @Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
        console.log({id})
        return this.carsService.findOneById( id )
    }

    @Post()
    create( @Body() createCarDto: CreateCarDTO) {
        return this.carsService.create( createCarDto )
    }

    @Patch(':id')
    update( 
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDTO) {
        return this.carsService.update( id, updateCarDto );
    }

    @Delete(':id')
    delete( @Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.delete( id )
    }


}
