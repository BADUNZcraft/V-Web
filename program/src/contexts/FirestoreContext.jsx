import React, { useContext } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';



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

    async function getLikedGames(userId) {
        try {
            const q = query(collection(db, 'likes'), where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            const newData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            return newData;
        } catch (error) {
            console.log(error.message);
            return 'Error fetching likes';
        }
    }

    const value = {
        addLike,
        getLikedGames
    };

    return (
        <FirestoreContext.Provider value={value}>
            {children}
        </FirestoreContext.Provider>
    );
}