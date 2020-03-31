import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { StackService } from 'src/app/services/stack.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  cadena;
  auxiCadena
  errorMessage;
  message;
  iterator;
  transicion;
  transiciones = [];
  constructor(private router: Router, private dataService: DataService, private pila: StackService) { }
  ngOnInit() {
  }

  evaluar() {
    this.iterator = 0;
    this.cadena = this.cadena;
    if(this.cadena!=undefined){
      this.auxiCadena = this.cadena.split(" ");
      if (this.auxiCadena[this.iterator] == "public") {
        this.pila.push("cuerpo");
        this.pila.push("conectarMySQL()");
        this.pila.push("Connection");
        this.pila.push("public")
        this.message = "push regla principal"
        this.transicion = ["" + this.pila.stack, this.message];
        this.transiciones.push(this.transicion);
        this.validarConnection();
        this.router.navigateByUrl('/salida');
        this.dataService.setData(this.transiciones, this.errorMessage);
        this.iterator = 0;
        this.transiciones = [];
      } else {
        this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
        this.dataService.setData(this.transiciones, this.errorMessage);
        this.router.navigateByUrl('/salida');
        this.iterator = 0;
        this.transiciones = [];
      }
    }else{
      this.errorMessage = "Ingrese algo" ;
      this.dataService.setData(this.transiciones, this.errorMessage);
      this.router.navigateByUrl('/salida');
      this.iterator = 0;
    }
  }

  validarConnection() {
    this.message = "sale: " + this.pila.peek();
    this.pila.pop();// pop a public
    this.transicion = ["" + this.pila.stack, this.message];
    this.transiciones.push(this.transicion);
    this.iterator++;
    if (this.auxiCadena[this.iterator] == "Connection") {
      this.message = "sale: " + this.pila.peek();
      this.pila.pop(); // pop a Connection
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.validarConectarMySQL();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarConectarMySQL() {
    if (this.auxiCadena[this.iterator] == "conectarMySQL()") {
      this.message = "sale: " + this.pila.peek();
      this.pila.pop(); //pop a conectarMySQL()
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.validarCuerpo();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarCuerpo() {
    if (this.auxiCadena[this.iterator] == "{") {
      this.message = "sale: " + this.pila.peek();
      this.pila.pop(); //pop a <cuerpo>
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.pila.push("}");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push(";");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("identificador");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("return");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("componente2");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("componente1");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("{");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarComponente1();
    }else{
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarComponente1() {
    this.message = "sale: " + this.pila.peek();
    this.pila.pop(); //pop a {
    this.transicion = ["" + this.pila.stack, this.message];
    this.transiciones.push(this.transicion);
    if (this.auxiCadena[this.iterator] == "Connection") {
      this.message = "sale: " + this.pila.peek();
      this.pila.pop(); // pop a componente1
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.pila.push(";");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("null");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("=");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("Identificador");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("Connection");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarIdenti1();
    }else{
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarIdenti1() {
    this.message = "sale: " + this.pila.peek();
    this.pila.pop(); //pop a Connection
    this.transicion = ["" + this.pila.stack, this.message];
    this.transiciones.push(this.transicion);
    if (this.validarIdentificador()) {
      this.message = "sale: " + this.pila.peek();
      this.pila.pop()//pop a Identificador
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.validarAsignacion();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarAsignacion() {
    if (this.auxiCadena[this.iterator].match(/^=$/)) {
      this.message = "sale: " + this.pila.peek();
      this.pila.pop()//pop a =
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.validarNull();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarNull() {
    if (this.auxiCadena[this.iterator].match(/^null$/)) {
      this.message = "sale: " + this.pila.peek();
      this.pila.pop();//pop a null
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.validarTerminacion();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarTerminacion() {
    if (this.auxiCadena[this.iterator] == ";") {
      this.message = "sale: " + this.pila.peek();
      this.pila.pop(); //pop a ;
      this.iterator++;
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarComponente2();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarComponente2() {
    if (this.auxiCadena[this.iterator].match(/^try$/)) {
      this.message = "sale: " + this.pila.peek();
      this.pila.pop()//pop a componente2
      this.iterator++;
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("}");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push(";");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push(")");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("(");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("e.printStackTrace");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("{");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push(")");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("subcomponente2_2");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("(");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("catch");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("}");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("subcomponente2_1");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("{");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("try");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarLLave();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarLLave() {
    this.message = "sale: " + this.pila.peek();
    this.pila.pop()//pop a try
    this.transicion = ["" + this.pila.stack, this.message];
    this.transiciones.push(this.transicion);
    if (this.auxiCadena[this.iterator] == "{") {
      this.message = "sale: " + this.pila.peek();
      this.pila.pop()//pop a {
      this.iterator++;
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarSubcomponente2_1();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarSubcomponente2_1() {
    this.message = "sale: " + this.pila.peek();
    this.pila.pop()//pop a {
    this.transicion = ["" + this.pila.stack, this.message];
    this.transiciones.push(this.transicion);
    if (this.auxiCadena[this.iterator].match(/^Class.forName$/)) {
      this.pila.push("complemento2_1");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push(";");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push(")");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("driver");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("(");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("Class.forName");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.validarParentesis1();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarParentesis1() {
    this.message = "sale: " + this.pila.peek();
    this.pila.pop()//pop a Class.forName
    this.transicion = ["" + this.pila.stack, this.message];
    this.transiciones.push(this.transicion);
    if (this.auxiCadena[this.iterator] == "(") {
      this.iterator++;
      this.message = "entra: " + this.pila.peek();
      this.pila.pop()//pop a (
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarDriver();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarDriver() {
    if (this.auxiCadena[this.iterator].match(/^com.mysql.jdbc.Driver$/)) {
      this.iterator++;
      this.message = "sale: " + this.pila.peek();
      this.pila.pop()//pop a driver;
      this.pila.push("com.mysql.jdbc.Driver");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarParentesis2();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarParentesis2() {
    this.message = "sale: " + this.pila.peek();
    this.pila.pop() //pop a com.mysql.jdbc.Driver
    this.transicion = ["" + this.pila.stack, this.message];
    this.transiciones.push(this.transicion);
    if (this.auxiCadena[this.iterator] == ")") {
      this.iterator++;
      this.message = "sale: " + this.pila.peek();
      this.pila.pop()//pop a )
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarPunto_Coma();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarPunto_Coma() {
    if (this.auxiCadena[this.iterator] == ";") {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop(); //pop a ;
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarComplemento2_1();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarComplemento2_1() {
    if (this.validarIdentificador()) {
      this.pila.push(";");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push(")");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("pass");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push(",");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("user");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push(",");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("url");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("(");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("DriverManager.getConnection");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push(")");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("Connection");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("(");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("=");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.iterator++;
      this.validarIgual();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarIgual() {
    this.message = "sale: " + this.pila.peek();
    this.pila.pop()//pop a identificador
    this.transicion = ["" + this.pila.stack, this.message];
    this.transiciones.push(this.transicion);
    if (this.auxiCadena[this.iterator].match(/^=$/)) {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop()//pop a =
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarParentesis2_1();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarParentesis2_1() {
    if (this.auxiCadena[this.iterator] == "(") {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop()//pop a (;
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarConnection2_1();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarConnection2_1() {
    if (this.auxiCadena[this.iterator].match(/^Connection$/)) {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();//pop a Connection
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarParentesis2_2();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarParentesis2_2() {
    if (this.auxiCadena[this.iterator] == ")") {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarDriverManager();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarDriverManager() {
    if (this.auxiCadena[this.iterator].match(/^DriverManager.getConnection$/)) {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();//pop a DriverManager.getConnection
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarParentesisComplemento2_1();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarParentesisComplemento2_1() {
    if (this.auxiCadena[this.iterator] == "(") {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop()//pop a (
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarUrl();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarUrl() {
    if (this.auxiCadena[this.iterator].match(/^jdbc:mysql:\/\/([a-z]|[\d]|[$-])+(.)+([a-z]|[\d]|[$-])+(?=[a-z])*(?=[\d])*(?=[.$-])*:3306\/[a-z]+$/i)) {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop()//pop a url
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarComa1();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarComa1() {
    if (this.validarSeparacion()) {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop()//pop a ,
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarUser();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarUser() {
    if (this.validarIdentificador) {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop()//pop a user
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarComa2();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarComa2() {
    if (this.validarSeparacion) {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();//pop a ,
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarPass();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarPass() {
    if (this.auxiCadena[this.iterator].match(/^[a-z]+([\d]|[$@$/.\-]|[a-z])+$/)) {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();//pop a pass
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarParentesisComplemento2_2();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarParentesisComplemento2_2() {
    if (this.auxiCadena[this.iterator] == ")") {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();//pop a )
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarPunto_ComaFinalComplemento();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarPunto_ComaFinalComplemento() {
    if (this.auxiCadena[this.iterator] == ";") {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();//pop a ;
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarLLaveCierreSubComponente2_1();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarLLaveCierreSubComponente2_1() {
    if (this.auxiCadena[this.iterator] == "}") {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();//pop a
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarCatch();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarCatch() {
    if (this.auxiCadena[this.iterator].match(/^catch$/)) {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();//pop a catch
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarParentesisComponente2();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarParentesisComponente2() {
    if (this.auxiCadena[this.iterator] == "(") {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop(); //pop a (
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarSubComponente2_2();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarSubComponente2_2() {
    if (this.auxiCadena[this.iterator].match(/SQLException/)) {
      //elimina el espacio SQLException e para tomarlo como una sola palabra y no como dos
      this.auxiCadena[this.iterator] += " " + this.auxiCadena[this.iterator + 1];
      this.iterator = this.iterator + 2;
      this.message = "sale: " + this.pila.peek();
      this.pila.pop(); //pop a subcomponente2_2
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.pila.push("SQLException e");
      this.message = "entra: " + this.pila.peek();
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarParentesisComponente2Cierre();
    }else{
      if (this.auxiCadena[this.iterator].match(/^ClassNotFoundException$/)) {
        this.message = "sale: " + this.pila.peek();
        this.iterator++;
        this.pila.pop()//pop a subcomponente2_2
        this.transicion = ["" + this.pila.stack, this.message];
        this.transiciones.push(this.transicion);
        this.pila.push("ClassNotFoundException");
        this.message = "entra: " + this.pila.peek();
        this.transicion = ["" + this.pila.stack, this.message];
        this.transiciones.push(this.transicion);
        this.validarParentesisComponente2Cierre();
      } else {

        this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
      }
    }

  }

  validarParentesisComponente2Cierre() {
    this.message = "sale: " + this.pila.peek();
    this.pila.pop()//pop a sqlexception o classnotfound
    this.transicion = ["" + this.pila.stack, this.message];
    this.transiciones.push(this.transicion);
    if (this.auxiCadena[this.iterator] == ")") {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();//pop a )
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarLLaveComponente2();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarLLaveComponente2() {
    if (this.auxiCadena[this.iterator] == "{") {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop()//pop a {
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarPrintStack();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarPrintStack() {
    if (this.auxiCadena[this.iterator].match(/^e.printStackTrace$/)) {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop()//pop a e.print
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarParentesisPrint();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarParentesisPrint() {
    if (this.auxiCadena[this.iterator] == "(") {
      this.iterator++;
      this.message = "sale: " + this.pila.peek();
      this.pila.pop()//pop a (
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarParentesisPrint2();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarParentesisPrint2() {
    if (this.auxiCadena[this.iterator] == ")") {
      this.iterator++;
      this.message = "sale: " + this.pila.peek();
      this.pila.pop();//pop a )
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarPunto_ComaPrint();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarPunto_ComaPrint() {
    if (this.auxiCadena[this.iterator] == ";") {
      this.iterator++;
      this.message = "sale: " + this.pila.peek();
      this.pila.pop(); //pop a ;
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarCierreLlaveComponente2();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarCierreLlaveComponente2() {
    if (this.auxiCadena[this.iterator] == "}") {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();//pop a }
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarReturn();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarReturn() {
    if (this.auxiCadena[this.iterator].match(/^return$/)) {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();//pop a return
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarIdenti2();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarIdenti2() {
    if (this.validarIdentificador()) {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();//pop a identificador
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarPunto_ComaCuerpo();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarPunto_ComaCuerpo() {
    if (this.auxiCadena[this.iterator] == ";") {
      this.message = "sale: " + this.pila.peek();
      this.iterator++;
      this.pila.pop();//pop a ;
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.validarLlaveFinalCuerpo();
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarLlaveFinalCuerpo() {
    if (this.auxiCadena[this.iterator] == "}") {
      this.message = "sale: " + this.pila.peek();
      this.pila.pop();//pop a } 
      this.transicion = ["" + this.pila.stack, this.message];
      this.transiciones.push(this.transicion);
      this.errorMessage = "Cadena Aceptada";
    } else {
      this.errorMessage = "Error sintactico no coincide con la pila ----> " + this.auxiCadena[this.iterator];
    }
  }

  validarIdentificador() {
    if (this.auxiCadena[this.iterator].match(/^[a-z]+$/)) {
      return true;
    } else {
      return false;
    }
  }

  validarSeparacion() {
    if (this.auxiCadena[this.iterator] == ",") {
      return true;
    } else {
      return false;
    }
  }

}





