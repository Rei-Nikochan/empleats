import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService }          from 'ngx-toastr';

import { EmpleatService }         from '../../services/empleat.service';

@Component({
  selector: 'app-create-empleat',
  templateUrl: './create-empleat.component.html',
  styles: []
})

export class CreateEmpleatComponent implements OnInit {
  
  createEmpleat: FormGroup
  submitted    : boolean = false
  loadSpinner  : boolean = false
  nomSeccio    : string = 'Agregar Empleat'
  nomBoto      : string = 'Agregar'
  id           : string | null

  constructor(
    private formBuilder    : FormBuilder,
    private _empleatService: EmpleatService,
    private router         : Router,
    private toastr         : ToastrService,
    private activatedRoute : ActivatedRoute
    ) {

    this.createEmpleat = this.formBuilder.group({
      nom   :['', Validators.required],
      cognom:['', Validators.required],
      dni   :['', Validators.required],
      salari:['', Validators.required],
    })

    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }

   agregarEmpleat(){
      const empleat: any = {
        nom    : this.createEmpleat.value.nom,
        cognom : this.createEmpleat.value.cognom,
        dni    : this.createEmpleat.value.dni,
        salari : this.createEmpleat.value.salari,
        dataCreacio : new Date(),
        dataActualitzacio: new Date()
      }
      this._empleatService.agregarEmpleat(empleat).then(() => {
        this.toastr.success('Empleat agregat correctament', 'Agregat',{
          positionClass: 'toast-top-center', timeOut:2300} )
        
          this.router.navigate(['/list-empleats'])

      }).catch( err => {
        console.log (err)
        this.loadSpinner = false
      })
   }

   AgregarModificarEmpleat(){
    this.loadSpinner = true
    this.submitted = true
    if(this.createEmpleat.invalid){
      this.loadSpinner = false
      return
    }

    if (this.id === null){
       this.agregarEmpleat()
    }else {
      this.editarEmpleat( this.id )
    }
   }

   editarEmpleat( id:string ){
    const empleat: any = {
      nom    : this.createEmpleat.value.nom,
      cognom : this.createEmpleat.value.cognom,
      dni    : this.createEmpleat.value.dni,
      salari : this.createEmpleat.value.salari,
      dataActualitzacio: new Date()
    }

    this.loadSpinner = true
    this._empleatService.actualitzarEmpleat(id, empleat).then(()=> {
      this.loadSpinner = false
      this.toastr.info("Informació d'empleat modificat correctament", "Modificat", {
        positionClass: 'toast-top-center', timeOut:2300 })
    })
    this.router.navigate(['/list-empleats'])
   }

   esEditarEmpleat(){
     if( this.id !== null ) {
       this.nomSeccio = 'Editar Empleat'
       this.nomBoto   = 'Modificar'
       this.loadSpinner = true

       this._empleatService.editEmpleat(this.id)
       .subscribe( resp => {
         this.loadSpinner = false

         this.createEmpleat.setValue({
           nom    : resp.payload.data()['nom'],
           cognom : resp.payload.data()['cognom'],
           dni    : resp.payload.data()['dni'],
           salari : resp.payload.data()['salari']
         })
       } )
     }
   }

  ngOnInit(): void {
    
  this.esEditarEmpleat()

  }

}
