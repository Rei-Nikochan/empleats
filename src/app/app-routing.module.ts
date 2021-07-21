import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { ListEmpleatsComponent }  from './components/list-empleats/list-empleats.component';
import { CreateEmpleatComponent } from './components/create-empleat/create-empleat.component';

const routes: Routes = [
  { path: '', redirectTo:'list-empleats', pathMatch:'full' },
  { path: 'list-empleats',  component:ListEmpleatsComponent },
  { path: 'create-empleat', component:CreateEmpleatComponent },
  { path: 'edit/:id', component:CreateEmpleatComponent },
  { path: '**', redirectTo:'list-empleats', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
