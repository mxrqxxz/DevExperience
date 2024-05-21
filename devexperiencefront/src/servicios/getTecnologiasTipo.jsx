export async function getTecnologiasTipo (tipo) {

    const url = `http://devexperience.test/api/v1/tecnologias/${tipo}`;
    
    return fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error al obtener los datos");
        }
    }).catch(error => {
        console.error("Error al obtener los datos: ", error);
    });
}
