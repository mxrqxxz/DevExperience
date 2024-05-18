export async function sendLoginDetails (props) {
    try {
        const response = await fetch('http://devexperience.test/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({
                email: props.email,
                password: props.password
            })
        });
        const data = await response.json();
        if (response.ok) {
          const respuesta = {
            'access_token': data.access_token,
            'foto': data.user_image,
          }
            return respuesta;
        } else {
            throw new Error(data.message || 'Error al hacer login');
        } 
    } catch (error) {
        console.error('Error de Login:', error);
    }
};