import { useAllowance } from "../../context/BalanceContext";
import Modal from "../Modal";

const LoadingModal: React.FC<{ hideAllowance?: boolean }> = ({
    hideAllowance = false,
}) => {
    const allowance = useAllowance();
    return (
        <Modal handleClose={() => null}>
            <div>
                <img src="/images/loading-black.svg" alt="Loading" />
                <h2>Loading</h2>
                <p>
                    Connecting to your wallet - this may take a few minutes...
                </p>

                {!hideAllowance && !allowance && (
                    <div>
                        <span>
                            If this is your first order, you will have to
                            confirm twice
                        </span>
                        <span>
                            The first confirmation allows the router to use your
                            WETH (allowance), the second confirmation places
                            your order
                        </span>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default LoadingModal;
