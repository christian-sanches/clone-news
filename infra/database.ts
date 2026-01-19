import { Client } from "pg";


const getNewClient = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  await client.connect();

  return client;
}

const query = async (queryObject) => {
  let client: Client;

  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (Err) {
    console.error(Err);
  } finally {
    await client.end();
  }
};

export default {
  query,
  getNewClient,
};
