// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient;

// Mapping function for SenRa Payload
const mapSenRaPayloadToNativeModel = async(senRaPayload)=> {
  const deviceData = {
    devEui: senRaPayload.devEui,
    seqno: senRaPayload.seqno,
    port: senRaPayload.port,
    ack: senRaPayload.ack,
    pdu: senRaPayload.pdu,
    txtime: new Date(senRaPayload.txtime),
    serverName: "SenRa",

    // Optional fields for SenRa
    joinId: senRaPayload.joinId ?? null,
    gwEui: senRaPayload.gwEui ?? null,
    rssi: senRaPayload.rssi ?? null,
    snr: senRaPayload.snr ?? null,
    freq: senRaPayload.freq ?? null,
    channel: senRaPayload.channel ?? null,
    datarate: senRaPayload.datarate ?? null,
    dup: senRaPayload.dup ?? null,
    estLat: senRaPayload.estLat ?? null,
    estLng: senRaPayload.estLng ?? null,
    cfgLat: senRaPayload.cfgLat ?? null,
    cfgLng: senRaPayload.cfgLng ?? null,
    devClass: senRaPayload.devClass ?? null,
    devType: senRaPayload.devType ?? null,
    devProfile: senRaPayload.devProfile ?? null,
    metadata: senRaPayload.metadata ?? null,
    ackDnMsgId: senRaPayload.ackDnMsgId ?? null,
    ackDnSeqNo: senRaPayload.ackDnSeqNo ?? null,
  };

  try {
    // const savedData = await prisma.deviceServerData.create({
    //   data: deviceData,
    // });
    console.log("saved data: ", deviceData);
    return deviceData;
    // return savedData;
  } catch (error) {
    console.error("Error inserting SenRa device data:", error);
    throw new Error("Failed to save SenRa device data");
  }
}

// Mapping function for Loriot Payload
const mapLoriotPayloadToNativeModel = async(loriotPayload)=> {
  const deviceData = {
    devEui: loriotPayload.EUI,
    seqno: loriotPayload.seqno,
    port: loriotPayload.port,
    ack: loriotPayload.ack,
    pdu: loriotPayload.encdata,  // Assuming encrypted or decoded data
    txtime: new Date(loriotPayload.ts),
    serverName: "Loriot",

    // Optional fields for Loriot
    gwEui: loriotPayload?.gws?.[0]?.gweui ?? null, // Extract the gateway EUI from the first gateway
    rssi: loriotPayload?.gws?.[0]?.rssi ?? null, // Extract RSSI from the first gateway
    snr: loriotPayload?.gws?.[0]?.snr ?? null,
    bat: loriotPayload.bat ?? null,
    fcnt: loriotPayload.fcnt ?? null,
    offline: loriotPayload.offline ?? null,
    decodedData: loriotPayload.decoded ?? null,
  };

  try {
    // const savedData = await prisma.deviceServerData.create({
    //   data: deviceData,
    // });
    // return savedData;
    console.log("saved data------> mapLoriot: ", deviceData);
    // return deviceData;
  } catch (error) {
    console.error("Error inserting Loriot device data:", error);
    throw new Error("Failed to save Loriot device data");
  }
}

// Mapping function for TTN Payload
const mapTtnPayloadToNativeModel = async(ttnPayload)=> {
  const deviceData = {
    devEui: ttnPayload.devEui,
    seqno: ttnPayload.seqno,
    port: ttnPayload.port,
    ack: ttnPayload.ack,
    pdu: ttnPayload.pdu,
    txtime: new Date(ttnPayload.txtime),
    serverName: "TTN",

    // Optional fields for TTN
    gwEui: ttnPayload.gwEui ?? null,
    rssi: ttnPayload.rssi ?? null,
    snr: ttnPayload.snr ?? null,
    freq: ttnPayload.freq ?? null,
    channel: ttnPayload.channel ?? null,
    datarate: ttnPayload.datarate ?? null,
    dup: ttnPayload.dup ?? null,
    estLat: ttnPayload.estLat ?? null,
    estLng: ttnPayload.estLng ?? null,
    cfgLat: ttnPayload.cfgLat ?? null,
    cfgLng: ttnPayload.cfgLng ?? null,
    devClass: ttnPayload.devClass ?? null,
    devType: ttnPayload.devType ?? null,
    devProfile: ttnPayload.devProfile ?? null,
    metadata: ttnPayload.metadata ?? null,
    ackDnMsgId: ttnPayload.ackDnMsgId ?? null,
    ackDnSeqNo: ttnPayload.ackDnSeqNo ?? null,
  };

  try {
    // const savedData = await prisma.deviceServerData.create({
    //   data: deviceData,
    // });
    // return savedData;
    console.log("saved data: ", deviceData);
    return deviceData;  // Return the saved data for further processing if needed.  For now, just log it.  This could be replaced with a call to a function that processes the data further (e.g., sending it to a data analysis service, storing it in a database, etc.) or logging it to a file.  This is just a placeholder for now.  You would need to implement the specifics based on your use case.  For example, you might want to log the data to a file or send it to a data analysis service.  The actual implementation would depend on your specific requirements and the technologies you are using.  You would also need to ensure that the data is securely stored and that you have appropriate access controls in place.  For example, you might want to use encryption to protect the data and use a secure database or storage service.  You would also need to consider the performance implications of storing and processing the data.  For

  } catch (error) {
    console.error("Error inserting TTN device data:", error);
    throw new Error("Failed to save TTN device data");
  }
}



module.exports = {mapSenRaPayloadToNativeModel,mapLoriotPayloadToNativeModel,mapTtnPayloadToNativeModel}