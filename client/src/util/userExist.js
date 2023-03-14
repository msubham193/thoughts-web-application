import { useSelector } from "react-redux";
function isUserExist() {
  const user = useSelector((state) => state.user.user);
  return user;
}

export default isUserExist;
