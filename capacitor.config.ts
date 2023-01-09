import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'club.pullapp',
  appName: 'pullapp',
  webDir: 'www',
  bundledWebRuntime: true,
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['apple.com', 'google.com'],
    },
  },
};

export default config;
