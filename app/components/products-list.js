import Component from '@ember/component';
import { computed, set } from '@ember/object';

export default Component.extend({

  addedProducts: null,

  find(id) {
    return this.get('products').find( product => product.productId === id );
  },

  subTotal: 0,

  taxTotal: computed('subTotal', function() {
    return +(0.05 * this.get('subTotal')).toFixed(2);
  }),

  total: computed('subTotal', 'taxTotal', function() {
    return this.get('subTotal') + this.get('taxTotal');
  }),

  totalPage: computed('products', function() {
    return Math.floor(this.get('products').length / 6 ) + 1;
  }),

  pageNumbers: computed('totalPage', function() {
    let numbers = [];

    for (let i = 1; i <= this.get('totalPage'); i++) {
      numbers.push(i);
    }

    return numbers;
  }),

  start: 0,

  max: 6,

  currentPage: 1,

  nextPage: computed('currentPage', function() {
    return this.get('currentPage') + 1;
  }),

  prevPage: computed('currentPage', function() {
    return this.get('currentPage') - 1;
  }),

  actions: {
    add(id) {
      let data = this.get('products').objectAt(id);
      let count = data.count + 1;
      set(data, "count", count);

      let subTotalPrice = this.get('subTotal') + data.productPrice;
      this.set('subTotal', subTotalPrice);
    },

    remove(id) {
      let data = this.get('products').objectAt(id);
      let count = (data.count > 1) ? data.count - 1 : 0;
      set(data, "count", count);

      let subTotalPrice = this.get('subTotal') - data.productPrice;
      this.set('subTotal', subTotalPrice);
    },

    filterProducts(number) {
      event.preventDefault();
      let start = (number-1)*6;
      let max = number*6;

      this.set('start', start);
      this.set('max', max);
      this.set('currentPage', number);
    }
  }
});
