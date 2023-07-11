import { environment } from '../../../environments/environment';

export const endpoints = {
  HOST: environment.host,
  PROFILE: {
    CHECK_USERNAME: '/user/profile/check-username',
    UPDATE_USERNAME: '/user/profile/update-username',
    UPDATE_INFO: '/user/profile/update-info',
    GET_PROFILE: '/user/profile',
    UPLOAD_AVATAR: '/user/profile/upload-avatar',
  },
  IDENTITY: {
    CHANGE_EMAIL: '/user/identity/email',
    GET_EMAIL: '/user/identity/email',
    GET_IDENTITY_PROVIDER: '/user/identity/provider',
  },
  CHALLENGE: {
    CREATE_GLOBAL: '/event/challenge/global',
    LEVELS: '/event/challenge/levels',
  },
  ACCOUNT: {
    FCM_TOKEN: '/account/fcm-token',
  },
  ADMIN: {
    APPROVE_CHALLENGE: '/event/challenge/approve',
  },
};
