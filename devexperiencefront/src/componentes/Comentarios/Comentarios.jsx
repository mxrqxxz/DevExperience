import React, { useState, useEffect, useContext } from "react";
import ColoresContext from "../../contextos/ColoresContext.jsx";
import Comentario from "../Comentario/Comentario";
import avatar from '../../assets/imgs/Avatar.svg';
import "./Comentarios.css";
import { sendComentario } from "../../servicios/sendComentario.jsx";


function Comentarios(props) {

    const colores = useContext(ColoresContext);
    const [modoColor, setModoColor] = useState(props.modoColor);

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.modoColor;
            setModoColor(newColorMode);
        };
        updateColorMode();
    }, [props.modoColor]);

    // CARGAR COMENTARIOS
    const [numeroComentarios, setNumeroComentarios] = useState(props.comentarios.length);
    const [listaComentarios, setListaComentarios] = useState(props.comentarios);

    function mostrarComentario(comentario) {
        return <Comentario key={comentario.id} comentario={comentario} modoColor={modoColor} />;
    }

    // LÓGICA DE LA FOTO DEL USUARIO QUE HA COMENTADO
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token || null;

    const [urlFoto, setUrlFoto] = useState(avatar);

    useEffect(() => {
        if (user.foto !== null && user.foto !== "" && user.foto !== undefined && user.foto !== "url_example" && user.foto !== "Sin definir") {
            // Si es una foto almacenada
            if (user.foto.startsWith("imagenesPerfil/")) {
                setUrlFoto("http://devexperience.test/storage/" + user.foto);
            } else {
                // Si es una foto de google
                setUrlFoto(user.foto);
            }
        } else {
            setUrlFoto(avatar);
        }
    }, [urlFoto]);

    // NUEVO COMENTARIO

    function enviarComentario() {
        const contenido = document.querySelector(".textAreaComentario").value;
        const formData = {
            empresa_id: props.destinoNuevoComentario,
            contenido: contenido
        };
    
        sendComentario(formData, token)
            .then(response => {
                console.log("Comentario enviado con éxito");
                vaciarComentario();
                console.log("dataCLiente: ", response);
                setListaComentarios([...listaComentarios, response]);
                setNumeroComentarios(numeroComentarios + 1);
            })
            .catch(error => {
                console.error("Error al enviar el comentario:", error);
            });
    }

    function vaciarComentario() {
        document.querySelector(".textAreaComentario").value = "";
    }

    return (
        <div className="cajaComentarios">
            <h2 style={{ color: colores[modoColor].Texto.principal }} className="tituloComentarios">{numeroComentarios} Comentarios</h2>
            <div className="nuevoComentario">
                <div>
                    <img src={urlFoto} alt="Avatar" className="fotoComentario" />
                </div>
                <div className="segundaCajaComentarios">
                    <textarea style={{ color: colores[modoColor].Texto.principal }}  placeholder="Añade un comentario..." className="textAreaComentario" />
                    <div className="botonesComentario">
                        <button style={{ color: colores[modoColor].Texto.principal }}  className="sinFondo" onClick={vaciarComentario}>Cancelar</button>
                        <button style={{ color: colores[modoColor].Texto.principal }}  className="sinFondo" onClick={enviarComentario}>Comentar</button>
                    </div>
                </div>
            </div>
            <div>
                {listaComentarios.map(mostrarComentario)}
            </div>
        </div>
    );
}

export default Comentarios;