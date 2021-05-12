import {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from "react";
import { API_URL } from "../utils/constants";
import { Profile } from "../types";

type SiteProfilesContextData = {
    profiles: Profile[];
};

const SiteProfilesContext = createContext<SiteProfilesContextData>({
    profiles: [],
});
export default SiteProfilesContext;

export const SiteProfileContextProvider: React.FC = ({ children }) => {
    const [profiles, setProfiles] = useState<Profile[]>([]);

    /**
     * Fetch Profile given user address
     */
    // eslint-disable-next-line consistent-return
    const fetchProfiles = useCallback(async (): Promise<void> => {
        try {
            const res = await fetch(`${API_URL}/profiles`, {
                method: "GET",
            });
            const data = await res.json();
            if (data.error) {
                return null;
            }
            setProfiles(data);
        } catch (err) {
            console.log("Exception in fetchProfile", err);
        }
    }, []);

    useEffect(() => {
        fetchProfiles();
    }, [fetchProfiles]);

    return (
        <SiteProfilesContext.Provider
            value={{
                profiles,
            }}
        >
            {children}
        </SiteProfilesContext.Provider>
    );
};

export const useProfiles = (): Profile[] => {
    const { profiles } = useContext(SiteProfilesContext);

    return profiles;
};
