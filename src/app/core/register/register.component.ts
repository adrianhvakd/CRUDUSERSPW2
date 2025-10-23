import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule} from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { Avatar } from 'primeng/avatar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    CardModule,
    FloatLabelModule,
    MessageModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    Avatar,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
