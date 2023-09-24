import { redirect } from "react-router-dom";
import { removeItem } from "../helper/helper";
// toast from tostify
import { toast } from "react-toastify";

export const logoutFunction = () => {
  // delete user
  removeItem({
    key: "userName",
  });
  removeItem({
    key: "budget",
  });
  removeItem({
    key: "expense",
  });
  toast.success("You have logged out successfully!");

  // redirect to home page
  return redirect("/");
};
