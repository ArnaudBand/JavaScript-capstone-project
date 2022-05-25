import { addComment, getComments } from './involvement-api.js';
import commentsCounter from './comment-counter.js';

const overlaySection = document.querySelector('.overlay');
const popupThumpnail = document.querySelector('.thumbnail');
const recipeTitle = document.querySelector('.recipe-title');
const popupDesc = document.querySelector('.popup-desc');
const commentsList = document.querySelector('.comments-list');
const commentForm = document.querySelector('.comment-form');
const nameInput = document.querySelector('.name-input');
const commentInput = document.querySelector('.comment-input');
const counterSpan = document.querySelector('.counter-span');
let id;

const loadComments = async (recipeId) => {
  commentsList.innerHTML = null;
  const comments = await getComments(recipeId);
  counterSpan.textContent = `(${commentsCounter(comments)})`;
  for (let i = 0; i < comments.length; i += 1) {
    const commentItem = document.createElement('li');
    commentItem.innerHTML = `<p class="comment-item">
    ${comments[i].creation_date} ${comments[i].username}: ${comments[i].comment}
    </p>`;
    commentsList.append(commentItem);
  }
};

const showPopup = (recipe, recipeId) => {
  id = recipeId;
  overlaySection.style.visibility = 'visible';
  recipe.forEach((ele) => {
    recipeTitle.textContent = ele.strCategory;
    popupThumpnail.style.backgroundImage = `url(${ele.strCategoryThumb})`;
    popupDesc.innerHTML = ele.strCategoryDescription;
  });
  loadComments(recipeId);
};

const hidePopup = () => {
  overlaySection.style.visibility = 'hidden';
};

commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await addComment(id, nameInput.value.trim(), commentInput.value.trim());
  nameInput.value = '';
  commentInput.value = '';
  loadComments(id);
});

export { showPopup, hidePopup };