<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-end">
      <router-link to="/products" class="btn btn-secondary mb-4">
        Back
      </router-link>
    </div>
    <h3 class="mb-4">{{ `${this.product.name}` }}</h3>
    <img :src="product.image" class="img-fluid mb-5" alt="Product Image" />
    <p>SKU: {{ product.sku }}</p>
    <p>Name: {{ product.name }}</p>
    <p class="card-text">Price: {{ formatPrice(product.price) }}</p>
    <p>Size: {{ product.size }}</p>
    <p>Weight: {{ product.weight }}</p>
    <p>Description :{{ product.description }}</p>
  </div>
</template>

<script>
export default {
  middleware: "auth",

  async asyncData({ params, $axios }) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      redirect("/");
      return;
    }
    $axios.setToken(token, "Bearer");

    try {
      const product = await $axios.$get(`/products/${params.id}`);
      return { product };
    } catch (error) {
      console.error("Error fetching product:", error);
      redirect("/error");
    }
  },
  head() {
    return {
      title: `Product- ${this.product.name}`,
      meta: [
        {
          hid: `description', name: 'description', content: Buy ${this.product.name}`,
        },
        { name: "author", content: "Dezpax" },
      ],
    };
  },
  methods: {
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
      product: {},
    };
  },
};
</script>
