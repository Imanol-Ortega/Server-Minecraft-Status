import type { APIMC } from "@/types/interfaces";
import axios from "axios"
export async function getStatus(): Promise<APIMC>{
    const response = await axios.get<APIMC>(`https://api.mcstatus.io/v2/status/java/181.122.92.245`);
    return response.data;
}