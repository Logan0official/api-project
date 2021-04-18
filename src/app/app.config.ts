import { AlmondApiConfig } from "@almond-platform/api-kit";

export class MyAlmondApiConfig implements AlmondApiConfig {
  userAccountMsHost = 'http://192.99.18.90';
  userAccountMsPort = 8001;

  userProfileMsHost = 'http://192.99.18.90';
  userProfileMsPort = 8002;

  contactMsHost = 'http://192.99.18.90';
  contactMsPort = 8003;
}

export const myAlmondApiConfig: MyAlmondApiConfig = new MyAlmondApiConfig();
