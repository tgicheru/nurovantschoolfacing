import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AxiosContextProvider from "./context/AxiosContext";
import { ConfigProvider } from "antd";
import CustomRoutes from "./router";
import "./styles/input.css"

const queryClient = new QueryClient();
function App() {
  return (
    <RecoilRoot>
      <Router>
        <AxiosContextProvider>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider>
              <CustomRoutes />
            </ConfigProvider>
          </QueryClientProvider>
        </AxiosContextProvider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
