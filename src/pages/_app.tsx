import "../styles/global.css";

import type { AppProps } from "next/app";
import StoreProvider from "../redux/StoreProvider";
import { PrivyProvider } from "@privy-io/react-auth";

import AuthContextProvider from "../context/AuthProvider";
import { OrbisProvider } from "../context/chat/DirectMessages/DirectMessages";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider>
      <PrivyProvider
        appId={"cllbzjz6201cmmd08nyxiq6qk"}
        config={{
          loginMethods: ["email"],
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
            // logo: "https://your-logo-url",
          },
          embeddedWallets: {
            noPromptOnSignature: true, // defaults to false
          },
        }}
      >
        <AuthContextProvider>
          <OrbisProvider>
            <Component {...pageProps} />
          </OrbisProvider>
        </AuthContextProvider>
      </PrivyProvider>
    </StoreProvider>
  );
};

export default MyApp;
