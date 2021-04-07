import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  genders = ['Male', 'Female'];
  signupForm: FormGroup;
  imageSrc: string;

  constructor() { }

  ngOnInit(): void {
    
        this.signupForm = new FormGroup({
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'password': new FormControl(null, Validators.required),
          'gender': new FormControl('', Validators.required),
          'city': new FormControl('Delhi', Validators.required),
          'file': new FormControl('', [Validators.required]),
          'fileSource': new FormControl('', [Validators.required])
        })
    }
  
    get f() {
      return this.signupForm.controls;
    }
  
    onFileChange(event) {
      const reader = new FileReader();
  
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.signupForm.patchValue({
            fileSource: reader.result
          });
        }
      }
    }
  
    onSubmit() {
      console.log(this.signupForm);
    }
}
