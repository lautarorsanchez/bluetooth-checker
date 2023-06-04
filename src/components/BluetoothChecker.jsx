import { React, useEffect, useState } from "react";
import "../App.css";


export function BluetoothChecker() {
    const [btYes, setBtYes] = useState("");
    const [btNo, setBtNo] = useState("");
    
    function handleBluetooth(e){
      navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        //services:[0x1234, 0x12345678, '99999999-0000-1000-8000-00805f9b34fb'],
        optionalServices: ['battery_service']
      } )
      .then(device => {
        console.log(device);
        return device.gatt.connect();
      })
      .then(server => {
        console.log(server);
        return server.getPrimaryService('battery_service');
      })
      .then(service => {
        console.log(service);
        return service.getCharacteristic('battery_level');
      })
      .then(characteristic => {
        console.log(charasteristic);
        characteristic.addEventListener('characteristicvaluechanged',handleBatteryLevelChanged);
        return characteristic.readValue();
      })
      .then(value => {
        let batteryLevel = value.getUint8(0);
        console.log(batteryLevel);
      })
      .catch(error => {
        console.log('Argh! ' + error);
      });
    }

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
