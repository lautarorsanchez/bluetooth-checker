import { React, useEffect, useState } from "react";
import "../App.css";

export function BluetoothChecker() {
    const [btYes, setBtYes] = useState("");
    const [btNo, setBtNo] = useState("");
  useEffect(() => {
    navigator.bluetooth.getAvailability().then((available) => {
      if (available) {
        
        setBtYes("Este dispositivo cuenta con bluetooth 😃");
      } else {
        
        setBtNo("Este dispositivo NO cuenta con bluetooth 😭");
      }
    });
  }, []);

  return <>
  {btYes ? <h2>{btYes}</h2> : <h2>{btNo}</h2>}
  </>;
}
