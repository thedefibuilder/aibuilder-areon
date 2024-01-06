import mongoose from 'mongoose';

import Chain from '../db-schemas/ChainSchema';

const updateMongoDB = async () => {
  await Chain.updateMany({}, { $set: { compileEndpoint: 'solidity', fileExtension: '.sol' } }, { multi: true });

  const chains = await Chain.find({});
  console.log('chains', chains);
};

(async () => {
  await mongoose.connect(process.env.MONGO_DB_URI || '').catch((error) => {
    console.log('Error connecting to the DB', error);
  });
  console.log('Creating LanceDB vector table..');
  await updateMongoDB();
  console.log('Successfully created LanceDB vector table.');
})();
