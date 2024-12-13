export default function ({ redirect }) {
  if (process.server) return;

  const token = localStorage.getItem("authToken");

  if (!token) {
    redirect("/");
  }
}
