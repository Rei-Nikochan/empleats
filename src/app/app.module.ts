import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { AngularFireModule }       from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule }  from '@angular/fire/firestore';
import { ReactiveFormsModule }     from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent }           from './app.component';
import { ListEmpleatsComponent }  from './components/list-empleats/list-empleats.component';
import { CreateEmpleatComponent } from './components/create-empleat/create-empleat.component';
import { NavbarComponent }        from './components/navbar/navbar.component';

import { environment }            from '../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    ListEmpleatsComponent,
    CreateEmpleatComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
