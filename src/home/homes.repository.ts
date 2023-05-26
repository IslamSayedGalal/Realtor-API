/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Home, HomeDocument } from "./schemas/home.schema";

@Injectable()
export class HomesRepository {
    constructor(@InjectModel(Home.name) private homeModel: Model<HomeDocument>) {}

    async findOne(homeFilterQuery: FilterQuery<Home>): Promise<Home> {
        return this.homeModel.findOne(homeFilterQuery);
    }

    async find(homesFilterQuery: FilterQuery<Home>): Promise<Home[]> {
        return this.homeModel.find(homesFilterQuery)
    }

    async create(home: Home): Promise<Home> {
        const newUser = new this.homeModel(home);
        return newUser.save()
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<Home>, user: Partial<Home>): Promise<Home> {
        return this.homeModel.findOneAndUpdate(userFilterQuery, user, { new: true });
    }
}