import { Component, computed, inject, signal,effect } from '@angular/core';
import { FirebaseService, PATHFireBase } from '../../services/firebase.service';
import { UsuarioModel } from '../../models/usuario.model';
import { FormCrudComponent } from "./form-crud/form-crud.component";

@Component({
  selector: 'app-crud',
  imports: [
    FormCrudComponent
  ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {
    private fireDb = inject(FirebaseService);
    private path = PATHFireBase.Usuarios;
    error = signal<string|undefined>('');
    usuariosResource = this.fireDb.createResource(this.path);
    usuarios = computed(()=>{
      let  datos = this.usuariosResource.value()?.data;
      //this.error.set(this.usuariosResource.value()?.error);
      //...... filtrado/ordenar
      return datos as UsuarioModel[];
    });
    constructor(){
      effect(()=>{
        this.error.set(this.usuariosResource.value()?.error);
      })
    }
    onAdd(){
      this.modal.set(true);
    }
    onClose(){
      this.modal.set(false);
    }
    modal = signal<boolean>(false);


}
