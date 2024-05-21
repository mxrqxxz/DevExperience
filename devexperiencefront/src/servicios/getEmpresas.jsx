export async function getEmpresas(token) {
    return fetch('http://devexperience.test/api/v1/empresas', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error al recuperar empresas");
        }
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error al recuperar la lista de empresas: ", error);
        return false;
    });
}
