const express = require('express');
const {mapLoriotPayloadToNativeModel} = require('./deviceServerDataMapping');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Endpoint to handle uplink messages
app.post('/uplink-messages', async (req, res) => {
    console.log("testing the uplink----");
  try {
    const uplinkData = req.body; // Extract data from request body
    console.log('Request body:', uplinkData);

    // Ensure uplinkData is an array or handle single objects
    const dataToInsert = Array.isArray(uplinkData) ? uplinkData : [uplinkData];
    console.log('Data to insert:', dataToInsert);

    // Store each uplink message in the database
    for (const message of dataToInsert) {
    //   await prisma.uplinkMessage.create({
    //     data: {
    //       cmd: message.cmd,
    //       seqno: message.seqno,
    //       EUI: message.EUI,
    //       ts: BigInt(message.ts), // Ensure BigInt type for ts
    //       ack: message.ack,
    //       bat: message.bat,
    //       fcnt: BigInt(message.fcnt), // Ensure BigInt type for fcnt
    //       port: message.port,
    //       offline: message.offline,
    //       encdata: message.encdata || null,
    //       data: message.data || null,
    //       decoded: message.decoded || null,
    //     },
    //   });
    mapLoriotPayloadToNativeModel(message);
    console.log("getting the data...",message);    
}

    console.log('Uplink messages stored successfully.');
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error storing uplink messages:', error.message);
    return res.status(500).json({ error: 'Failed to store uplink messages' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Uplink Message API!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
