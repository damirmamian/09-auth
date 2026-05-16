import css from "./ProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
    title: "Profile",
    description: "My profile Notehub",
    openGraph: {
        title: "NoteHub",
        description: " NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go.",
        url: "https://09-auth-three-liard.vercel.app/",
        siteName: "NoteHub",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub Open Graph Image",
            }
        ],
    }
};

const Profile = async () => {
    const user = await getMe();

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>
                <div className={css.avatarWrapper}>
                    <Image
                        src={user.avatar}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>
                <div className={css.profileInfo}>
                    <p>
                        Username: {user.username }
                    </p>
                    <p>
                        Email: {user.email}
                    </p>
                </div>
            </div>
        </main>

    );
};

export default Profile;