import React from 'react';
import { useUser } from '../../contexts/userContext';
import { toastError, toastSuccess, clearHistory } from '../../services';
import { Video } from '../components';

export const History = () => {

    const { userState , userDispatcher } = useUser();

    const clearUserHistory = async (myToken) => {
        const response = await clearHistory(myToken);
        if (response.actionSuccess) {
            toastSuccess('Watch history cleared')
            userDispatcher({
                type: 'CLEAR_HISTORY',
                payload: { ...userState.foundUser, history: [] }
            });
        } else {
            toastError('Oops ! something went wrong')
        }
    }

    return (
        <main className='main'>
            {userState.foundUser && userState.foundUser.history.length > 0 ? (<>
                <div className='d-flex jc-c ai-c px-xs py-xs'>
                    <button className='btn btn-bee bdr-rad-f' onClick={() => clearUserHistory(userState.encodedToken)} >Clear History</button>
                </div>
                <div className='videos-wrapper px-xs py-sm d-flex fw-wrap ai-c jc-c gap-1 mx-auto'>
                    {[...userState.foundUser.history].map(video => <Video fromHistory={true} fromPlaylists={'none'} key={video._id} videoDetails={video} />)}
                </div>
            </>) : (<p className='f-2x f-w-500 px-sm py-sm ta-c'> No History</p>)}
        </main>
    );
};
