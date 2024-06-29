const { createApp, ref, computed } = Vue;

const app = createApp({
  setup() {
    const product = ref('Boots');
    const brand = ref('SE 331');
    const description = ref('pussy socks');
    const link = ref('https://www.camt.cmu.ac.th/index.php/th/');
    const inventory = ref(100);
    const details = ref([
      '50% cotton',
      '30% wool',
      '20% polyester'
    ]);
    const variants = ref([
      { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
      { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
    ]);
    const selectedVariant = ref(0);
    const sizes = ref(['S', 'M', 'L']);
    const cart = ref(0);

    const image = computed(() => {
      return variants.value[selectedVariant.value].image;
    });
    
    const inStock = computed(() => {
      return variants.value[selectedVariant.value].quantity > 0;
    });
    
    const title = computed(() => {
      return `${brand.value} ${product.value}`;
    });

    function updateVariant(index) {
      selectedVariant.value = index;
    }
    
    function addToCart() {
      cart.value += 1;
    }

    function toggleStockStatus() {
      if (inStock.value) {
        variants.value[selectedVariant.value].quantity = 0;
      } else {
        variants.value[selectedVariant.value].quantity = 50; // or some other logic to reset stock
      }
    }

    return {
      product,
      brand,
      title,
      description,
      image,
      link,
      inStock,
      inventory,
      details,
      variants,
      sizes,
      cart,
      addToCart,
      updateVariant,
      toggleStockStatus
    };
  }
});

app.mount('#app');
