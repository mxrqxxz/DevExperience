export async function sendRegisterDestails (props) {
    try {
        const response = await fetch('http://devexperience.test/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({
                usuario: props.usuario,
                nombre: props.nombre,
                apellidos: props.apellidos,
                email: props.email,
                password: props.password,
                confirm_password: props.confirm_password,

            })
        });
        const data = await response.json();
        if (response.ok) {
            return data.access_token;
        } else {
            throw new Error(data.message || 'Error al registrar usuario');
        } 
    } catch (error) {
        console.error('Error de Registro:', error);
    }
};