export async function sendFormData (formData,token) {
    try {
        console.log('formData:', formData);
        const response = await fetch('http://devexperience.test/api/v1/createFormulario', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
            return { message: 'Formulario enviado con éxito' };
        } else {
            throw new Error(data.message || 'Error al enviar el formulario');
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        throw error;
    }
}
