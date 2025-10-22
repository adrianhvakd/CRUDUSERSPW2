import { Component, inject, input, output } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-dialog',
  imports: [ConfirmDialogModule, ToastModule, ButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  standalone: true,
  providers: [ConfirmationService, MessageService]
})
export class DialogComponent {
  texto = input<string>("Esta seguro del proceso?");
  confirm = output<boolean>();
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  onYes(){
    this.confirm.emit(true);
  }
  onNo(){
    this.confirm.emit(false);
  }

   confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
          label: 'Delete',
          severity: 'danger',
      },

      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }
}
