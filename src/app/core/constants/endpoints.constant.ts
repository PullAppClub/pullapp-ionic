import { environment } from '../../../environments/environment';

export const endpoints = {
  HOST: environment.host,
  PROFILE: {
    CHECK_USERNAME: '/user/profile/check-username',
    UPDATE_USERNAME: '/user/profile/update-username',
    UPDATE_INFO: '/user/profile/update-info',
  },
};
