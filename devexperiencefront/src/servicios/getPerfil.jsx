export async function getPerfil(token) {
    return fetch('http://devexperience.test/api/v1/perfil', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error al recuperar el perfil");
        }
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error al recuperar el perfil: ", error);
        return false;
    });
}
