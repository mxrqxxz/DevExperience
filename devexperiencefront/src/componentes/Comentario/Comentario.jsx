import React, { useState, useEffect, useContext } from "react";
import "./Comentario.css";
import ColoresContext from "../../contextos/ColoresContext.jsx";
import likeBlanco from "../../assets/imgs/empresas/likeBlanco.png";
import likeNegro from "../../assets/imgs/empresas/likeNegro.png";
import dislikeBlanco from "../../assets/imgs/empresas/dislikeBlanco.png";
import dislikeNegro from "../../assets/imgs/empresas/dislikeNegro.png";
import avatar from '../../assets/imgs/Avatar.svg';
import { sendReaccion } from "../../servicios/sendReaccion.jsx";

function Comentario(props) {

    // User

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token || null;

    const colores = useContext(ColoresContext);
    const [modoColor, setModoColor] = useState(props.modoColor);

    useEffect(() => {
        const updateColorMode = () => {
            const newColorMode = props.modoColor;
            setModoColor(newColorMode);
        };
        updateColorMode();
    }, [props.modoColor]);

    // LÓGICA DE LA FOTO DEL USUARIO QUE HA COMENTADO

    const [urlFoto, setUrlFoto] = useState(avatar);

    useEffect(() => {
        if (props.comentario.avatar !== null && props.comentario.avatar !== "" && props.comentario.avatar !== undefined && props.comentario.avatar !== "url_example") {
            // Si es una foto almacenada
            if (props.comentario.avatar.startsWith("imagenesPerfil/")) {
                setUrlFoto("http://devexperience.test/storage/" + props.comentario.avatar);
            } else {
                // Si es una foto de google
                setUrlFoto(props.comentario.avatar);
            }
        } else {
            setUrlFoto(avatar);
        }
    }, [props.comentario.avatar]);

    // Lógica de los likes y dislikes

    const [reaccion, setReaccion] = useState({
        comentario_id: props.comentario.id,
        reaccion: ""
    });

    function asignarReaccion(reaccionNueva) {
        setReaccion({ ...reaccion, reaccion: reaccionNueva });
    }

    useEffect(() => {
        sendReaccion(reaccion, token).then(response => {
            console.log("Reacción enviada con éxito:", response);
        })
        .catch(error => {
            console.error("Error al enviar la reacción:", error);
        });
    }, [reaccion]);

    return (
        <div className="col-12">
            <div className="comentario">
                <div>
                    <img src={urlFoto} className="fotoComentario" alt="Foto de perfil del usuario" />
                </div>
                <div>
                    <p className="azulClaro">{props.comentario.usuario}</p>
                    <p style={{ color: colores[modoColor].Texto.principal }}>{props.comentario.contenido}</p>
                    <div className="containerLikes">
                        <button className="sinFondo" onClick={() => asignarReaccion("like")}>
                            <img src={modoColor === "Dark" ? likeBlanco : likeNegro} alt="Foto me gusta" />
                        </button>
                        <p style={{ color: colores[modoColor].Texto.principal }}>{props.comentario.likes}</p>
                        <button className="sinFondo" onClick={() => asignarReaccion("dislike")}>
                            <img src={modoColor === "Dark" ? dislikeBlanco : dislikeNegro} alt="Foto no me gusta" />
                        </button>
                        <p style={{ color: colores[modoColor].Texto.principal }}>{props.comentario.dislikes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comentario;