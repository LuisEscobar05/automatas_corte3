import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { StackService } from 'src/app/services/stack.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  cadena;
  auxiCadena
  errorMessage;
  lastState;
  iterator;
  identificador;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService: DataService, private pila: StackService) { }
  
  ngOnInit() {
  }

  evaluar(){
    this.iterator=0;
    this.cadena = this.cadena;
    this.auxiCadena = this.cadena.split(" ");
    if(this.auxiCadena[this.iterator]=="public")
    {
      this.pila.push("cuerpo");
      this.pila.push("conectarMySQL()");
      this.pila.push("Connection");
      this.pila.push("public")
      this.dataService.setData(this.pila,this.errorMessage,this.lastState);
      this.pila.print();
      this.validarConnection();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }

  }

  validarConnection()
  {
    this.pila.pop();// pop a public
    this.iterator++;
    if(this.auxiCadena[this.iterator]=="Connection")
    {
      this.pila.pop(); // pop a Connection
      this.iterator++;
      this.pila.print();
      this.validarConectarMySQL();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarConectarMySQL()
  {
    if(this.auxiCadena[this.iterator]=="conectarMySQL()")
    {
      this.pila.pop(); //pop a conectarMySQL()
      this.iterator++;
      this.pila.print();
      this.validarCuerpo();
    }
  }

  validarCuerpo()
  {
    if(this.auxiCadena[this.iterator]=="{")
    {

      this.pila.pop(); //pop a <cuerpo>
      this.iterator++;
      this.pila.push("}");
      this.pila.push(";");
      this.pila.push("identificador");
      this.pila.push("return");
      this.pila.push("componente2");
      this.pila.push("componente1");
      this.pila.push("{");
      this.pila.print();
      this.validarComponente1();
    }
  }

  validarComponente1()
  {
    this.pila.pop(); //pop a {
    if(this.auxiCadena[this.iterator]=="Connection")
    {
      this.pila.pop(); // pop a componente1
      this.iterator++;
      this.pila.push(";");
      this.pila.push("null");
      this.pila.push("=");
      this.pila.push("Identificador");
      this.pila.push("Connection");
      this.pila.print();
      this.validarIdenti1();
    }
  }



  validarIdenti1()
  {
    this.pila.pop(); //pop a Connection
    if(this.validarIdentificador())
    {
      this.pila.pop()//pop a Identificador
      this.iterator++;
      this.pila.print();
      this.validarAsignacion();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarAsignacion()
  {
    if(this.auxiCadena[this.iterator].match(/^=$/))
    {
      this.pila.pop()//pop a =
      this.iterator++;
      this.pila.print();
      this.validarNull();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarNull()
  {
    if(this.auxiCadena[this.iterator].match(/^null$/))
    {
      this.pila.pop();//pop a null
      this.iterator++;
      this.pila.print();
      this.validarTerminacion();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
 
  }

  validarTerminacion()
  {
    if(this.auxiCadena[this.iterator] ==";")
    {
      this.pila.pop(); //pop a ;
      this.iterator++;
      this.pila.print();
      this.validarComponente2();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarComponente2()
  {
    if(this.auxiCadena[this.iterator].match(/^try$/))
    {
      this.pila.pop()//pop a componente2
      this.iterator++;
      this.pila.push("}");
      this.pila.push(";");
      this.pila.push(")");
      this.pila.push("(");
      this.pila.push("e.printStackTrace");
      this.pila.push("{");
      this.pila.push(")");
      this.pila.push("subcomponente2_2");
      this.pila.push("(");
      this.pila.push("catch");
      this.pila.push("}");
      this.pila.push("subcomponente2_1");
      this.pila.push("{");
      this.pila.push("try");
      this.pila.print();
      this.validarLLave();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarLLave()
  {
    this.pila.pop()//pop a try
    if(this.auxiCadena[this.iterator]=="{")
    {
      this.pila.pop()//pop a {
      this.iterator++;
      this.pila.print();
      this.validarSubcomponente2_1();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarSubcomponente2_1()
  {
    this.pila.pop()//pop a {
    if(this.auxiCadena[this.iterator].match(/^Class.forName$/))
    {
      this.pila.push("complemento2_1");
      this.pila.push(";");
      this.pila.push(")");
      this.pila.push("driver");
      this.pila.push("(");
      this.pila.push("Class.forName");
      this.iterator++;
      this.pila.print();
      this.validarParentesis1();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarParentesis1()
  {
    this.pila.pop()//pop a Class.forName
    if(this.auxiCadena[this.iterator]=="(")
    {
      this.iterator++;
      this.pila.pop()//pop a (
      this.pila.print();
      this.validarDriver();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarDriver()
  {
    if(this.auxiCadena[this.iterator].match(/^com.mysql.jdbc.Driver$/))
    {
      this.iterator++;
      this.pila.pop()//pop a driver;
      this.pila.push("com.mysql.jdbc.Driver");
      this.pila.print();
      this.validarParentesis2();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarParentesis2()
  {
    this.pila.pop() //pop a com.mysql.jdbc.Driver
    if(this.auxiCadena[this.iterator]==")")
    {
      this.iterator++;
      this.pila.pop()//pop a )
      this.pila.print();
      this.validarPunto_Coma();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarPunto_Coma()
  {
    if(this.auxiCadena[this.iterator]==";")
    {
      this.iterator++;
      this.pila.pop(); //pop a ;
      this.pila.print();
      this.validarComplemento2_1();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarComplemento2_1()
  {
    if(this.validarIdentificador()){
        this.pila.push(";");
        this.pila.push(")");
        this.pila.push("pass");
        this.pila.push(",");
        this.pila.push("user");
        this.pila.push(",");
        this.pila.push("url");
        this.pila.push("(");
        this.pila.push("DriverManager.getConnection");
        this.pila.push(")");
        this.pila.push("Connection");
        this.pila.push("(");
        this.pila.push("=");
        this.iterator++;
        this.pila.print();
        this.validarIgual();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarIgual()
  {
    this.pila.pop()//pop a identificador
    if(this.auxiCadena[this.iterator].match(/^=$/))
    {
      this.iterator++;
      this.pila.pop()//pop a =
      this.pila.print();
      this.validarParentesis2_1();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarParentesis2_1()
  {
    if(this.auxiCadena[this.iterator]=="(")
    {
      this.iterator++;
      this.pila.pop()//pop a (;
      this.pila.print();
      this.validarConnection2_1();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarConnection2_1()
  {
    console.log("geea")
    if(this.auxiCadena[this.iterator].match(/^Connection$/))
    {
      this.iterator++;
      this.pila.pop();//pop a Connection
      this.pila.print();
      this.validarParentesis2_2();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarParentesis2_2()
  {
    if(this.auxiCadena[this.iterator]==")")
    {
      this.iterator++;
      this.pila.pop();
      this.pila.print();
      this.validarDriverManager();      
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarDriverManager()
  {
    if(this.auxiCadena[this.iterator].match(/^DriverManager.getConnection$/))
    {
      this.iterator++;
      this.pila.pop();//pop a DriverManager.getConnection
      this.pila.print();
      this.validarParentesisComplemento2_1();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarParentesisComplemento2_1()
  {
    if(this.auxiCadena[this.iterator]=="(")
    {
      this.iterator++;
      this.pila.pop()//pop a (
      this.pila.print();
      this.validarUrl();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarUrl()
  {
    if(this.auxiCadena[this.iterator].match(/^jdbc:mysql:\/\/([a-z]|[\d]|[$-])+(.)+([a-z]|[\d]|[$-])+(?=[a-z])*(?=[\d])*(?=[.$-])*:3306\/[a-z]+$/i))
    {
      this.iterator++;
      this.pila.pop()//pop a url
      this.pila.print();
      this.validarComa1();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarComa1()
  {
    if(this.validarSeparacion())
    {
      this.iterator++;
      this.pila.pop()//pop a ,
      this.pila.print();
      this.validarUser();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }
  
  validarSeparacion()
  {
    if(this.auxiCadena[this.iterator]==",")
    {
      return true;
    }else{
      return false;
    }
  }

  validarUser()
  {
    if(this.validarIdentificador)
    {
      this.iterator++;
      this.pila.pop()//pop a user
      this.pila.print();
      this.validarComa2();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarComa2()
  {
    if(this.validarSeparacion)
    {
      this.iterator++;
      this.pila.pop();//pop a ,
      this.pila.print();
      this.validarPass();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarPass()
  {
    if(this.auxiCadena[this.iterator].match(/^[a-z]+([\d]|[$@$/.\-]|[a-z])+$/))
    {
      this.iterator++;
      this.pila.pop();//pop a pass
      this.pila.print();
      this.validarParentesisComplemento2_2();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }


  validarParentesisComplemento2_2()
  {
    if(this.auxiCadena[this.iterator]==")")
    {
      this.iterator++;
      this.pila.pop();//pop a )
      this.pila.print();
      this.validarPunto_ComaFinalComplemento();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarPunto_ComaFinalComplemento()
  {
    if(this.auxiCadena[this.iterator]==";")
    {
      this.iterator++;
      this.pila.pop();//pop a ;
      this.pila.print();
      this.validarLLaveCierreSubComponente2_1();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }


  validarLLaveCierreSubComponente2_1()
  {
    if(this.auxiCadena[this.iterator]=="}")
    {
      this.iterator++;
      this.pila.pop();//pop a 
      this.pila.print();
      this.validarCatch();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarCatch()
  {
    if(this.auxiCadena[this.iterator].match(/^catch$/))
    {
      this.iterator++;
      this.pila.pop();//pop a catch
      this.pila.print();
      this.validarParentesisComponente2();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarParentesisComponente2()
  {
    if(this.auxiCadena[this.iterator]=="(")
    {
      this.iterator++;
      this.pila.pop(); //pop a (
      this.pila.print();
      this.validarSubComponente2_2();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarSubComponente2_2()
  {
    if(this.auxiCadena[this.iterator].match(/SQLException/))
    {
      this.auxiCadena[this.iterator] += " " +this.auxiCadena[this.iterator+1];
      this.iterator=this.iterator+2;
      this.pila.pop(); //pop a subcomponente2_2
      this.pila.push("SQLException e");
      this.pila.print();
      this.validarParentesisComponente2Cierre();
    }
    if(this.auxiCadena[this.iterator].match(/^ClassNotFoundException$/))
    {
      this.iterator++;
      this.pila.pop()//pop a subcomponente2_2
      this.pila.push("ClassNotFoundException");
      this.pila.print();
      this.validarParentesisComponente2Cierre();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarParentesisComponente2Cierre()
  {
    this.pila.pop()//pop a sqlexception o classnotfound
    if(this.auxiCadena[this.iterator]==")")
    {
      this.iterator++;
      this.pila.pop();//pop a )
      this.pila.print();
      this.validarLLaveComponente2();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarLLaveComponente2()
  {
    if(this.auxiCadena[this.iterator]=="{")
    {
      this.iterator++;
      this.pila.pop()//pop a {
      this.pila.print();
      this.validarPrintStack();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarPrintStack()
  {
    if(this.auxiCadena[this.iterator].match(/^e.printStackTrace$/))
    {
      this.iterator++;
      this.pila.pop()//pop a e.print
      this.pila.print();
      this.validarParentesisPrint();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarParentesisPrint()
  {
    if(this.auxiCadena[this.iterator]=="(")
    {
      this.iterator++;
      this.pila.pop()//pop a (
      this.pila.print()
      this.validarParentesisPrint2();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarParentesisPrint2()
  {
    if(this.auxiCadena[this.iterator]==")")
    {
      this.iterator++;
      this.pila.pop();//pop a )
      this.pila.print();
      this.validarPunto_ComaPrint();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarPunto_ComaPrint()
  {
    if(this.auxiCadena[this.iterator]==";")
    {
      this.iterator++;
      this.pila.pop(); //pop a ;
      this.pila.print()
      this.validarCierreLlaveComponente2();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarCierreLlaveComponente2()
  {
    if(this.auxiCadena[this.iterator]=="}")
    {
      this.iterator++;
      this.pila.pop();//pop a }
      this.pila.print();
      this.validarReturn();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarReturn()
  {
    if(this.auxiCadena[this.iterator].match(/^return$/))
    {
      this.iterator++;
      this.pila.pop();//pop a return
      this.pila.print();
      this.validarIdenti2();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarIdenti2()
  {
    if(this.validarIdentificador())
    {
      this.iterator++;
      this.pila.pop();//pop a identificador
      this.pila.print();
      this.validarPunto_ComaCuerpo();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarPunto_ComaCuerpo()
  {
    if(this.auxiCadena[this.iterator]==";")
    {
      this.iterator++;
      this.pila.pop();//pop a ;
      this.pila.print();
      this.validarLlaveFinalCuerpo();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }

  validarLlaveFinalCuerpo()
  {
    if(this.auxiCadena[this.iterator]=="}")
    {
      this.pila.pop();//pop a } 
      this.pila.print();
    }else{
      this.errorMessage="Error sintactico ----> " + this.auxiCadena[this.iterator]; 
    }
  }


  validarIdentificador()
  {
    if(this.auxiCadena[this.iterator].match(/^[a-z]+$/))
    {
      return true;
    }else{
      return false;
    }
  }


  //public Connection conectarMySQL() { Connection asad = null ; try { Class.forName ( com.mysql.jdbc.Driver ) ;

}





