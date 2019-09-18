import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://europe-west1-contracts-app-cb26b.cloudfunctions.net'
});

export default instance;
