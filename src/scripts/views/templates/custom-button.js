import TheRestaurantDbSource from '../../data/therestaurantidb-source';

class CustomButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const button = document.createElement('button');
    button.textContent = this.textContent || 'Submit';
    button.addEventListener('click', async () => {
      const nameInput = document.querySelector('custom-input');
      const name = nameInput.shadowRoot.querySelector('input').value.trim();

      const reviewInput = document.querySelector('custom-textarea');
      const review = reviewInput.shadowRoot.querySelector('textarea').value.trim();

      const url = window.location.hash.slice(1);
      const restaurantId = url.split('/')[2];

      const reviewObject = {
        id: restaurantId,
        name,
        review,
      };

      try {
        const response = await TheRestaurantDbSource.addReviewRestaurant(reviewObject);
        if (!response.error) {
          console.log('Review berhasil ditambahkan:', response.customerReviews);
          const latestReview = response.customerReviews[response.customerReviews.length - 1];
          this.showNewReview(latestReview);

          nameInput.shadowRoot.querySelector('input').value = '';
          reviewInput.shadowRoot.querySelector('textarea').value = '';
        } else {
          console.error('Gagal menambahkan review:', response.message);
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    });

    shadow.appendChild(button);

    const style = document.createElement('style');
    style.textContent = `
            button {
                background-color: transparent;
                border: 1px solid white;
                border-radius: 5px;
                box-sizing: border-box;
                color: white;
                cursor: pointer;
                display: block;
                font-size: 18px;
                font-weight: bold;
                margin-top: 20px;
                padding: 15px;
                width: 100%;
            }
            button:disabled {
                cursor: not-allowed;
            }
            button:hover {
                background-color: #d7ae30;
            }
        `;
    shadow.appendChild(style);
  }

  // eslint-disable-next-line class-methods-use-this
  showNewReview(review) {
    const reviewList = document.querySelector('.reviewsRestaurant ul');
    const newReviewItem = document.createElement('li');
    newReviewItem.innerHTML = `
      <strong><i class="fa-solid fa-user-large" style="font-size: 20px; margin-right: 10px"></i>${review.name}</strong>
      <small>${review.date}</small>
      <p>${review.review}</p>
    `;
    reviewList.appendChild(newReviewItem);
  }
}
customElements.define('custom-button', CustomButton);
