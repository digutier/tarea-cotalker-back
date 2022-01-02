import { Injectable } from '@nestjs/common'
import { getDefaultSettings } from 'http2';

const util = require('util'),
    fs = require('fs')

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

function toLocal(date) {
  return new Date(date.getTime() - 10800000);
}

function toNotLocal(date) {
  return new Date(date.getTime() + 10800000);
}

function addDay(date) {
  return new Date(date.getTime() + 86400000);
}

function addMili(date) {
  return new Date(date.getTime() + 1);
}

const nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

@Injectable()
export class AppParser {

  async parse(fechaIni, fechaFin, usuarios, compania, intervalo) {

    let idCompania = compania;
    let idUsuario = '';

    // Valor que representa el usuario que se quiere mostrar. En caso de ser igual a -1 el valor, entonces se trata de todos los usuarios de la compania.
    if (usuarios == -1) {
      idUsuario = '\\d+';
    } else {
      idUsuario = usuarios;
    }

    let fechaInicial = fechaIni.split('-'); // En formato aaaa-mm-dd

    let fechaFinal = fechaFin.split('-');

    let dateIni = toLocal(new Date(fechaInicial[0], fechaInicial[1]-1, fechaInicial[2], 0, 0, 0, 0));
    let dateFin = addDay(toLocal(new Date(fechaFinal[0], fechaFinal[1]-1, fechaFinal[2], 0, 0, 0, 0)));

    console.log(dateIni);
    console.log(dateFin);

    let lareg = new RegExp(idCompania + "," + idUsuario + ",\\w+@\\d+,\\d+,\\d+-.*\n", "g"); // Expresion regular para luego encontrar los resultados filtrados.

    const rs = fs.createReadStream('log.practica.2.csv');
    rs.setEncoding('utf-8');
    let c = [];
    let primero = true;
    let sesion = new Date();
    let sesiones = new Object();
    let aux = '';
    let aux2 = [];
    let aux3 = '';
	  for await (const buf of rs) {

      if (primero) {
        aux2 = buf.split('\n');
        aux = aux2.pop();
        aux3 = aux2.join('\n');
      } else {
        aux2 = buf.split('\n');
        aux2[0] = aux2[0]+aux;
        aux = aux2.pop();
        aux3 = aux2.join('\n');
      }

      primero = false;

      const aux4 = buf.matchAll(lareg);
      if (aux4 != null) {
        for (const s of aux4) {
          let calce = s[0].split(',');
          let dia = new Date(calce[4]);
          if (dia >= dateIni && dia <= dateFin) {
            if (calce[1] in sesiones) {
              if (dia > sesiones[calce[1]]) {
                sesiones[calce[1]] = addMinutes(dia, intervalo);
                c.push(dia);
              }
            } else {
              sesiones[calce[1]] = addMinutes(dia, intervalo);
              c.push(dia);
            }
          }
        }
      }
	  }

    let graphData = new Object();
    let contadorInicial = dateIni;
    while (contadorInicial < dateFin) {
      let auxContador = toNotLocal(contadorInicial);
      let formatoAux = auxContador.getDate().toString() + ' ' + nombreMeses[auxContador.getMonth()] + ' ' + auxContador.getFullYear();
      graphData[formatoAux] = 0;
      contadorInicial = addDay(contadorInicial);
    }
    for (const aux of c) {
      let sesionAct = toNotLocal(new Date(aux));
      let diaAct = sesionAct.getDate();
      let mesAct = nombreMeses[sesionAct.getMonth()];
      let anioAct = sesionAct.getFullYear();
      let formatAct = diaAct.toString() + ' ' + mesAct + ' ' + anioAct.toString();
      graphData[formatAct] = graphData[formatAct] + 1;
    }
    return graphData;
  }
}