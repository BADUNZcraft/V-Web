import React, { useContext } from 'react';
import { db } from '../firebase';
import { collection, addDoc,  getDocs, deleteDoc, query, where } from 'firebase/firestore';



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
    async function removeLike(currentUser, gameId) {
        try {
            const likesRef = collection(db, "likes");
            const queryRef = query(likesRef, 
                where('userId', '==', currentUser.uid), 
                where('gameId', '==', `${gameId}`)
              );
            const querySnapshot = await getDocs(queryRef);
            
            console.log(`UID: ${currentUser.uid}`);
            console.log(`GameID: ${gameId}`);
            console.log(querySnapshot);
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
        } catch (error) {
          console.error(error);
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
            console.error(error.message);
            return 'Error fetching likes';
        }
    }

    const value = {
        addLike,
        removeLike,
        getLikedGames
    };

    return (
        <FirestoreContext.Provider value={value}>
            {children}
        </FirestoreContext.Provider>
    );
}