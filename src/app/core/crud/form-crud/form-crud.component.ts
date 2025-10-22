import { Component, inject, signal,OnInit,output,input, computed } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService, PATHFireBase } from '../../../services/firebase.service';
import { v4 as uuidv4 } from 'uuid';
import { UsuarioModel } from '../../../models/usuario.model';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule} from 'primeng/message';
@Component({
  selector: 'app-form-crud',
  imports: [
    ReactiveFormsModule,
    PanelModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule
  ],
  templateUrl: './form-crud.component.html',
  styleUrl: './form-crud.component.css'
})
export class FormCrudComponent implements OnInit {
  salir = output<boolean>();
  data = input<UsuarioModel|null>(null);
  fb = inject(FormBuilder);
  datosFormGroup=this.fb.group({
        name:[this.data()?this.data()?.name:'',[Validators.required,Validators.minLength(3)]],
        email:[this.data()?this.data()?.email:'',[Validators.required,Validators.email]]
      });
  ngOnInit(){
    this.datosFormGroup.setValue({
      name:this.data()?.name??'',
      email:this.data()?.email??'',
    });
  }
  error = signal<string>('');
  editando=computed(()=>{
    return this.data()?.id?true:false;
  })
  //signal<boolean>(false);
  dbFire = inject(FirebaseService);
  enviar(){

  }
  onSalir(){
    this.salir.emit(false);
  }

  guardar(){
    Object.keys(this.datosFormGroup.controls).forEach(key=>{
      this.datosFormGroup.get(key)?.markAsTouched();
    })
    if(this.datosFormGroup.invalid){
      this.error.set('Corregir los errores');
      return;
    }
    const data_ = {
      name:this.datosFormGroup.value.name,
      email:this.datosFormGroup.value.email,
    }
    if(this.editando()){
      //editando
      this.dbFire.edit(PATHFireBase.Usuarios,this.data()?.id??'',data_);
      this.salir.emit(true);
    }
    else{
      //nuevo
      const uid=uuidv4();
      this.dbFire.add(PATHFireBase.Usuarios,uid,data_);
      this.salir.emit(true);
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
