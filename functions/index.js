'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
  origin: true
});
admin.initializeApp();

exports.contracts = functions
  .region('europe-west1')
  .https.onRequest((req, res) => {
    // Allow only GET and PATCH requests.
    if (req.method !== 'GET' && req.method !== 'PATCH') {
      return res.status(400).send('This request only allows PATCH and GET');
    }
    var db = admin.database();
    if (req.method === 'PATCH') {
      const urlComponents = req.url.split('/');
      const contractId = urlComponents[urlComponents.length - 1];
      const incomingContract = req.body;
      var ref = db.ref('contracts');
      ref
        .once('value')
        .then(snap => {
          const contracts = snap.val();
          contracts.forEach(contract => {
            if (contractId === contract.contractId) {
              Object.keys(incomingContract).forEach(key => {
                contract[key] = incomingContract[key];
              });
              ref.update(contracts);
            }
          });
          return res
            .set({ 'Access-Control-Allow-Origin': '*' })
            .status(204)
            .send();
        })
        .catch(err => {
          console.log(err);
          return res.status(400).send(err.message);
        });
    } else {
      db.ref('contracts')
        .once('value')
        .then(snap => {
          const urlComponents = req.url.split('/');
          const contractId = urlComponents[urlComponents.length - 1];
          const contracts = snap.val();
          contracts.forEach(contract => {
            if (contractId === contract.contractId) {
              return res
                .set({ 'Access-Control-Allow-Origin': '*' })
                .status(200)
                .send(contract);
            }
          });
          return res
            .set({ 'Access-Control-Allow-Origin': '*' })
            .status(200)
            .send(contracts);
        })
        .catch(err => {
          console.log(err);
          return res
            .set({ 'Access-Control-Allow-Origin': '*' })
            .status(500)
            .send('error occured');
        });
    }
  });
