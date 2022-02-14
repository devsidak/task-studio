import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { auth } from "./config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "@firebase/auth";

function App() {
  const [user, setUser] = React.useState(null);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  //Function for authenticating users from firebase;
  const Authentication = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        "er.singhsaab@gmail.com",
        "sidak123232321"
      );
      console.log("User - ", user);
    } catch (e) {
      console.log("Error - ", e);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Dashboard />} />
      </Routes>
       ̰{" "}
    </div>
  );
}

export default App;
