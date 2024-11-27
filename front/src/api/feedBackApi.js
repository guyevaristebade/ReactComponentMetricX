import { instance } from '../helpers';

// export const getAllFeedBack = async ()=>{
//     try {
//         const query = await instance.get("/feedback")
//         console.log(query.data)
//         return query.data
//     }catch (e) {
//         console.error(`getAllFeedBack : ${e.message}`)
//         return e.message
//     }
// }

export const postLike = async feedbackId => {
  try {
    await instance.post('/feedback/like');
  } catch (e) {
    console.error(`getAllFeedBack : ${e.message}`);
    return e.message;
  }
};
