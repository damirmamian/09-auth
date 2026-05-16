"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
}
const PublicLayout = ({ children }: Props) => {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [router])
    
    return children;
};

export default PublicLayout;