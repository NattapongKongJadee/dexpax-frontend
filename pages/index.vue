<template>
  <div class="container mt-5">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post("/api/auth/login", {
          email: this.email,
          password: this.password,
        });

        this.$store.commit("setAuthToken", response.data.token);
        localStorage.setItem("authToken", response.data.token);
        this.$router.push("/products");
      } catch (error) {
        console.error("Login failed:", error.response);
        alert("Login failed. Please check your credentials.");
      }
    },
    head() {
      return {
        title: `Log-In`,
        meta: [
          {
            hid: `description', name: 'description', content: Log-in page`,
          },
          { name: "author", content: "Dezpax" },
        ],
      };
    },
  },
};
</script>
