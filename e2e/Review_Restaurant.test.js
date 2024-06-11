/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Review Restaurants');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('review one restaurant', async ({ I }) => {
  I.waitForElement('.restaurant-item', 10);
  I.click(locate('.restaurant__name a').first());

  I.scrollTo('.formReviewsRestaurant');
  I.seeElement('.formReviewsRestaurant form');

  const name = 'Dicoding';
  const reviewText = 'Restaurant ini sangat bagus dan nyaman!';
  I.executeScript(() => {
    document.getElementById('name').shadowRoot.querySelector('input').value = 'Dicoding';
  });
  I.executeScript(() => {
    document.getElementById('review').shadowRoot.querySelector('textarea').value = 'Restaurant ini sangat bagus dan nyaman!';
  });
  I.click('custom-button[id="submit"]');

  const submitName = await I
    .grabTextFrom(locate('.reviewsRestaurant strong').last());
  const submitReview = await I
    .grabTextFrom(locate('.reviewsRestaurant p').last());

  assert.strictEqual(name, submitName);
  assert.strictEqual(reviewText, submitReview);
});
