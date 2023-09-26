import React, { useState } from 'react';
const SensorPage: React.FC = () => {
  const cadenceValue: number[] = [];
  const timestamps: number[] = [];
  const [currentRPM, SetcurrentRPM] = useState(0);
  const [batteryPercent, setBatteryPercent] = useState<number | null>(null);

  //データのアップデート関数
  //センサからの新しい値を受け取り、その値のタイムスタンプを取得、１０秒以上のデータ削除
  function updateData(value: number) {
    const now = Date.now();

    cadenceValue.push(value);
    timestamps.push(now);

    while (timestamps[0] < now - 10000) {
      timestamps.shift();
      cadenceValue.shift();
    }
  }

  //RPM計算関数
  //重複地を取り除く
  //初期値からの差を計算する
  function calculateRPM() {
    // const uniqueValue = [...new Set(cadenceValue)];
    const uniqueValue = Array.from(new Set(cadenceValue));
    const initialValue = uniqueValue[0];

    const rotations = uniqueValue.map((value) => value - initialValue);
    const totalRotations = rotations.reduce((acc, cur) => acc + cur, 0);

    const rpm = totalRotations / (timestamps.length / 1000); //RPM計算
    return rpm;
  }

  const handleCadenceMeasurement = (event: Event) => {
    const value = (event.target as unknown as BluetoothRemoteGATTCharacteristic).value;
    const rpmValue = value?.getUint16(1, true);

    if (value === null || value === undefined) {
      console.error('No value received from characteristic');
      return;
    }
    if (typeof rpmValue !== 'undefined') {
      updateData(rpmValue);
    }

    const currentRpm = calculateRPM();
    SetcurrentRPM(calculateRPM);
    console.log('Current RPM:', currentRpm);
  };

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
      if (batteryDisplay) {
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
      <p>RPM:{currentRPM}</p>
    </div>
  );
};

export default SensorPage;
