import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Opciones para la cabecera HTTP
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Base URL del API de Mockaroo
  apiURL = 'https://my.api.mockaroo.com/nosotros.json?key=cd95e460';

  // Constructor para inyectar el servicio HttpClient
  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las noticias
   * @returns Observable con todas las noticias
   */
  getNoticias(): Observable<any> {
    return this.http.get(this.apiURL).pipe(
      retry(3) // Reintenta 3 veces en caso de error
    );
  }

  /**
   * Obtener una noticia por su ID
   * @param id ID de la noticia a buscar
   * @returns Observable con la noticia
   */
  getNoticia(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}?id=${id}`).pipe(
      retry(3) // Reintenta 3 veces en caso de error
    );
  }

  /**
   * Crear una noticia
   * @param noticia Objeto de la noticia a crear
   * @returns Observable con la respuesta del servidor
   */
  createNoticia(noticia: any): Observable<any> {
    return this.http.post(this.apiURL, noticia, this.httpOptions).pipe(
      retry(3) // Reintenta 3 veces en caso de error
    );
  }

  /**
   * Actualizar una noticia por su ID
   * @param id ID de la noticia a actualizar
   * @param noticia Objeto con los datos actualizados
   * @returns Observable con la respuesta del servidor
   */
  updateNoticia(id: number, noticia: any): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, noticia, this.httpOptions).pipe(
      retry(3) // Reintenta 3 veces en caso de error
    );
  }

  /**
   * Eliminar una noticia por su ID
   * @param id ID de la noticia a eliminar
   * @returns Observable con la respuesta del servidor
   */
  deleteNoticia(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`, this.httpOptions).pipe(
      retry(3) // Reintenta 3 veces en caso de error
    );
  }
}
