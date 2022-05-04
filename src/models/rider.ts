// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class dispatchRiders {
    constructor(public RiderName: string, public BikePlateNum: number, public BikeModel: string, public id?: ObjectId) {}
}