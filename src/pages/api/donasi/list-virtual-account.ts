import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_XENDIT, USERNAME_XENDIT } from '../../../config';

async function listVirtualAccount(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `${API_XENDIT}/available_virtual_account_banks`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          auth: {
            username: USERNAME_XENDIT,
            password: ''
          }
        }
      );

      res.status(response.status).json(response.data);
      return;
    } catch (error: any) {
      res.status(error.response.status).json({
        data: error.response.data
      });
      return;
    }
  }
}

export default listVirtualAccount;
