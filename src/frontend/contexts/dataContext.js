import React, { createContext , useContext , useState } from 'react';
import { getAllVideos } from '../services/videoService';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    let [ videos , setVideos] = useState([]);

    const fetchVideos = async () => {
        let response;
        try {
            response = await getAllVideos();
            let pureVideos = response.actionResponse.data.videos;
            let initialVideos = pureVideos.map(product => {
            return { ...product, inLikes: false , inWatchlater: false }; 
                })
            setVideos(initialVideos);
        } catch(error) {
            response = error;
            console.log(response);
        }
    }

    fetchVideos();
 
    return (
        <DataContext.Provider value={{ videos }}>
          { children }
        </DataContext.Provider>
    );
}

const useData = () => useContext(DataContext);

export { useData , DataProvider };
