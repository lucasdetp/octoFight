import { API_BASE_URL, PUSHER_APP_KEY, PUSHER_APP_CLUSTER } from '@env';

export const config = {
  apiBaseUrl: API_BASE_URL,
  pusher: {
    key: PUSHER_APP_KEY,
    cluster: PUSHER_APP_CLUSTER,
  },
};
