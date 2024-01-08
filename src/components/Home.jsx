// Home.jsx

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Fetch from "./Fetch";
function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  console.log(auth);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        localStorage.setItem("user", uid);
        console.log("uuid", uid);
        setName(user.email);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <p className="text-2xl font-bold">Welcome {name}</p>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      <div className="p-4">
        <Fetch />
      </div>
    </div>
  );
}

export default Home;
