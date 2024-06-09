export async function sendRegisterDestails(props) {
    try {
        const response = await fetch('http://devexperience.test/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
            return { token: data.access_token };
        } else {
            return { errorMessage: data.message };
        }
    } catch (error) {
        console.error('Error de Registro:', error);
        return { errorMessage: error.message };
    }
};