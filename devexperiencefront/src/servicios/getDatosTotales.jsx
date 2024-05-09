export async function getDatosTotales () {
    return fetch('http://devexperience.test/api/v1/datosHome').then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error al obtener los datos");
        }
    }).catch(error => {
        console.error("Error al obtener los datos: ", error);
    });
}
