import React from "react";
import ReactDOM from "react-dom";
import styles from "./ImageZoomModal.module.css";

const ImageZoomModal = ({ isOpen, onClose, imageSrc, alt }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <img src={imageSrc} alt={alt} className={styles.modalImage} />
                </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default ImageZoomModal;