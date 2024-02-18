import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3301/")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = () => {
    axios.get("http://localhost:3301/") 
        .then(res => {
            location.reload(true)
        }).catch(err => console.error(err))
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {auth ? (
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">
            You are authorized, {name}!
          </h3>
          <button onClick={handleDelete} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">{message}</h3>
          <h3 className="text-xl font-bold mb-4">Login, {name}!</h3>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block mt-4"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
