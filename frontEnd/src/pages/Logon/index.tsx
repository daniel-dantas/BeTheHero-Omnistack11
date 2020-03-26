import React, { useState, FormEvent } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import OngService from '../../services/OngService'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {

  const [id, setId] = useState('')

  const history = useHistory()

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    const nameOng: string = await OngService.authentic(id)

    if(nameOng){
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', nameOng)
      history.push('/profile')
    }else{
      alert('Falha no login, tente novamente!')
    }

  }

  return (
      <div className="logon-container">
          <section className="form">
            <img src={logoImg} alt="Be The Hero"/>
          
            <form onSubmit={handleLogin}>
              <h1>Faça seu logon</h1>
              <input
                placeholder="Sua ID"
                value={id}
                onChange={e => setId(e.target.value)}
              />
              <button className="button" type="submit">Entrar</button>

              <Link className="back-link" to="/register">
                <FiLogIn size={16} color="#e02041"/>
                Não tenho cadastro
              </Link>

            </form>

          </section>
          <img src={heroesImg} alt="Heroes"/>
      </div>
  )
}
