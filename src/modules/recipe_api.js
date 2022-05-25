/* eslint-disable array-callback-return */
import { showPopup } from './popup.js';
import { addLike, getLikes } from './involved.api.js';

const url1 = 'https://www.themealdb.com/api/json/v1/1/categories.php';

const displayData = async (results) => {
  const arrLike = await getLikes();
  const container = document.querySelector('.items');
  let displayUI = '';
  // eslint-disable-next-line array-callback-return
  results.forEach((result, index) => {
    const likeObj = arrLike.find((element) => element.item_id === result.idCategory);
    displayUI = `
        <div class="item">
          <div class="item_images">
              <img src="${result.strCategoryThumb}" alt="${result.strCategory}">
          </div>
          <div class="text_like">
              <p class="name-meal">${result.strCategory}</p>
              <div class="like_div">
                    <button class="like_btn" type="button">❤</button>
                    <p class="num_like">${likeObj ? likeObj.likes : 0} likes</p>
              </div>
          </div>
          <div class="btn_rev_com">
              <button type="button" class="commentBtn" id="${index}">
                  Comments
              </button>
              <button type="button" class="reservationBtn">
                  Reservations
              </button>
          </div>
        </div>`;

    container.insertAdjacentHTML('beforeend', displayUI);
    const itemElement = container.lastChild;
    const commentBtn = itemElement.querySelector('.commentBtn');
    // eslint-disable-next-line no-unused-vars
    commentBtn.addEventListener('click', (event) => {
      showPopup(results);
    });
    const likeBtn = itemElement.querySelector('.like_btn');
    likeBtn.addEventListener('click', () => {
      addLike(result.idCategory);
    });
  });
};

const fetchData = async () => {
  const res = await fetch(url1);
  const response = await res.json();
  displayData(response.categories);
  showPopup(response.categories);
};

fetchData();

// function popupDisplay(popup) {
//   const commentPopup = document.querySelector('.comment-popup');
//   let comment = '';
//   comment-popup.classList.add('hidden');
//   comment += `
//   <div class="comment-popup">
//   <div class="dish-img"> <img src="${popup[0].strCategoryThumb}"> </div>
//    <div class="popup-content">
//      <h2> ${popup[0].strCategory} </h2>
//      <p class="recepie"> ${popup[0].strCategoryDescription} </p>
//    </div>
//    </div>
//   `
// }
