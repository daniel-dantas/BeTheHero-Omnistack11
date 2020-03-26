import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import IncidentsService from '../../services/IncidentsService'

import logoImg from '../../assets/logo.svg'

import './styles.css'

interface IncidentData{
    id: string,
    title: string,
    description: string,
    value: number,
    ong_id: string
}


export default function Profile() {

    const [incidents, setIncidents] = useState<IncidentData[]>([])

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    const history = useHistory()

    useEffect(() => {
        IncidentsService.profile(ongId).then(response => {
            setIncidents(response)
        })
    }, [ongId])

    const handleDeleteIncident = async (id: string) => {
        const result = await IncidentsService.delete(id, ongId)

        if(!result){
            alert('Erro ao deletar incidente')
        }

        setIncidents(incidents.filter(incitent => incitent.id !== id))

    }

    const handleLogout = () => {
        localStorage.clear()

        history.push('/')

    }

    return (
        <div className="profile-container">
                <header>
                    <img src={logoImg} alt="Be The Hero"/>
                    <span>Bem vinda, {ongName}</span>
                    <Link className="button" to="/incidents/new" >Cadastrar novo caso</Link>
                    <button type="button" onClick={handleLogout}>
                        <FiPower size={18} color="#e02041" />
                    </button>
                </header>

                <h1>Casos cadastrados</h1>

                <ul>
                    {incidents?.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>
                            
                            <strong>DESCRIÇÃO</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                                <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>
                        </li>
                    ))}
                </ul>

        </div>
    )
}
