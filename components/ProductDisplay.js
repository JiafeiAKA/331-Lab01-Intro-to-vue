const productDisplay = {
    template:/*html*/
	`<div class="product-display">
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
    <ul>
        <li v-for="detail in details">{{detail}}</li>
    </ul>
    <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{backgroundColor: variant.color}">{{variant.color}}</div>
    <p><span v-for="size in sizes">{{size}} ,</span></p>
    <!-- shorten version -->
    <button class="button" :disabled='!inStock' @click="add_to_cart" :class="{disabledButton: !inStock}">Add to cart</button>
    <!-- New button to inStock status -->
    <button class="button" @click="toggle_in_stock">Stock Status</button>
</div>`,
    setup() {
        // Attributes
        const product = ref("Boots");
        const brand = ref("SE 331");
        const description = ref("Wears on both feet, keeps you warm");
        const inventory = ref(100);
        const link = ref("https://www.camt.cmu.ac.th/");
        const sale = ref(false);
        const onSale = ref(true);
        const details = ref(["50% cotton", "30% wool", "20% polyester"]);
        const variants = ref([
            { id: 2234, color: "green", image: "./assets/images/socks_green.jpg", quantity: 50, sale: true},
            { id: 2235, color: "blue", image: "./assets/images/socks_blue.jpg", quantity: 0, sale: false},
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
            cart.value++;
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

        // Return
        return { 
            title, 
            description, 
            image, 
            link, 
            inStock, 
            inventory, 
            sale, 
            details, 
            variants, 
            sizes, 
            add_to_cart, 
            update_image, 
            toggle_in_stock, 
            updateVariant, 
            onSale 
        };
    },
}