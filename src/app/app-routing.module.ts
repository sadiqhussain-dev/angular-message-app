import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([{ path: '', loadChildren: () => import('./feature/feature.module').then(module => module.FeatureModule) },])],
  exports: [RouterModule]
})

export class AppRoutingModule { }
