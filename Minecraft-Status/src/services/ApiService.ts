import type { APIMC } from "@/types/interfaces";
import axios from "axios"
export async function getStatus(): Promise<APIMC>{
    const response = await axios.get<APIMC>(`https://api.mcstatus.io/v2/status/java/${import.meta.env.PUBLIC_IP_SV_MC}`);
    return response.data;
}