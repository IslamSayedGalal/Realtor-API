/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type HomeDocument = Home & Document;
@Schema()
export class Home {
    @Prop()
    homeId: string;

    @Prop()
    address: string;

    @Prop()
    number_of_bedrooms: number;

    @Prop()
    city: string;

    @Prop()
    listed_date: Date;

    @Prop()
    price: number;

    @Prop([String])
    image: string[];

    @Prop()
    land_size: number;

    @Prop()
    propertyType: string; 

    @Prop()
    number_of_bathrooms: number;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;

    @Prop()
    messages: string[];

    @Prop()
    realtor: string;

    @Prop()
    realtorId: string;
}

export const HomeSchema = SchemaFactory.createForClass(Home);