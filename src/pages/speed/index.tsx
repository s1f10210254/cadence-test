import { atom, useAtom } from 'jotai';
import React, { useState } from 'react';
export const currentRPMAtom = atom(0);

const SensorPage: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    modelNumber: '',
    hardwareRevision: '',
    softwareRevision: '',
    manufacturerName: '',
  });

  const [currentRPM, SetcurrentRPM] = useAtom(currentRPMAtom);

  const [batteryPercent, setBatteryPercent] = useState<number | null>(null);

  // const initialValue: number | null = null;
  // const previousValue: number | null = null;

  const handleCadenceMeasurement = (event: Event) => {
    const value = (event.target as unknown as BluetoothRemoteGATTCharacteristic).value;
    const rpmValue = value?.getUint16(1, true);

    if (value === null || value === undefined) {
      console.error('No value received from characteristic');
      return;
    }
    console.log('rpmValue', rpmValue);

    if (rpmValue !== undefined) {
      // if (initialValue === null) {
      //   initialValue = rpmValue;
      //   return;
      // }
      // const rpm = rpmValue - initialValue;

      // if (previousValue !== rpm) {
      //   console.log('RPMの値:', rpmValue);
      //   SetcurrentRPM(rpmValue);
      //   previousValue = rpmValue;
      // }
      SetcurrentRPM(rpmValue);
    }
  };

  async function fetchDeviceInfo(server: BluetoothRemoteGATTServer) {
    const deviceInfoService = await server.getPrimaryService(
      '0000180a-0000-1000-8000-00805f9b34fb'
    );

    const modelNumberCharacteristic = await deviceInfoService.getCharacteristic(
      '00002a24-0000-1000-8000-00805f9b34fb'
    );
    const hardwareRevisionCharacteristic = await deviceInfoService.getCharacteristic(
      '00002a27-0000-1000-8000-00805f9b34fb'
    );
    const softwareRevisionCharacteristic = await deviceInfoService.getCharacteristic(
      '00002a28-0000-1000-8000-00805f9b34fb'
    );
    const manufacturerNameCharacteristic = await deviceInfoService.getCharacteristic(
      '00002a29-0000-1000-8000-00805f9b34fb'
    );

    const modelNumber = new TextDecoder().decode(await modelNumberCharacteristic.readValue());
    const hardwareRevision = new TextDecoder().decode(
      await hardwareRevisionCharacteristic.readValue()
    );
    const softwareRevision = new TextDecoder().decode(
      await softwareRevisionCharacteristic.readValue()
    );
    const manufacturerName = new TextDecoder().decode(
      await manufacturerNameCharacteristic.readValue()
    );

    console.log('Model Number:', modelNumber);
    console.log('Hardware Revision:', hardwareRevision);
    console.log('Software Revision:', softwareRevision);
    console.log('Manufacturer Name:', manufacturerName);

    setDeviceInfo({
      modelNumber,
      hardwareRevision,
      softwareRevision,
      manufacturerName,
    });
  }

  const [genericAttributes, setGenericAttributes] = useState<string>('');
  async function fetchGenericAttributes(server: BluetoothRemoteGATTServer) {
    const genericAttributeService = await server.getPrimaryService(
      '00001801-0000-1000-8000-00805f9b34fb'
    );

    // ここでGeneric Attributeのキャラクタリスティックを取得・処理できます。
    // 今回の例では、特にキャラクタリスティックを取得しませんが、必要に応じて追加できます。

    console.log('Generic Attribute Service:', genericAttributeService);
    setGenericAttributes(genericAttributeService.uuid);
  }

  const [genericInfo, setGenericInfo] = useState({
    deviceName: '',
    appearance: '',
    peripheralPreferredConnectionParameters: '',
    centralAddressResolution: '',
  });

  async function fetchGenericAccess(server: BluetoothRemoteGATTServer) {
    const genericAccessService = await server.getPrimaryService(
      '00001800-0000-1000-8000-00805f9b34fb'
    );

    const deviceNameCharacteristic = await genericAccessService.getCharacteristic(
      '00002a00-0000-1000-8000-00805f9b34fb'
    );
    const appearanceCharacteristic = await genericAccessService.getCharacteristic(
      '00002a01-0000-1000-8000-00805f9b34fb'
    );

    const peripheralPreferredConnectionParametersCharacteristic =
      await genericAccessService.getCharacteristic('00002a04-0000-1000-8000-00805f9b34fb');
    const centralAddressResolutionCharacteristic = await genericAccessService.getCharacteristic(
      '00002aa6-0000-1000-8000-00805f9b34fb'
    );
    // 必要に応じて他のキャラクタリスティックも追加できます。

    const deviceName = new TextDecoder().decode(await deviceNameCharacteristic.readValue());
    const appearance = (await appearanceCharacteristic.readValue()).getUint16(0, true);
    // const peripheralPreferredConnectionParameters = new TextDecoder().decode(
    //   await peripheralPreferredConnectionParametersCharacteristic.readValue()
    // );
    const ppcpData = await peripheralPreferredConnectionParametersCharacteristic.readValue();
    const minInterval = ppcpData.getUint16(0, true);
    const maxInterval = ppcpData.getUint16(2, true);
    const slaveLatency = ppcpData.getUint16(4, true);
    const supervisionTimeout = ppcpData.getUint16(6, true);
    const peripheralPreferredConnectionParameters = `Min Interval: ${minInterval}, Max Interval: ${maxInterval}, Slave Latency: ${slaveLatency}, Supervision Timeout: ${supervisionTimeout}`;

    // const centralAddressResolution = new TextDecoder().decode(
    //   await centralAddressResolutionCharacteristic.readValue()
    // );
    const carData = await centralAddressResolutionCharacteristic.readValue();
    const centralAddressResolution = carData.getUint8(0) === 1 ? 'Supported' : 'Not Supported';

    const apperenceStr = appearance.toString();
    // console.log('Device Name:', deviceName);
    // console.log('Appearance:', appearance);
    setGenericInfo({
      deviceName,
      appearance: apperenceStr,
      peripheralPreferredConnectionParameters,
      centralAddressResolution,
    });
  }

  // const [cyclingInfo, setCyclingInfo] = useState({
  //   scControlPoint: '',
  //   cscMeasurement: '',
  //   cscFeature: '',
  //   sensorLocation: '',
  // });

  // async function fetchCyclingInfo(server: BluetoothRemoteGATTServer) {
  //   const cscService = await server.getPrimaryService('00001816-0000-1000-8000-00805f9b34fb');

  //   // 各キャラクタリスティックを取得
  //   const scControlPointCharacteristic = await cscService.getCharacteristic(
  //     '00002a55-0000-1000-8000-00805f9b34fb'
  //   );
  //   const cscMeasurementCharacteristic = await cscService.getCharacteristic(
  //     '00002a5b-0000-1000-8000-00805f9b34fb'
  //   );
  //   const cscFeatureCharacteristic = await cscService.getCharacteristic(
  //     '00002a5c-0000-1000-8000-00805f9b34fb'
  //   );
  //   const sensorLocationCharacteristic = await cscService.getCharacteristic(
  //     '00002a5d-0000-1000-8000-00805f9b34fb'
  //   );

  //   // 値を読み取る
  //   const scControlPoint = new TextDecoder().decode(await scControlPointCharacteristic.readValue());
  //   const cscMeasurement = new TextDecoder().decode(await cscMeasurementCharacteristic.readValue());
  //   const cscFeature = new TextDecoder().decode(await cscFeatureCharacteristic.readValue());
  //   const sensorLocation = new TextDecoder().decode(await sensorLocationCharacteristic.readValue());

  //   setCyclingInfo({
  //     scControlPoint,
  //     cscMeasurement,
  //     cscFeature,
  //     sensorLocation,
  //   });
  // }

  async function connectToSensor() {
    try {
      //blutoothデバイスの要求
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['00001816-0000-1000-8000-00805f9b34fb'] }],
        optionalServices: [
          '0000180f-0000-1000-8000-00805f9b34fb',
          '0000180a-0000-1000-8000-00805f9b34fb',
          '00001801-0000-1000-8000-00805f9b34fb', // Generic Attribute
          '00001800-0000-1000-8000-00805f9b34fb', // Generic Access
        ],
      });
      console.log('1', device);

      //GATTサーバへの接続
      const server = await device.gatt.connect();
      console.log('2', server);

      //デバイス情報を取得
      fetchDeviceInfo(server);

      //
      await fetchGenericAttributes(server);
      await fetchGenericAccess(server);
      // await fetchCyclingInfo(server);

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
        // '00002a55-0000-1000-8000-00805f9b34fb'
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

      <div>
        <h3>デバイス情報</h3>
        <p>モデル番号: {deviceInfo.modelNumber}</p>
        <p>ハードウェアリビジョン: {deviceInfo.hardwareRevision}</p>
        <p>ソフトウェアリビジョン: {deviceInfo.softwareRevision}</p>
        <p>製造者名: {deviceInfo.manufacturerName}</p>
      </div>

      <div>
        <h3>Generic Access 情報</h3>
        <p>デバイス名: {genericInfo.deviceName}</p>
        <p>外観: {genericInfo.appearance}</p>
        <p>
          Peripheral Preferred Connection Parameters:{' '}
          {genericInfo.peripheralPreferredConnectionParameters}
        </p>
        <p>Central Address Resolution: {genericInfo.centralAddressResolution}</p>
      </div>
      <div>
        <h3>Generic Attribute 情報</h3>
        <p>サービスUUID: {genericAttributes}</p>
      </div>
      {/* <div>
        <h3>サイクリング情報</h3>
        <p>SC Control Point: {cyclingInfo.scControlPoint}</p>
        <p>CSC Measurement: {cyclingInfo.cscMeasurement}</p>
        <p>CSC Feature: {cyclingInfo.cscFeature}</p>
        <p>Sensor Location: {cyclingInfo.sensorLocation}</p>
      </div> */}
    </div>
  );
};

export default SensorPage;
