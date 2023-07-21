// import { useState, useEffect, useContext, ReactNode, createContext } from 'react';
// import Cookies from 'js-cookie';

// const AuthContext = createContext<{
//     authUser: string | null;
//     updateAuthUser: (user: string | null) => void
// } | null>(null);

// export function useAuth() {
//     const auth = useContext(AuthContext);
//     if (!auth) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return auth;
// }

// export function AuthProvider({ children }: { children: ReactNode }) {

//     const [authUser, setAuthUser] = useState<string | null>("");

//     useEffect(() => {
//         const storedAuthUser = Cookies.get('authUser');
//         storedAuthUser && setAuthUser(storedAuthUser);
//         // setAuthUser(storedAuthUser!)

//     }, []);

//     const updateAuthUser = (user: string | null) => {
//         setAuthUser(user);
//         if (user) {
//             Cookies.set('authUser', user);
//         } else {
//             Cookies.remove('authUser');
//         }
//     };

//     const value = {
//         authUser,
//         updateAuthUser
//     };

//     return (
//         <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//     );
// }
