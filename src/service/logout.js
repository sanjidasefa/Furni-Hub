
export const loginme = (meData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("furni_me", JSON.stringify(meData));
    const maxAge = 60 * 60 * 24; 
    document.cookie = `token=true; path=/; max-age=${maxAge}; SameSite=Lax`; 
  }
};

export const logoutme = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("furni_me");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
  }
};

export const getStoredme = () => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("furni_me");
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing stored data", error);
    return null;
  }
};