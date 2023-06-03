import { useEffect, useState } from "react";
import "./App.css";
import jwt_decode from "jwt-decode";
import { BluetoothChecker } from "./components/BluetoothChecker.jsx";

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    let userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById("signIn").hidden = true;
    document.getElementById("welcome").hidden = true;
  }

  const handleSignOut = (event) => {
    setUser({});
    document.getElementById("signIn").hidden = false;
    document.getElementById("welcome").hidden = false;
  };

  useEffect(() => {
    /* google auth */
    google.accounts.id.initialize({
      client_id:
        "767201073148-21apn27nm9sqc6fq1pp3hens0v76aa11.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signIn"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
          <section id='welcome'>
          <h1>Visualizador de batería bluetooth</h1>
          <p>Ingresa con Google para comenzar</p>
          </section>
          <div id="signIn"  ></div>
      {Object.keys(user).length != 0 && (
        <>
          <aside>
            <img src={user.picture}></img>
            <p>¡Bienvenido {user.name}!</p>
            <p>Estás usando la aplicación de control de batería 🔋</p>
            <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
          </aside>
          <main>
            <h1>App de bateria</h1>
            <BluetoothChecker/>
          </main>
        </>
      )}
    </>
  );
}

export default App;
