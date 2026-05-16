"use client";

import { updateMe } from "@/lib/api/clientApi";
import css from "./EditProfile.module.css"
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

const EditProfile = () => {
    const router = useRouter();

    const { user, setUser } = useAuthStore();
    if (!user) {
        return null
    };

    const handleCancel = () => {
        router.push("/profile");
    }

    const handleSubmit = async (formData: FormData) => {
        const newUsername = formData.get("username") as string;
        console.log(newUsername);
        const updateUser = await updateMe(newUsername);
        setUser(updateUser);
        console.log(updateUser);
        router.push("/profile");
     }

    return <main className={css.mainContent}>
        <div className={css.profileCard}>
            <h1 className={css.formTitle}>Edit Profile</h1>

            <Image src={user.avatar }
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
            />

            <form className={css.profileInfo} action={handleSubmit}>
                <div className={css.usernameWrapper}>
                    <label htmlFor="username">Username:</label>
                    <input id="username"
                        type="text"
                        name="username"
                        className={css.input}
                        defaultValue={user.username}
                    />
                </div>

                <p>Email: {user.email }</p>

                <div className={css.actions}>
                    <button type="submit" className={css.saveButton}>
                        Save
                    </button>
                    <button type="button" className={css.cancelButton} onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </main>

};

export default EditProfile;