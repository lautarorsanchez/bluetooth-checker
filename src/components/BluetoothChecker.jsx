import { React, useEffect, useState } from "react";
import "../App.css";

export function BluetoothChecker() {
  function handleBluetooth() {
    const options = {
      acceptAllDevices:true,
      optionalServices: ['battery_service'] 
    }
    navigator.bluetooth.requestDevice(options)
    .then(device => device.gatt.connect())
    .then(server => {
      // Getting Battery Service…
      return server.getPrimaryService('battery_service');
    })
    .then(service => {
      // Getting Battery Level Characteristic…
      return service.getCharacteristic('battery_level');
    })
    .then(characteristic => {
      // Reading Battery Level…
      return characteristic.readValue();
    })
    .then(value => {
      console.log(`Battery percentage is ${value.getUint8(0)}`);
    })
    .catch(error => { console.error(error); })
  }
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
  {btYes ? <><h2>{btYes}</h2> <button onClick={(e) =>handleBluetooth(e)}>Buscar dispositivo</button></> : <h2>{btNo}</h2> }
  

  </>;
}
