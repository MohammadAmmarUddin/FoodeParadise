import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { HelmetProvider, Helmet } from "react-helmet-async";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Helmet>
            <title>FoodParadise</title>
            <meta
              name="description"
              content="Welcome to FoodParadise — the ultimate destination for fresh, delicious meals!"
            />
            <link rel="icon" type="image/png" href="/images/logo/logo.png" />
          </Helmet>

          <div className="mx-auto font-custom">
            <RouterProvider router={router} />
          </div>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
