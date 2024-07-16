
import { Cliente } from '../cliente.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/demojakarta/rs/cliente';

  
  constructor(private http: HttpClient) { }
  
  actualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.apiUrl, cliente);
  }
  

  
  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  guardarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }
  eliminarCliente(cedula: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?cedula=${cedula}`);
  }
 

}
