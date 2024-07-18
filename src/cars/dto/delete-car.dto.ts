import { IsOptional, IsString, IsUUID } from "class-validator";

export class DeleteCarDTO {

    @IsString()
    @IsUUID()
    @IsOptional()
    id: string;

    @IsOptional()
    @IsString({ message: 'Must be a string' })
    readonly brand?: string;

    @IsOptional()
    @IsString()
    readonly model?: string;
    
}