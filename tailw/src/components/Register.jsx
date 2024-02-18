import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'


const Register = () => {

    const[values, setValues] = useState({
        name: '',
        email: '',
        passw: ''
    })

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3301/register', values)
            .then(res => {
                if(res.data.Status === "Success") {
                    navigate('/login')
                } else {
                    console.log("Error")
                }
            })
                .catch(err => console.error(err))
        
    }


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div>
      <form className="bg-white shadow-md rounded px-10 py-8 mb-4 max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nome de usuário:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name='username'
            type="text"
            placeholder="Nome de usuário"
            onChange={(e) => setValues({...values, name: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            E-mail:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name='email'
            type="email"
            placeholder="exemplo@gmail.com"
            onChange={(e) => setValues({...values, email: e.target.value})}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Senha:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name='passw'
            placeholder="********"
            onChange={(e) => setValues({...values, passw: e.target.value})}
          />
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Entrar
          </button>
          <div className="text-center">
          <span className="text-sm text-gray-600">Já tem uma conta?</span>
          <Link to="/login" className="text-blue-500 hover:text-blue-700 font-bold">Entre!</Link>
        </div>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Register