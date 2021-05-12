import { useCallback, useEffect, useState } from "react";
import { User } from "../context/UserContext";
import { hasGivenWETHAllowance } from "../utils/weth";

const useHasGivenWETHAllowance = (user: User) => {
    const [allowance, setAllowance] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);

    const checkAllowance = useCallback(async () => {
        if (user) {
            setLoading(true);
            try {
                const result = await hasGivenWETHAllowance(
                    user.address,
                    user.provider,
                );
                setAllowance(result);
            } catch (err) {
                setAllowance(false);
            }
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        checkAllowance();
    }, [checkAllowance]);

    return { allowance, reload: checkAllowance, loading };
};
export default useHasGivenWETHAllowance;
