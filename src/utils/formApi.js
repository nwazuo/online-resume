import axios from 'axios';

export default function handleForm(data) {
  return axios.post('/contact', data);
}
