"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";


export const UserProvider = ({ children }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [savedFormDataValues, setSavedFormDataValues] = useState([]);


    return (
        <>
            <UserContext.Provider value={{ formData, setFormData, savedFormDataValues, setSavedFormDataValues }}>{children}</UserContext.Provider>
        </>
    )
}
