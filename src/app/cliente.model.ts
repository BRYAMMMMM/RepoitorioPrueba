export class Cliente {
    clienteId?: number;
    cedula: string;
    nombre: string;
    direccion: string;
    email: string;
  
    constructor(clienteId: number, cedula:string, nombre: string, direccion: string, email: string) {
      this.clienteId = clienteId;
      this.cedula = cedula;
      this.nombre = nombre;
      this.direccion = direccion;
      this.email = email;
    }
}