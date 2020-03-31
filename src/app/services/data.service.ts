import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private data;
  private message;
  private lastState;

  setData(data,messaje,lastState){
    this.data= data;
    this.message=messaje;
    this.lastState = lastState;
  }

  getData(){
    let temp = [this.data, this.message, this.lastState];
    this.clearData();
    return temp;
  }
  clearData(){
    this.data = undefined;
  }
}

