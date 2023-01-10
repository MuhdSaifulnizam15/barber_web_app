import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={<div>Loading ....</div>}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element:
          //   <GuestGuard>
              <Login />
          //   </GuestGuard>
          
        },
        {
          path: 'register',
          element: (
          //   <GuestGuard>
              <Register />
          //   </GuestGuard>
          )
        },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'forgot-password', element: <ForgotPassword /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'admin',
      // element: (
      //   <AuthGuard>
      //     <DashboardLayout />
      //   </AuthGuard>
      // ),
      children: [
        { path: 'dashboard', element: <Dashboard /> },
      ]
    },

    // Main Routes
    {
      path: '*',
      // element: <LogoOnlyLayout />,
      children: [
        // { path: 'coming-soon', element: <ComingSoon /> },
        // { path: 'maintenance', element: <Maintenance /> },
        // { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      children: [
        { path: 'history', element: <History /> },
        { path: 'profile', element: <Profile /> },
        { path: 'sales', element: <Sales /> },
        { path: 'transactions', element: <Transaction /> },
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ])
}

// IMPORT PAGES

// Authentication
const Login = Loadable(lazy(() => import('pages/Auth/Login')));
const Register = Loadable(lazy(() => import('pages/Auth/Register')));
const ResetPassword = Loadable(lazy(() => import('pages/Auth/ResetPassword')));
const ForgotPassword = Loadable(lazy(() => import('pages/Auth/ForgotPassword')));

// Dashboard
const Dashboard = Loadable(lazy(() => import('pages/Admin/Dashboard')));
const History = Loadable(lazy(() => import('pages/History')));
const Profile = Loadable(lazy(() => import('pages/Profile')));
const Sales = Loadable(lazy(() => import('pages/Sales')));
const Transaction = Loadable(lazy(() => import('pages/Transaction')));


// Main
// const ComingSoon = Loadable(lazy(() => import('pages/ComingSoon')));
const NotFound = Loadable(lazy(() => import('pages/404')));
// const Maintenance = Loadable(lazy(() => import('pages/Maintenance')));
// const Page500 = Loadable(lazy(() => import('pages/Page500')));