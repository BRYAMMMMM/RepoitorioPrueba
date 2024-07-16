import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from './cliente.model';
import { ClienteService } from './services/cliente.service';
import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent   implements OnInit{
  title = 'Consumo_api_trabajo';
  isEditMode: boolean = false; // Para controlar el modo de edición o creación
  clientes?: Cliente[];
  newCliente: Cliente = { cedula: '', nombre: '', direccion: '', email: '' };


  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.obtenerClientes().subscribe({
      next: (data: Cliente[]) => this.clientes = data,
      error: (error) => console.error('Error cargando clientes:', error)
    });
  }

  eliminarCliente(cedula: number) {
    this.clienteService.eliminarCliente(cedula).subscribe({
      next: () => {
        console.log('Cliente eliminado correctamente.');
        this.cargarClientes(); // Actualizar lista de clientes después de la eliminación
      },
      error: (error) => console.error('Error al eliminar cliente:', error)
    });
  }

  createCliente(): void {
    this.clienteService.guardarCliente(this.newCliente).subscribe(cliente => {
      this.clientes?.push(cliente);
      this.newCliente = { cedula: '', nombre: '', direccion: '', email: '' };
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.actualizarCliente();
    } else {
      this.createCliente();
    }
  }

  actualizarCliente() {
    this.clienteService.actualizarCliente(this.newCliente).subscribe({
      next: (clienteActualizado) => {
        console.log('Cliente actualizado:', clienteActualizado);
        this.cargarClientes(); // Actualiza la lista de clientes después de la actualización
        this.resetForm(); // Reinicia el formulario
      },
      error: (error) => console.error('Error al actualizar cliente:', error)
    });
  }

  resetForm() {
    this.newCliente = { cedula: '', nombre: '', direccion: '', email: '' };
    this.isEditMode = false; // Cambia al modo de creación
  }

  seleccionarCliente(cliente: Cliente) {
    this.newCliente = { ...cliente }; // Clona el objeto para evitar mutaciones directas
    this.isEditMode = true; // Cambia al modo de edición
  }

}
