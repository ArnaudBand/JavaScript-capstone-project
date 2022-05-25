/* eslint-disable */
const urlLikes = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8liDuGNU0A25U3payI8M/likes/'
const urlcomt = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8liDuGNU0A25U3payI8M/comments/';
const urlres = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8liDuGNU0A25U3payI8M/reservations/';


const addLike = async (itemId) => {
    let result;
    const res = await fetch(urlLikes, {
        method: 'POST',
        body: JSON.stringify({
            item_id: itemId
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    result = await res.text();
    return result;
};

const getLikes = async () => {
    const res = await fetch(urlLikes);
    if(res.headers.get('content-length') > 0) {
        return res.json()
    }
    return [];
}
  
export { addLike, getLikes}