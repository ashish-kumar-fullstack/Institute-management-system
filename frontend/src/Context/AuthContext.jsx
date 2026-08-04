import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  
  const [isAuthLoading , setIsAuthLoading] = useState(true)

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


const checkAuth = useCallback(async () => {
  try {
    setIsAuthLoading(true);

    const response = await fetch(`${apiBaseUrl}/auth/me`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    const result = await response.json();

    console.log("GET ME STATUS:", response.status);
    console.log("GET ME RESULT:", result);
    console.log("GET ME USER:", result?.data?.user);

    if (!response.ok) {
      setUser(null);
      return null;
    }

    const authenticatedUser = result?.data?.user;

    if (!authenticatedUser) {
      console.log("User missing from response");
      setUser(null);
      return null;
    }

    setUser(authenticatedUser);

    console.log("User before setting:", authenticatedUser);

    return authenticatedUser;
  } catch (error) {
    console.error("Authentication check failed:", error);
    setUser(null);
    return null;
  } finally {
    setIsAuthLoading(false);
  }
}, [apiBaseUrl]);
useEffect(() => {
  checkAuth();
}, [checkAuth]);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        password,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || result.error || "Login failed");
    }
    setUser(result.data.user);
    return result.data.user;
  };

  const logout = async () => {
    try {
      await fetch(`${apiBaseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
      
    }
  };

  

  return (
    <AuthContext.Provider value = {
    {user,
    isAuthenticated: Boolean(user),
    isAuthLoading,
    login,
    logout,
    checkAuth,
  }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = ()=>{
  const context = useContext(AuthContext)
  if(!context){
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}