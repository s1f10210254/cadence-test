import { atom, useAtom } from 'jotai';
import React, { useState } from 'react';
export const currentRPMAtom = atom(0);
export const ArryRPMAtom = atom<number[]>([]);

const SensorPage: React.FC = () => {
  // const cadenceValue: number[] = [];
  // const timestamps: number[] = [];
  // const [currentRPM, SetcurrentRPM] = useAtom(currentRPMAtom);
  // // const jotai = atom(0);
  const [batteryPercent, setBatteryPercent] = useState<number | null>(null);
  const [ArryRPM, setArryRPM] = useAtom(ArryRPMAtom);
  // const initialValue: number | null = null;
  // const previousValue: number | null = null;
  const processCadence = (event: Event) => {
    const value = (event.target as unknown as BluetoothRemoteGATTCharacteristic).value;
    const rpmValue = value?.getUint16(1, true);
    if (rpmValue === undefined) return;

    const arry = [];
    arry.push(rpmValue);
    if (arry.length > 20) arry.shift();
    setArryRPM(arry);
    return ArryRPM;
  };
  const handleCadenceMeasurement = (event: Event) => {
    const Arry = processCadence(event);
    if (Arry === undefined) return;
    setArryRPM(Arry);
  };

  const latestRPM = ArryRPM[ArryRPM.length - 1];

  async function connectToSensor() {
    try {
      //blutoothデバイスの要求
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['00001816-0000-1000-8000-00805f9b34fb'] }],
        optionalServices: ['0000180f-0000-1000-8000-00805f9b34fb'],
      });
      console.log('1', device);

      //GATTサーバへの接続
      const server = await device.gatt.connect();
      console.log('2', server);

      //サービスの取得（ケイデンスセンサーのサービスを取得）
      const service = await server.getPrimaryService('00001816-0000-1000-8000-00805f9b34fb');
      console.log('3', service);

      // バッテリーサービスの取得
      const batteryService = await server.getPrimaryService('0000180f-0000-1000-8000-00805f9b34fb');

      // バッテリーレベルの特性を取得
      const batteryCharacteristic = await batteryService.getCharacteristic(
        '00002a19-0000-1000-8000-00805f9b34fb'
      );

      // バッテリーレベルの値を読み取る
      const batteryValue = await batteryCharacteristic.readValue();
      const batteryPercent = batteryValue.getUint8(0);
      console.log('Battery Level:', batteryPercent);
      setBatteryPercent(batteryPercent);

      // HTMLにバッテリーレベルを表示
      const batteryDisplay = document.getElementById('batteryLevel');
      if (batteryDisplay !== null) {
        batteryDisplay.textContent = `バッテリー残量: ${batteryPercent}%`;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      //特性の取得（CSC Feature）
      const characteristic = await service.getCharacteristic(
        '00002a5b-0000-1000-8000-00805f9b34fb'
      );
      console.log('4', characteristic);

      // 通知を受け取るためのコードを追加
      characteristic.addEventListener('characteristicvaluechanged', handleCadenceMeasurement);
      await characteristic.startNotifications();

      console.log('5', characteristic);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <h1>ケーデンスセンサーの読み取り</h1>
      <div>
        <p> 1.センサーに接続ボタンをクリックするとデバイス検索が入る</p>
        <p>2.ペア設定をクリックするとデバイスが読み取られる</p>
        <p>3.回転するとデータが更新されていく</p>
      </div>

      <button onClick={connectToSensor}>センサーに接続</button>
      {/* <div id="candenceInfo">
        <p>ケイデンスセンサー:</p>
        {rpm !== null ? (
          <div id="cadenceValue">取得値: {rpm.toFixed(2)} RPM</div>
        ) : (
          <div id="cadenceValue">取得値: --- RPM</div>
        )}
      </div> */}

      {batteryPercent !== null ? (
        <span id="batteryLevel">バッテリー残量: {batteryPercent}%</span>
      ) : (
        <span id="batteryLevel">バッテリー残量: ---%</span>
      )}

      <p>回転数:{latestRPM}</p>
    </div>
  );
};

export default SensorPage;
