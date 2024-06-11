import CONFIG from '../../globals/config';
import './custom-element';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantItemTemplate = (restaurant) => `
    <div class="restaurant-item">
        <img tabindex="0" class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}" alt="${restaurant.name || '-'}" crossorigin="anonymous"/>
        <div class="cityRestaurantContent">
            <h4>${restaurant.city || '-'}</h4>
        </div>
        <h3 tabindex="0">Rating: ${restaurant.rating || '-'}</h3>
        <h2 class="restaurant__name" tabindex="0"><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h2>
        <p tabindex="0">${restaurant.description || '-'}</p>
    </div>
`;

const createSkeletonRestaurantTemplate = (count) => {
  let template = '';

  for (let i = 0; i < count; i += 1) {
    template += `
        <div class="restaurant-item">
            <img class="lazyload skeleton" src="./images/placeholder.png" alt="skeleton"/>
            <div class="cityRestaurantContent skeleton">
                <h4 class="skeleton">Lorem ipsum dolor sit.</h4>
            </div>
            <h3 class="skeleton">Rating: Lorem ipsum dolor sit.</h3>
            <h2 class="restaurant__name skeleton">Lorem ipsum dolor sit.</h2>
            <p class="skeleton">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci alias aspernatur, assumenda aut consectetur consequuntur debitis deleniti dicta dolorem dolorum eos exercitationem labore laboriosam magni nihil, nobis obcaecati optio perspiciatis placeat qui recusandae saepe sapiente sequi totam ullam ut.</p>
        </div>
      `;
  }
  return template;
};

const createRestaurantDetailTemplate = (data) => `
    <h1 tabindex="0">Detail Restaurant</h1>
    <div class="contentDetailRestaurant">
        <h2 class="restaurant__name" tabindex="0">${data.restaurant.name}</h2>
        <div class="restaurant-info">
            <img tabindex="0" class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL}/${data.restaurant.pictureId}" alt="${data.restaurant.name}" crossorigin="anonymous"/>
            <div class="descriptionDetailRestaurant">
                <div class="information">
                    <p tabindex="0"><strong tabindex="0">City:</strong> ${data.restaurant.city}</p>
                    <p tabindex="0"><strong tabindex="0">Address:</strong> ${data.restaurant.address}</p>
                    <p tabindex="0"><strong tabindex="0">Rating:</strong> ${data.restaurant.rating}</p>
                    <p tabindex="0"><strong tabindex="0">Description:</strong></p>
                </div>
                <p tabindex="0">${data.restaurant.description}</p>
                <div class="categories">
                    <ul>
                        ${data.restaurant.categories.map((category) => `<li tabindex="0">${category.name}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
        <div class="menuDetailRestaurant">
            <h2 tabindex="0">List Menu</h2>
            <div class="menus">
                <div class="foods">
                    <h3 tabindex="0">Foods</h3>
                    <ul>
                        ${data.restaurant.menus.foods.map((food) => `<li tabindex="0"><i class="fas fa-circle" style="font-size: 8px; margin-right: 20px"></i>${food.name}</li>`).join('')}
                    </ul>
                </div>
                <div class="drinks">
                    <h3 tabindex="0">Drinks</h3>
                    <ul>
                        ${data.restaurant.menus.drinks.map((drink) => `<li tabindex="0"><i class="fas fa-circle" style="font-size: 8px; margin-right: 20px"></i>${drink.name}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
        <div class="reviewsRestaurant">
            <h2 tabindex="0">Customer Reviews</h2>
            <ul>
                ${data.restaurant.customerReviews.map((review) => `
                    <li tabindex="0">
                        <strong tabindex="0"><i class="fa-solid fa-user-large" style="font-size: 20px; margin-right: 10px"></i>${review.name}</strong>
                        <small tabindex="0">${review.date}</small>
                        <p tabindex="0">${review.review}</p>
                    </li>
                    </br>
                `).join('')}
            </ul>

            <div class="formReviewsRestaurant">
                <form id="inputReview" class="inputReview">
                    <custom-input tabindex="0" id="name" name="name" placeholder="Input Name" required></custom-input>
                    <custom-textarea tabindex="0" id="review" name="review" placeholder="Input Review" required></custom-textarea>
                    <custom-button id="submit" tabindex="0" type="submit">Submit</custom-button>
                </form>
            </div>
        </div>
    </div>
`;

const createLikeButtonTemplate = () => `
  <button tabindex="0" aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeButtonTemplate = () => `
  <button tabindex="0" aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

document.addEventListener('DOMContentLoaded', () => {
  const allSkeleton = document.querySelectorAll('.skeleton');
  allSkeleton.forEach((item) => {
    item.classList.remove('skeleton');
  });
});

export {
  createRestaurantItemTemplate,
  createSkeletonRestaurantTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
};
