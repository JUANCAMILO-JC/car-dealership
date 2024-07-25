import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid'
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [

        // { id: uuid(), brand: 'BMW', model:'M3' },
        
    ]

    findAll() {
        return this.cars;
    }

    findOneById( id:string ) {

        const car = this.cars.find(car => car.id == id);
        if (!car) {
            throw new NotFoundException(`Car with id '${id} not found`);
        }
        return car;
    }

    create( createCarDto: CreateCarDTO ) {
        const newCar: Car = { 
            id: uuid(),
            // brand: createCarDto.brand,
            // model: createCarDto.model
            ...createCarDto
        }

        this.cars.push( newCar );

        return newCar;
    }

    update( id:string, updateCarDto: UpdateCarDTO ) {

        let carDB = this.findOneById(id);

        if (updateCarDto.id && updateCarDto.id !== id) {
            throw new BadRequestException(`Car id is not valid`)
        }

        this.cars = this.cars.map(car => {
            if (car.id == id) {
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id
                }
                return carDB
            }
            return car
        })
        return carDB

        
    }

    delete( id:string ) {
        const carDB = this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== id);
    }

    fillCarsWithSeedData( cars: Car[] ) {
        this.cars = cars;
    }

}
