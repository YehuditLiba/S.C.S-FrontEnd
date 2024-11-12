import React, { createContext, useState, useContext, useEffect } from 'react';

// יצירת קונטקסט למידע המשתמש
const UserContext = createContext();

// קומפוננטה לעטוף את כל האפליקציה
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // קריאת מידע מה-sessionStorage כאשר האפליקציה עולה
    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (storedUser) {
            setCurrentUser(storedUser);
        }
    }, []);

    const logIn = (user) => {
        setCurrentUser(user);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    };

    const logOut = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('currentUser');
    };

    return (
        <UserContext.Provider value={{ currentUser, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook להשליפה
export const useUser = () => useContext(UserContext);
