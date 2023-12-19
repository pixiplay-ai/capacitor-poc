import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'capacitor.poc',
  appName: 'capacitor-poc',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
