import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "services/auth/authService";
import { logout, setUserProfileInfo } from "features/auth/authSlice";
import { getUserDetails } from "features/auth/authActions";

const Header = ({ title = "Dashboard" }) => {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data?.user) dispatch(setUserProfileInfo(data?.user));
  }, [data, dispatch]);

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
