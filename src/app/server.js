import express from 'express';
import useMiddleware from '$server/app/middleware';
import mongoose from 'mongoose';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

(async function startServerApp() {
  try {
    const now = dayjs().format('Do MMMM YYYY, h:mm a (UTCZ)');
    console.log('\x1b[36m%s\x1b[0m', `[mytinerary-server] Starting server application at: ${now}.`);
    // Start the Express.js server.
    const host = process.env.HOST;
    const port = Number(process.env.PORT) || 4000;
    let server = express();
    server = useMiddleware(server);
    await server.listen(port, host);
    console.log('\x1b[36m%s\x1b[0m', '[mytinerary-server] Express.js server started.');
    // Start the MongoDB database using the Mongoose ODM.
    const dbUri = process.env.DB_URI;
    const options = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true };
    await mongoose.connect(dbUri, options);
    console.log('\x1b[36m%s\x1b[0m', '[mytinerary-server] MongoDB database connected.');
    console.log('\x1b[36m%s\x1b[0m', '[mytinerary-server] Server application started and ready.');
  } catch (err) {
    console.log('\x1b[36m%s\x1b[0m', `[mytinerary-server] ${err.name}: ${err.message}`);
    // Exit the Node.js process with failure status.
    process.exit(1);
  }
})();
