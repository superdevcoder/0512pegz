import styles from "./Modal.module.scss";

const Modal: React.FC<{ handleClose: () => void }> = ({
    handleClose,
    children,
}) => {
    return (
        <div
            onKeyPress={handleClose}
            className={styles.container}
            role="presentation"
            onClick={handleClose}
        >
            <div
                className={styles.content}
                role="presentation"
                onKeyPress={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
