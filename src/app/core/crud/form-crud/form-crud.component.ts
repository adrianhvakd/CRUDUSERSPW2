import { Component, inject, signal } from '@angular/core';

import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sign } from 'crypto';
import { FirebaseService, PATHFireBase } from '../../../services/firebase.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-form-crud',
  imports: [ReactiveFormsModule],
  templateUrl: './form-crud.component.html',
  styleUrl: './form-crud.component.css'
})
export class FormCrudComponent {

  fb = inject(FormBuilder);
  datosFormGroup =this.fb.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]]
  })
  error = signal<string>('');
  editando=signal<boolean>(false);
  dbFire = inject(FirebaseService);
  enviar(){

  }
  guardar(){
    Object.keys(this.datosFormGroup.controls).forEach(key=>{
      this.datosFormGroup.get(key)?.markAsTouched();
    })
    if(this.datosFormGroup.invalid){
      this.error.set('Corregir los errores');
      return;
    }
    const data = {
      name:this.datosFormGroup.value.name,
      email:this.datosFormGroup.value.email,
    }
    if(this.editando()){
      //editando
    }
    else{
      //nuevo
      const uid=uuidv4();
      this.dbFire.add(PATHFireBase.Usuarios,uid,data);
    }
  }
  hasError(field:string){
    const control = this.datosFormGroup.get(field);
    return !!(control && control.invalid && control.touched)
  }
  getErrorMessage(field:string):string{
    const control1 = this.datosFormGroup.get(field);
    if(!control1?.errors)
      return '';
    if(control1?.errors['required'])
      return 'Este campo es obligatorio';
    if(control1?.errors['email'])
      return 'Este campo no es un email valido';
    if(control1?.errors['minlength'])
      return 'Este campo debe tener un minimo de '+control1.errors['minlength'].requiredLength;
    return '';
  }
}
