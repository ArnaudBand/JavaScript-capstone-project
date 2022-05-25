const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const appId = '8liDuGNU0A25U3payI8M';

const addComment = async (itemId, username, comment) => {
  let result;
  try {
    const res = await fetch(`${baseUrl}apps/${appId}/comments/`, {
      method: 'POST',
      body: JSON.stringify({
        item_id: itemId,
        username,
        comment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    result = await res.json();
  } catch (err) {
    return err;
  }
  return result;
};

const getComments = async () => {
  let result;
  try {
    const res = await fetch(`${baseUrl}apps/${appId}/comments/`);
    result = await res.json();
  } catch (err) {
    return err;
  }
  return result;
};

export {
  addComment, getComments,
};