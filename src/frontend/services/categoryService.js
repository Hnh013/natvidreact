import axios from 'axios';

export const getCategories = async () => {
    let actionSuccess = false;
    let actionResponse;
    try {
      actionResponse = await axios.get('/api/categories');
      actionSuccess = true;
    } catch (error) {
      actionResponse = error;
      actionSuccess = false;
    }
    return {actionResponse , actionSuccess};
}
