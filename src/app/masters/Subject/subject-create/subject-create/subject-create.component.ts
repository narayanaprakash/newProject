import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css']
})
export class SubjectCreateComponent implements OnInit {
   


  testform: FormGroup;
  submitted:boolean = false;
  error:boolean = false;

  constructor(private formBuilder:FormBuilder,private router:Router) 
  {
    this.testform = this.formBuilder.group({
			subjectName:''
		});
  	// this.SubmitbutonName = 'Continue';
   }

  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   subjectName: ['',[Validators.required,Validators.pattern('^([a-zA-Z]\\s?)+$')]]
    // });
  }
  detectname(event: any)
  {
    let values = event.target.value;
    if(values=='')
    {
      this.error = false; 
    }
    let formdata = /^([a-zA-Z]\\s?)+$/;
    //console.log(regnodata);
    if(values.match(formdata))
    {
      this.error =  false;
    }
  }
 public onSubmit() 
  {
    const result = Object.assign({}, this.testform.value);
    // subjectName: ['',[Validators.required,Validators.pattern('^([a-zA-Z]\\s?)+$')]]
    this.submitted = true;
    // if (this.submitted) 
    // {
    //     this.router.navigate(['masters/subjectCreate/list'])
    // }
    // else
    // {
      console.log(result.subjectName);
    // }
    
  }

}
