import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const[values, setValues] = useState({
        email: "",
        passw: ""
    })

    const navigate = useNavigate()

        axios.defaults.withCredentials = true

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3301/login', values)
            .then(res => {
                if(res.data.Status === "Success") {
                    navigate("/")
                } else {
                    console.log("error")
                }
            })
    }


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div>
        <form className="bg-white shadow-md rounded px-10 py-8 mb-4 max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              E-mail:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              onChange={(e) => setValues({...values, email: e.target.value})}
              placeholder="exemplo@gmail.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Senha:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="passw"
              type="password"
              onChange={(e) => setValues({...values, passw: e.target.value})}
              placeholder="********"
            />
          </div>
          <div className="text-center mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Entrar
            </button>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">Não tem uma conta?</span>
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-700 font-bold"
            >
              Registrar-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
