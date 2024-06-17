import React, { useContext } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';



const FirestoreContext = React.createContext();

export function useFirestore() {
    return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {
    async function addLike(currentUser, gameId) {
        try {
            const docRef = await addDoc(collection(db, "likes"), {
              gameId: gameId,
              userId: currentUser.uid
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const value = {
        addLike
    };

    return (
        <FirestoreContext.Provider value={value}>
            {children}
        </FirestoreContext.Provider>
    );
}