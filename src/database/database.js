import pkg from 'pg';
import fs from 'fs';

const { Client } = pkg;

const client = new Client({
    host: "localhost", // Cambiar a tu dirección local de PostgreSQL
    user: "postgres", // Cambiar al nombre de usuario de tu base de datos
    password: "Jm0450079827", // Cambiar a la contraseña de tu base de datos
    database: "back_sensors", // Cambiar al nombre de tu base de datos
    port: 5432, // Puerto por defecto de PostgreSQL
    ssl: false, // Deshabilitar SSL para conexión local
});

client.connect()
    .then(() => console.log('Conectado exitosamente a la base de datos'))
    .catch(err => {
        console.error('Error con la base de datos ', err);
        client.end();
    });

export { client };
