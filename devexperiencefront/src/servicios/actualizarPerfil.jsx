export async function actualizarPerfil(token, editableDatosPerfil, cuentasActualizadas) {
    const formData = new FormData();
    
    formData.append('nombre', editableDatosPerfil.nombre);
    formData.append('apellidos', editableDatosPerfil.apellidos);
    formData.append('sobre_mi', editableDatosPerfil.sobre_mi);
    formData.append('email', editableDatosPerfil.email);
    
    formData.append('cuentas', JSON.stringify(cuentasActualizadas));

    if (editableDatosPerfil.avatar) {
        formData.append('avatar', editableDatosPerfil.avatar);
        console.log('Avatar file:', editableDatosPerfil.avatar);
    }

    try {
        const response = await fetch('http://devexperience.test/api/v1/editarPerfil?_method=PUT', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const jsonResponse = await response.json();

        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        if (storedUser) {
            storedUser.foto = jsonResponse.avatar;
            localStorage.setItem('user', JSON.stringify(storedUser));
        } else {
            console.error('No se encontró el objeto user en localStorage.');
        }

        return jsonResponse;

    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        return false;
    }
}
