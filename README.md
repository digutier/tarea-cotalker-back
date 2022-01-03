<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
 
# Tarea práctica Cotalker back.

## Instrucciones para correrlo en consola.

### En primer lugar, es importante señalar que los datos se obtendrán directamente a partir del archivo .csv entregado. Es por ello que es necesario que usted agregue el archivo "log.practica.2.csv" a la carpeta raíz del código fuente. (el mismo lugar donde se encuentra este README.md)

### Una vez añadido el archivo, dentro de la consola en la carpeta raíz deberá correr el comando "npm install" para poder instalar los componentes necesarios para su uso.

### Una vez finalizado el proceso de instalación, deberá correr el comando "npm run start" para poder desplegar el back-end en la URL http://localhost:3000/

### Cuando ya esté lista la carga, podrá a continuación realizar el despliegue por el lado front-end.

## Método HTTP Post

### En este caso se considera el llamado al método POST en la url http://localhost:3000/ para poder obtener los datos a mostrar en el front-end. Un ejemplo del Body es el siguiente:

```json
{
  "inicio": "2018-1-1",
  "fin": "2018-5-1",
  "usuarios": "-1",
  "compania": "2",
  "intervalo": 60
}
```

## Consideraciones sobre el desarrollo

### Por temas de tiempo debido al fin de año, fin de semestre y aprendizaje de una herramienta y lenguaje donde tenía muy poca experiencia, no se implementaron algunos aspectos importantes con respecto a buenas prácticas de desarrollo de código. Sin embargo, se logró cumplir con lo solicitado. Entre lo faltante se encuentra:
* El manejo de errores cuando se realiza mal una petición.
* Una posible indagación más extensa para implementar un algoritmo más eficiente que el uso de expresiones regulares para leer el .csv.
* El traspaso de la data del .csv a un formato externo dentro de una base de datos para facilitar la consulta de datos.
