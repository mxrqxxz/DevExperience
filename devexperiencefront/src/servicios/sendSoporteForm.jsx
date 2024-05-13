export async function sendSoporteForm (props) {
    return fetch('http://devexperience.test/api/v1/enviarCorreoForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: props.nombre,
            email: props.email,
            mensaje: props.mensaje
        }),
    })
}
