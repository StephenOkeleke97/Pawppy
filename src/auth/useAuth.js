export default function useAuth() {
  const expString = window.localStorage.getItem("exp");
  const exp = Number(expString);
  return new Date() < new Date(exp);
}
