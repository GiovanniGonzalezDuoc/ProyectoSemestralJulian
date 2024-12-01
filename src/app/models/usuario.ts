export class Usuario {
    id_usuario!: number;
    nombre!: string;
    id_rol!: number;
    email!: string;
    contrasena!: string;
    foto!: Blob; // BLOB para la foto
    id_pregunta!: number;
    respuesta!: string;
}
