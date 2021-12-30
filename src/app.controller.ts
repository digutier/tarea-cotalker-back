import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

<<<<<<< HEAD
  @Post()
  async getHello(
    @Body('inicio') fechaIni: string,
    @Body('fin') fechaFin: string,
    @Body('usuarios') usuarios: string,
    @Body('compania') companias: string,
    @Body('intervalo') intervalo: number,
  ):  Promise<Object> {
    
    const a = await this.appParser.parse(fechaIni, fechaFin, usuarios, companias, intervalo);

    return a;
    
=======
  @Get()
  getHello(): string {
    return this.appService.getHello();
>>>>>>> parent of 11016bc (Progreso! Puedo leer el csv en 3 segundos.)
  }
}
