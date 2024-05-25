import React, { useState, useContext } from 'react';
import './modalImgPerfil.css'
import { Modal } from 'react-bootstrap';
import ColoresContext from "../../contextos/ColoresContext";
import Cabra from '../../assets/imgs/avataresPerfil/cabra.svg';
import Burro from '../../assets/imgs/avataresPerfil/burro.svg';
import Conejo from '../../assets/imgs/avataresPerfil/conejo.svg';
import Cerdo from '../../assets/imgs/avataresPerfil/cerdo.svg';
import Gato from '../../assets/imgs/avataresPerfil/gato.svg';
import Pollo from '../../assets/imgs/avataresPerfil/pollo.svg';
import Vaca from '../../assets/imgs/avataresPerfil/vaca.svg';
import Pato from '../../assets/imgs/avataresPerfil/pato.svg';
import Upload from '../../assets/imgs/avataresPerfil/uploadAvatar.svg';
function ModalImgPerfil(props) {
    const colores = useContext(ColoresContext);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        props.handleImgPerfil(image); 
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Lee el archivo como una URL de datos para la vista previa
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result); // Establece la vista previa de la imagen
            };
            reader.readAsDataURL(file);
    
            // Pasa el archivo al componente padre
            props.handleImgPerfil(file); // Pasa el archivo en lugar de la URL de datos
        }
    };
    
  const arrayImagenes = [Cabra, Burro, Conejo, Cerdo, Gato, Pollo, Vaca, Pato];
    return (
        <Modal show={props.show} onHide={props.handleClose} body={false} >
            <Modal.Header
                closeButton
                style={{
                    backgroundColor: colores[props.modoColor].Fondos.principal,
                    color: colores[props.modoColor].Texto.principal,
                    border: '0px',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px'
                }}
            >
                <div className="modal-header-content">
                    <img src={selectedImage === null ? props.url : selectedImage} alt="Imagen de perfil" className="imgModalPerfil" />
                    <h3 className='text-modal-cabecera'>Selecciona una imagen</h3>
                </div>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: colores[props.modoColor].Fondos.principal, color: colores[props.modoColor].Texto.principal, borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                <div className="row">
                    <div className="col-4 d-flex justify-content-center">
                        <label htmlFor="upload-input">
                            <img
                                src={Upload}
                                alt="Subir imagen"
                                className={'imgModalPerfil'}
                                style={{ width: '80%', cursor: 'pointer' }}
                            />
                        </label>
                        <input
                            id="upload-input"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    {arrayImagenes.map((imagen, index) => {
                        return (
                            <div className="col-4 d-flex justify-content-center" key={'img-mod' + index}>
                                <img
                                    src={imagen}
                                    alt="Imagen de perfil"
                                    className={`imgModalPerfil ${selectedImage === imagen ? 'selected' : ''}`}
                                    onClick={() => handleImageClick(imagen)}
                                    style={{ width: '80%', cursor: 'pointer' }}
                                />                            </div>
                        )
                    })}
                </div>
            </Modal.Body>
        </Modal>

    )

}

export default ModalImgPerfil;