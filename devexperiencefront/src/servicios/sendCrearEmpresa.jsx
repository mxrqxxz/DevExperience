export async function sendCrearEmpresa (props) {
    const formData = new FormData();
    formData.append('CIF', props.cif);
    formData.append('nombre', props.nombre);
    formData.append('direccion', props.direccion);
    formData.append('imagen', props.imagen);

    return fetch('http://devexperience.test/api/v1/createEmpresa', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${props.token}`,
            'accept': 'application/json'
        },
        body: formData
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error al crear la empresa");
        }
    })
    .catch(error => {
        console.error("Error al crear la empresa: ", error);
        return false;
    });
}
