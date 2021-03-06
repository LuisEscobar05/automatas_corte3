import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  data = this.dataService.getData()[0];
  errorMessage = this.dataService.getData()[1];


  constructor(private dataService:DataService, private router:Router,) { 
    console.log(this.data);
    console.log(this.errorMessage);
  }

  ngOnInit() {
  }
  regresar(){
    this.router.navigateByUrl('/');
  }

}
