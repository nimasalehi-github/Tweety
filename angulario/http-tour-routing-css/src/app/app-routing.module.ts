/** https://angular.io/guide/http#setup-for-server-communication
 *    app/app.module.ts (excerpt)
 *    app/config/config.service.ts (excerpt)
 *    app/config/config.service.ts (RxJS imports)
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http'; // /http#setup-for-server-communication

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule, ], // /http#setup-for-server-communication
  exports: [RouterModule]
})
export class AppRoutingModule {}
