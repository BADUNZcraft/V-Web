import React, { useContext } from 'react';

const FirestoreContext = React.createContext();

export function useFirestore() {
    return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {
    function testFunction() {
        return "Hello World!";
    }

    const value = {
        testFunction
    };

    return (
        <FirestoreContext.Provider value={value}>
            {children}
        </FirestoreContext.Provider>
    );
}