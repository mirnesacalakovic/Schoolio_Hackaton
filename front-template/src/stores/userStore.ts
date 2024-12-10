import { create } from "zustand";
import { router } from "../router/Routes";
import { User } from "@/model/UserInterfaces";
import { LoginRequestDto, RegisterRequestDto } from "@/model/AuthInterfaces";
import agent from "@/api/agent";
import { useCommonStore } from "@/stores/commonStore";

interface UserState {
  user: User | null;
  loading: boolean;

  isLoggedIn: boolean;
  isAdmin: boolean;
  isParent: boolean;
  isTeacher: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getUser: () => Promise<void>;
  register: (data: RegisterRequestDto) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,

  get isLoggedIn() {
    return !!get().user;
  },

  get isAdmin() {
    const currentUser = get().user;
    return currentUser ? currentUser.role === "ADMIN" : false;
  },
  get isParent() {
    const currentUser = get().user;
    return currentUser ? currentUser.role === "PARENT" : false;
  },
  get isTeacher() {
    const currentUser = get().user;
    return currentUser ? currentUser.role === "TEACHER" : false;
  },
  get isStudent() {
    const currentUser = get().user;
    return currentUser ? currentUser.role === "STUDENT" : false;
  },

  // login: async (email: string, password: string) => {
  //   const loginRequest: LoginRequestDto = { email, password };
  //   const response = await agent.AccountRequests.login(loginRequest);
  //   const commonStore = useCommonStore.getState();

  //   const user: User = {
  //     id: response.id,
  //     fullName: response.fullName,
  //     email: response.email,
  //     role: response.role,
  //     teacherRole: response.teacherRole 
  //   };
    

  //   commonStore.setToken(response.token);
  //   set({ user });
  //   await get().getUser();
  //   console.log(user);
  //   if(user.role === "ADMIN")
  //     router.navigate("/admin-dashboard")
  //   if(user.role === "TEACHER")
  //     router.navigate("/teacher-dashboard")
  //   if(user.role === "PARENT")
  //     router.navigate("/parent-dashboard")
  //   if(user.role === "STUDENT")
  //     router.navigate("/student-dashboard")
  //   router.navigate("/");
  // },

  login: async (email: string, password: string) => {
    const loginRequest: LoginRequestDto = { email, password };
    const response = await agent.AccountRequests.login(loginRequest);
    const commonStore = useCommonStore.getState();
  
    commonStore.setToken(response.token);
  
    const user: User = {
      id: response.id,
      fullName: response.fullName,
      email: response.email,
      role: response.role,
      teacherRole: response.teacherRole,
    };
  
    set({ user });
  
    // Sačuvaj korisnika u lokalnu memoriju
    localStorage.setItem("user", JSON.stringify(user));
  
    if (user.role === "ADMIN") {
      router.navigate("/admin-dashboard");
    } else if (user.role === "TEACHER") {
      router.navigate("/teacher-dashboard");
    } else if (user.role === "PARENT") {
      router.navigate("/parent-dashboard");
    } else if (user.role === "STUDENT") {
      router.navigate("/student-dashboard");
    } else {
      router.navigate("/");
    }
  },
  
  

  register: async (data: RegisterRequestDto) => {
    try {
      const response = await agent.AccountRequests.register(data);
      const commonStore = useCommonStore.getState();
      commonStore.setToken(response.token);

      const user: User = {
        id: response.id,
        fullName: response.fullName,
        email: response.email,
        address: response.address,
        phoneNumber: response.phoneNumber,
        role: response.role,
        teacherRole: response.teacherRole
      };

      set({ user });
      await get().getUser();
      router.navigate("/login");
    } catch (error) {
      console.log(error);
    }
  },

  // logout: () => {
  //   const commonStore = useCommonStore.getState();
  //   commonStore.setToken(null);
  //   set({ user: null });
  //   router.navigate("/");
  // },
  logout: () => {
    const commonStore = useCommonStore.getState();
    commonStore.setToken(null);
    set({ user: null });
  
    // Obrisi podatke iz lokalne memorije
    localStorage.removeItem("user");
  
    router.navigate("/");
  },


  getUser: async () => {
    const commonStore = useCommonStore.getState();
    const token = commonStore.token;
  
    if (!token) {
      console.warn("No token found, user not authenticated.");
      set({ user: null });
      return;
    }
  
    // Povuci korisničke podatke iz lokalne memorije
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
      console.log("User restored from localStorage:", JSON.parse(storedUser));
    } else {
      console.warn("No user found in localStorage.");
      set({ user: null });
    }
  },
  
}));
