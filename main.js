const { createApp, ref, computed } = Vue;

const app = createApp({
    setup () {
      const cart = ref([])
      const premium = ref(true)
      const details = ref(["50% cotton", "30% wool", "20% polyester"]);
      function updateCart(_id) {
        for (var i = 0; i < cart.value.length; i++) {
            if(cart.value[i].id === _id){
                cart.value[i].amount++;
                return;
            }
        }
        cart.value.push({id:_id, amount: 1})
        return;
      }
        return {
            cart,
            premium,
            details,
            updateCart
        }
    }
})
app.component('product-display', productDisplay)
app.mount('#app')