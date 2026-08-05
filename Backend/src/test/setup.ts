import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { beforeAll, afterAll, afterEach } from "vitest";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_SECRET = "test-jwt-secret";
  process.env.ENCRYPTION_SECRET =
    "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
  process.env.NODE_ENV = "test";

  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key of Object.keys(collections)) {
    const collection = collections[key];

    if (collection) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
