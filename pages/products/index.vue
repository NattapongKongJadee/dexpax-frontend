<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-end mb-4">
      <button @click="logout" class="btn btn-danger">Logout</button>
    </div>
    <h3>PRODUCT LIST</h3>
    <div class="row space-y-6">
      <div
        v-for="product in products"
        :key="`${product.id}-${product.sku}`"
        class="col-md-4 mb-4"
      >
        <div class="card">
          <img :src="product.image" class="card-img-top" alt="Product Image" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">Price: {{ formatPrice(product.price) }}</p>
            <router-link
              :to="`/products/${product.id}`"
              class="btn btn-primary"
            >
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  async asyncData({ $axios }) {
    if (process.server) {
      return {};
    }
    const token = localStorage.getItem("authToken");

    if (!token) {
      redirect("/");
      return;
    }
    $axios.setToken(token, "Bearer");
    const products = await $axios.$get("/products");
    console.log("Fetched Products:", products);
    return { products };
  },
  head() {
    return {
      title: "Our Product - Dezpax",
      meta: [
        {
          hid: `description', name: 'description', content: List all Product`,
        },
        { name: "author", content: "Dezpax" },
      ],
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("authToken");
      this.$router.push("/");
    },
    formatPrice(value) {
      if (!value) return "";
      return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(value);
    },
  },
  data() {
    return {
      products: [],
    };
  },
};
</script>
