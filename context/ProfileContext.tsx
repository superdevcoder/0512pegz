import {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from "react";
import { API_URL } from "../utils/constants";
import { getToken } from "../utils/magic";
import { useUser } from "./UserContext";

interface Profile {
    id: string;
    username: string;
    address: string;
}

type ProfileContextData = {
    profile: Profile | null;
    setProfile: (newName: string) => void;
};

const ProfileContext = createContext<ProfileContextData>({
    profile: null,
    setProfile: (newName: string) => null,
});
export default ProfileContext;

export const ProfileContextProvider: React.FC = ({ children }) => {
    const user = useUser();
    const [profile, setProfile] = useState<Profile | null>(null);

    /**
     * Fetch Profile given user address
     */
    // eslint-disable-next-line consistent-return
    const fetchProfile = useCallback(async (): Promise<void> => {
        try {
            if (!user) {
                setProfile(null);
                return null;
            }
            const res = await fetch(`${API_URL}/profiles/${user.address}`, {
                method: "GET",
            });
            const data = await res.json();
            if (data.error) {
                return null;
            }
            setProfile(data);
        } catch (err) {
            console.log("Exception in fetchProfile", err);
        }
    }, [user]);

    /**
     * Update the profile via API and internally
     */
    const updateProfile = useCallback(
        async (newName: string): Promise<void> => {
            try {
                const token = await getToken(
                    user.provider.getSigner(),
                    "profile",
                );

                let res: any = null;
                if (profile) {
                    res = await fetch(`${API_URL}/profiles/${profile.id}`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: newName,
                            address: user.address,
                        }),
                    });
                } else {
                    res = await fetch(`${API_URL}/profiles/`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: newName,
                            address: user.address,
                        }),
                    });
                }
                const data = await res.json();
                setProfile(data);
            } catch (err) {
                console.log("Exception in updateProfile", err);
            }
        },
        [user, profile],
    );

    useEffect(() => {
        fetchProfile();
    }, [user, fetchProfile]);

    return (
        <ProfileContext.Provider
            value={{
                profile,
                setProfile: updateProfile,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const { profile } = useContext(ProfileContext);

    return profile;
};

export const useSetProfile = () => {
    const { setProfile } = useContext(ProfileContext);

    return setProfile;
};
