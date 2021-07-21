import { Component, OnInit } from '@angular/core';
import { ToastrService }     from 'ngx-toastr';

import { EmpleatService }    from '../../services/empleat.service';

@Component({
  selector: 'app-list-empleats',
  templateUrl: './list-empleats.component.html',
  styles: [
    `i {cursor: pointer}`
  ]
})
export class ListEmpleatsComponent implements OnInit {
  
  empleats: any[] = []

  constructor(
    private _empleatService: EmpleatService,
    private toastr         : ToastrService
    ) { 
  }

  ngOnInit(): void {
    this.getEmpleats()
  }

  getEmpleats(){
    this._empleatService.getEmpleats()
    .subscribe( data => {
      this.empleats = [];
      data.forEach((element: any) => {
      this.empleats.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      })
      })
      console.log(this.empleats)
    } )
  }

  eliminarEmpleat( id:string ) {
    this._empleatService.eliminarEmpleat(id).then(() => {
      
      this.toastr.error('Empleat fora de la base de dades','Registre eliminat',{
        positionClass: 'toast-top-center', timeOut:2300})
    })
  }


}
