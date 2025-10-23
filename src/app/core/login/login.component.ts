import { Component, inject, input, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule} from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { Avatar } from 'primeng/avatar';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    FloatLabelModule,
    MessageModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    Avatar,
    RouterModule,
    ReactiveFormsModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  data = input<any>(null);
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  error = signal<string>('');
  router = inject(Router)
  datosLogin=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]]
  });

  hasError(field:string){
    const control = this.datosLogin.get(field);
    return !!(control && control.invalid && control.touched)
  }

  async Logear(){
    if(this.datosLogin.invalid){
      this.error.set('Corregir los errores');
      return;
    }
    const data_ = {
      email:this.datosLogin.value.email? this.datosLogin.value.email : "" ,
      password:this.datosLogin.value.password? this.datosLogin.value.password : "" ,
    }
    const logeado = await this.auth.login(data_.email,data_.password)
    .subscribe({
      next:()=>{
        this.router.navigate(['/crud']);
      },
      error:(error)=>{
        alert("error");
      }

    })
    console.log(logeado);
  }
  Logout(){
    this.auth.logout();
  }
}
