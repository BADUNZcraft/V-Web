import React, { useState, useEffect, useContext } from 'react';

const IGDBContext = React.createContext();

export function useIGDB() {
    return useContext(IGDBContext);
}

export function IGDBProvider({ children }) {
    const [token, setToken] = useState(null);
    

    async function getToken() {
        const raw = "";

        const requestOptions = {
            method: "POST",
            body: raw,
            redirect: "follow"
        };

        try {
            const request = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_IGDB_CLIENT_ID}&client_secret=${process.env.REACT_APP_IGDB_Client_SECRET}&grant_type=client_credentials`, requestOptions);
            const json = await request.json();
            return json;
        }
        catch (err) {
            console.error(err);
        }
    }
    async function initializeToken(){
        if(!token){
            if((JSON.parse(localStorage.getItem('IGDBToken')) || {status: 400}).status!== 400) {
                setToken(JSON.parse(localStorage.getItem('IGDBToken')))
            }
            else {
                var newToken = await getToken()
                setToken(newToken)
                localStorage.setItem('IGDBToken', JSON.stringify(newToken))
            }
        }
    }

    async function testFetch(ApiNode, Query) {

        const UserId = process.env.REACT_APP_IGDB_CLIENT_ID;
        const Token = token.access_token;
        try {
          const response = await fetch('http://localhost:8080/test', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ UserId, Token, ApiNode, Query })
          });
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
          return undefined;
        }
      }

    async function getData(RequestedApiNode, RequestedQuery) {
        const returnData = await testFetch(RequestedApiNode, RequestedQuery)
        return returnData
    }

    const value = {
        getData,
        initializeToken,
        token
    };

    return (
        <IGDBContext.Provider value={value}>
            {children}
        </IGDBContext.Provider>
    );
}