export async function checkToken(token) {
    return fetch('http://devexperience.test/api/v1/checkToken', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error al verificar el token");
        }
    })
    .then(data => {
        return data.valido;
    })
    .catch(error => {
        console.error("Error al verificar el token: ", error);
        return false;
    });
}
