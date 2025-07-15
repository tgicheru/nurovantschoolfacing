import React, { Suspense } from "react";
import {
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { routes, RouteItem } from "./routeConfig";
import Loading from "../components/loading";
import Layout from "../layouts";
import { useRecoilValue } from "recoil";
import authAtom from "../atoms/auth/auth.atom";

export default function CustomRoutes() {
  const auth = useRecoilValue(authAtom);
  
  return (
    <Layout>
      <Routes>
        {/* Root route that redirects based on authentication state */}
        <Route
          path="/"
          element={
            auth.isLoggedIn ? 
              <Navigate to="/main" replace /> : 
              <Navigate to="/onboarding" replace />
          }
        />
        
        {routes.map(({
          path,
          component,
        }: RouteItem) => {
          return (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<Loading />}>{component}</Suspense>
              }
            />
          );
        })}
      </Routes>
    </Layout>
  );
}

export { routes } from "./routeConfig";
