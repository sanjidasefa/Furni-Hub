export const loginUser = (userData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("furni_user", JSON.stringify(userData));
    document.cookie = `token=true; path=/; max-age=${60 * 60 * 24}`; 
  }
};

export const logoutUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("furni_user");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
};

export const getStoredUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("furni_user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};