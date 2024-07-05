const productDisplay = {
    template: /*html*/`
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <!-- image goes here -->
                <img :src="image" :class="{ outOfStockImage: !inStock }" alt="" />
            </div>
        </div>
    </div>
    <div class="product-info">
        <h1><a :href="link" target="_blank">{{title}}</a></h1>
        <p>description : {{description}}</p>
        <p v-if="!inStock">Out of Stock</p>
        <p v-else-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory > 0">Almost out of stock</p>
        <p v-else>Out of Stock</p>
        <p v-if="sale">ON SALE@!</p>
        <p v-else>not on sale</p>
        <p>shipping: {{shipping}}</p>
        <product-details :details="details"></product-details>
        <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{backgroundColor: variant.color}">{{variant.color}}</div>
        <p><span v-for="size in sizes">{{size}} ,</span></p>
        <button class="button" :disabled='!inStock' @click="add_to_cart" :class="{disabledButton: !inStock}">Add to cart</button>
        <button class="button" @click="remove_from_cart">Remove Cart</button>
        <button class="button" @click="toggle_in_stock">Stock Status</button>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>`,
    props: {
        premium: Boolean,
        details: Array
    },
    setup(props, { emit }) {
        const shipping = computed(() => {
            if (props.premium) {
                return 'Free';
            } else {
                return 30;
            }
        });
        const product = ref("Boots");
        const brand = ref("SE 331");
        const description = ref("Wears on both feet, keeps you warm");
        const inventory = ref(100);
        const link = ref("https://www.camt.cmu.ac.th/");
        const sale = ref(false);
        const onSale = ref(true);
        const reviews = ref([]);
        const variants = ref([
            { id: 2234, color: "green", image: "./assets/images/socks_green.jpg", quantity: 50, sale: true },
            { id: 2235, color: "blue", image: "./assets/images/socks_blue.jpg", quantity: 0, sale: false },
        ]);
        const selectedVariant = ref(0);
        const sizes = ref(["S", "M", "L"]);
        const image = computed(() => {
            return variants.value[selectedVariant.value].image;
        });

        const inStock = computed(() => {
            return variants.value[selectedVariant.value].quantity > 0;
        });

        const title = computed(() => {
            const variant = variants.value[selectedVariant.value];
            return brand.value + ' ' + product.value + (variant.sale ? ' is on sale' : ' is not on sale');
        });

        function add_to_cart() {
            emit('add-to-cart', variants.value[selectedVariant.value].id);
        }

        function remove_from_cart() {
            emit('remove-from-cart', variants.value[selectedVariant.value].id);
        }

        function update_image(variant_image) {
            image.value = variant_image;
        }

        function toggle_in_stock() {
            inStock.value = !inStock.value;
        }

        function updateVariant(index) {
            selectedVariant.value = index;
        }

        function addReview(review) {
            reviews.value.push(review);
            console.log(review);
        }

        return {
            title,
            description,
            image,
            link,
            inStock,
            inventory,
            sale,
            variants,
            sizes,
            add_to_cart,
            remove_from_cart,
            update_image,
            toggle_in_stock,
            updateVariant,
            addReview,
            onSale,
            shipping,
            reviews
        };
    },
}
