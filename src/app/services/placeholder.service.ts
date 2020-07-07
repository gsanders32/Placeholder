import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToDo } from '../interfaces/itodo';

@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {

  url = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private httpClient: HttpClient) { }

  async getAll(): Promise<IToDo[]>{
    return await this.httpClient.get<IToDo[]>(this.url).toPromise();
  }

}
