// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `enviroment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'url',
  // SERVER_API_URL: 'http://localhost:9004/auth',
  SERVER_local_API_URL : 'http://atoszepe.ddns.net:8086/api',
  //SERVER_API_URL: 'http://192.168.202.53:8086/api',
   SERVER_API_URL: 'http://atoszepe.ddns.net:8086/api',
 //SERVER_API_URL: 'http://localhost:8086/api',
};
/*export const version_app = {
  current  = "0.0.2",
  enabled = true,
  majorMsg = {
      "title": "Mis à jour",
      "msg": "Une mis à jour de l'application est disponible veuillez la téléchager svp.",
      "btn": "Télécharger"
  }
}*/
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
