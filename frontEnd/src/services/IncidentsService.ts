import api from './api'

interface IncidentData{
    title: string,
    description: string,
    value: number,
}

export default class IncidentService {
    
    static profile = async (ongId: any) => {
        return await api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            return response.data
        }).catch(err => {
            return []
        })
    }

    static delete = async(id: string, ongId: any) => {
        return await api.delete(`incidents/${id}`, {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            return true
        }).catch(err => {
            return false
        })
    }
    
    static create = async(incitentData: IncidentData, ongId: any) => {
        return await api.post('incidents', incitentData, {
            headers: {
                Authorization: ongId
            }
        }).then( response => {
            return response.data.id
        }).catch( err => {
            return null
        })
    }

}