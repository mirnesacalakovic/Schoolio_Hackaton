import { toast } from "@/hooks/use-toast";
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from "@/model/AuthInterfaces";
import { router } from "@/router/Routes";
import { useCommonStore } from "@/stores/commonStore";
import { useUserStore } from "@/stores/userStore";
import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = useCommonStore.getState().token;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status, headers } = error.response as AxiosResponse;

    if (status) {
      switch (status) {
        case 400:
          toast({
            title: "Error 400",
            description:
              typeof data === "string" ? data : "Bad request occurred.",
          });
          break;
        case 401:
          if (
            status === 401 &&
            headers["www-authenticate"]?.startsWith(
              'Bearer error="invalid_token"'
            )
          ) {
            useUserStore.getState().logout();
            toast({
              title: "Session expired",
              description: "Please login again.",
            });
            break;
          }
          toast({
            title: "Error 401",
            description: "Unauthorized.",
          });
          break;
        case 403:
          toast({
            title: "Error 403",
            description: "Forbidden.",
          });
          break;
        case 404:
          toast({
            title: "Error 404",
            description: "Not found.",
          });
          break;
        case 500:
          useCommonStore.setState({ error: data });
          router.navigate("/server-error");
          break;
        default:
          toast({
            title: `Error ${status}`,
            description: "An unexpected error occurred.",
          });
          break;
      }
    }

    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const AccountRequests = {
  // current: () => requests.get<AuthUserDto>("/"),
  login: (user: LoginRequestDto) =>
    requests.post<LoginResponseDto>("/Auth/login", user),
  register: (user: RegisterRequestDto) =>
    requests.post<RegisterResponseDto>("/Auth/register", user),
};

const agent = {
  AccountRequests,
};

export default agent;
