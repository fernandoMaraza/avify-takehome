import api from "../api/api"
import { IEnergyList } from "../interfaces/energyList.interface"

export default {
    async getAsync():Promise<IEnergyList> {
        try {
            const response = await api.get('generation')
            return response.data as IEnergyList
        } catch (error) {
            throw new Error("Error fetch data")
        }
       
    }
}