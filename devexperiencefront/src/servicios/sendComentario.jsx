export async function sendComentario (formData,token) {
    try {
        return await fetch('http://devexperience.test/api/v1/createComentario', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                empresa_id: formData.empresa_id,
                contenido: formData.contenido
            })
        }).then((response) => {
            if (response.ok) {
                const data = response.json();
                console.log(data);
                return data;
            } else {
                throw new Error("Error");
            }
        });
    } catch (error) {
        console.error('Error al enviar la reacción:', error);
        throw error;
    }
}
