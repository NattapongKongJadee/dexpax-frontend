export default function ({ $axios }) {
  // Add Authorization header if token exists
  const token = localStorage.getItem("authToken");
  if (token) {
    $axios.setToken(token, "Bearer");
  }

  $axios.onRequest((config) => {
    console.log("Making request to:", config.url);
    return config;
  });
}
