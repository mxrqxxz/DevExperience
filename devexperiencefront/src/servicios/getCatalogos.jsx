export async function getCatalogos () {
    return fetch('http://devexperience.test/api/v1/catalogos').then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error al obtener los catálogos");
        }
    }).catch(error => {
        console.error("Error al obtener los catálogos: ", error);
    });
}
