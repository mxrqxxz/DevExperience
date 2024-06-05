export async function getEmpresa(token, id) {
    return fetch(`http://devexperience.test/api/v1/empresa/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response);
            throw new Error("Error al recuperar la información de la empresa");
        }
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error al recuperar la información de la empresa: ", error);
        return false;
    });
}
