import api from './api'

interface OngData{
    name: string,
    email: string,
    whatsapp:string,
    city: string,
    uf: string
}

export default class OngService{
    static create = async (ongData: OngData) => {
        return await api.post('ongs', ongData).then(response => {
            return response.data.id
        }).catch(err => {
            return null
        })
    }

    static authentic = async (id: string) => {
        return await api.post('session', { id }).then(response => {
            return response.data.name
        }).catch(err => {
            return null
        })
    }

}
