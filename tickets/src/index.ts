import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGUSR2', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
  } catch (error) {
    console.log('error catched - ' + error);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!--');
  });
};

console.log('mongo uri - ' + process.env.MONGO_URI)
start();
