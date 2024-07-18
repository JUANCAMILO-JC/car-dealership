import { IsString } from "class-validator";

export class CreateCarDTO {

    @IsString({ message: 'Must be a string' })
    readonly brand: string;
    @IsString()
    readonly model: string;
    
}