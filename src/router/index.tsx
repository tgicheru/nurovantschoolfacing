import React, { Suspense } from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import { routes } from "./routes";
import Loading from "../components/loading";
import Layout from "../layouts";

export default function CustomRoutes() {
  return (
    <Layout>
      <Routes>
        {routes.map(({
          path,
          component,
        }) => {
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

export * from "./routes";
