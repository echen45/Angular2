import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  pokeName: string = "feraligatr"

  constructor(private httpCli: HttpClient) { }

  /* getOnePokemon(){
    return this.httpCli.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${this.pokeName}`);
  }

  getAllPokemon(){
    return this.httpCli.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=1181`);
  } */
}
