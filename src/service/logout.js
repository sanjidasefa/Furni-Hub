export const loginme = (meData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("furni_me", JSON.stringify(meData));
    document.cookie = `token=true; path=/; max-age=${60 * 60 * 24}`; 
  }
};

export const logoutme = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("furni_me");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
};

export const getStoredme = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("furni_me");
    try {
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }
  return null;
};