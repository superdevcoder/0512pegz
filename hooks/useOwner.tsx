import { useEffect, useState } from "react";
import { AssetFromAPI } from "../types";
import { API_URL } from "../utils/constants";

const useOwner = (asset: AssetFromAPI) => {
    const [assetOwner, setAssetOwner] = useState<string | null>(null);

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const { owner } = asset.top_ownerships[0];
                setAssetOwner(owner.address);
                try {
                    const profileRes = await fetch(
                        `${API_URL}/profiles/${owner.address}`,
                    );
                    const profileData = await profileRes.json();
                    setAssetOwner(profileData?.username);
                } catch (err) {
                    console.log("Exception in fetching username", err);
                }
            } catch (err) {
                setAssetOwner(null);
            }
        };
        fetchOwner();
    }, [asset]);

    return assetOwner;
};

export default useOwner;
