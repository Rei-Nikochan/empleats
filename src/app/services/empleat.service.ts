import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Empleat } from '../components/interfaces/empleat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleatService {

  constructor( private firestore: AngularFirestore ) { }

  agregarEmpleat( empleat: Empleat ):Promise<any> {
    return this.firestore.collection('empleats').add( empleat )
  }

  getEmpleats(): Observable<any>{
    return this.firestore.collection('empleats').snapshotChanges()
  }

  eliminarEmpleat( id:string ): Promise<any>{
    return this.firestore.collection('empleats').doc(id).delete()
  }

  editEmpleat ( id:string ):Observable<any> {
    return this.firestore.collection('empleats').doc(id).snapshotChanges()
  }
  
  actualitzarEmpleat( id:string, data:any ):Promise<any> {
    return this.firestore.collection('empleats').doc(id).update( data )
  }
}
