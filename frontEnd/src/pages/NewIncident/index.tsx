import React, { useState, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import IncidentService from '../../services/IncidentsService'

import logoImg from '../../assets/logo.svg'

import './styles.css'

export default function NewIncident() {

    const ongId = localStorage.getItem('ongId')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)

    const history = useHistory()

    const handleNewIncident = async (event: FormEvent) => {
        event.preventDefault()

        const id = await IncidentService.create({
            title,
            description,
            value
        }, ongId)

        if (id){
            history.push('/profile')
        }   

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar um novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um héroi para
                        resolver isso.
                    </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descricao"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(parseFloat(e.target.value))}
                    />
                    
                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    )
}
