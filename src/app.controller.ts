import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppParser } from './app.parser';

@Controller()
export class AppController {
  constructor(private readonly appParser: AppParser) {}

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
    
  }
}