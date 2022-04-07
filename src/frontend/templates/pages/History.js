import React from 'react';
import { useUser } from '../../contexts/userContext';
import { clearHistory } from '../../services/historyService';
import { toastError, toastSuccess } from '../../services/toastService';
import { Video } from '../components';

export const History = () => {

  const { userState , userDispatcher } = useUser();

  const CH = async (myToken) => {
    const response = await clearHistory(myToken);
    if(response.actionSuccess) {
        toastSuccess('Watch history cleared')
        userDispatcher({ 
           type: 'CLEARHISTORY' , 
           payload : { ...userState.foundUser , history : [] }   
    }); 
  } else {
      toastError('Oops ! something went wrong')
  }
}


    return (
    <main className='main'>
        { userState.foundUser ? (<>
        <div className='d-flex jc-c ai-c px-xs py-xs'>
              <button className='btn btn-bee' onClick={() => CH(userState.encodedToken)} >Clear History</button>
        </div>
        <div className='videos-wrapper px-xs py-sm d-flex fw-wrap ai-c jc-c gap-1 mx-auto'>
            { [...userState.foundUser.history].map( (video,index) => <Video fromHistory={true} key={index} videoDetails={video} /> ) }
        </div>
        </>) : (<p className='f-2x f-w-500'> No History</p>)}
    </main>
    );
};
