import { ToastContainer, toast } from "react-toastify";

export const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";
export const errMsg = (text) => toast.error(text, { theme: "colored" });
export const successMsg = (text) => toast.success(text, { theme: "colored" });
