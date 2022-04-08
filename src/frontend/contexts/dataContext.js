import React, { createContext , useContext , useState } from 'react';
import { getAllVideos, videoInArrayChecker } from '../services/videoService';
import { useUser } from './userContext';


const DataContext = createContext();

const DataProvider = ({ children }) => {
    let [ videos , setVideos] = useState([]);
    const [ selectedVideo , setSelectedVideo ] = useState('none');

    const { userState } = useUser();

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

    if(userState.foundUser) {
        videos = videoInArrayChecker([...userState.foundUser.likes], [...videos] , 'like' );
        videos = videoInArrayChecker([...userState.foundUser.watchlater], [...videos] , 'watchlater' );
    }
 
    return (
        <DataContext.Provider value={{ videos  , setSelectedVideo , selectedVideo }}>
          { children }
        </DataContext.Provider>
    );
}

const useData = () => useContext(DataContext);

export { useData , DataProvider };
