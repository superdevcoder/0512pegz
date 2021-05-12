import styles from "./ResultModal.module.scss";
import Modal from "../Modal";

const ResultModal: React.FC<{
    handleClose: () => void;
    result: {
        error: boolean;
        message: string;
    };
}> = ({ handleClose, result: { error, message } }) => (
    <Modal handleClose={handleClose}>
        <div className={styles.container}>
            {error ? (
                <img src="/images/error.svg" alt="Error" />
            ) : (
                <img src="/images/success.svg" alt="Success" />
            )}
            <h2>{error ? "There was an issue" : "Success!"}</h2>
            <p>{message}</p>
            <button onClick={handleClose}>Got it!</button>
        </div>
    </Modal>
);

export default ResultModal;
