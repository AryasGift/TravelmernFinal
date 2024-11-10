import { BASE_URL } from "../utils/config";
import { commonApi } from "./commonApi";

export const addTravelApi=async(bodyData,headerData)=>{
    return await commonApi('POST',`${BASE_URL}/tours/createTour`,bodyData,headerData)
}