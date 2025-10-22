import { Component, computed, inject, signal,effect } from '@angular/core';
import { FirebaseService, PATHFireBase } from '../../services/firebase.service';
import { UsuarioModel } from '../../models/usuario.model';
import { FormCrudComponent } from "./form-crud/form-crud.component";
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
@Component({
  selector: 'app-crud',
  imports: [
    FormCrudComponent,
    DialogComponent,
    ButtonModule,
    DataViewModule,
    Tag,
    CardModule,
    Toast,
    ConfirmDialog
  ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
  standalone: true,
  providers: [ConfirmationService, MessageService]
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
    confirmationService = inject(ConfirmationService);
    messageService = inject(MessageService);
    onAdd(){
      this.formVisible = true;
      this.dialogVisible = false;
      this.itemSelect.set(null);
      this.modal.set(true);

    }
    onClose(){
      this.modal.set(false);
    }
    modal = signal<boolean>(false);
    idSelect='';
    onEliminar(id:string){
      this.formVisible = false;
      this.dialogVisible = true; 
      this.modal.set(true);
      this.idSelect = id;
    }
    formVisible = false;
    dialogVisible = false;

    confirmacion(confirm:boolean){
      if(confirm){
        this.fireDb.delete(this.path,this.idSelect)
      }
      this.onClose();
    }

    itemSelect = signal<any>( null);
    onEditar(user:UsuarioModel){
      this.formVisible = true;
      this.dialogVisible = false;
      this.itemSelect.set(user);
      
      this.modal.set(true);
    }

    confirm2(event: Event, id:string) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Está seguro de eliminar este usuario?',
        header: 'Atencion',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Borrar',
            severity: 'danger',
        },

        accept: () => {
          this.fireDb.delete(this.path,id);
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Elemento eliminado!!' });
        },
        reject: () => {
        },
        
      });
    }


}
