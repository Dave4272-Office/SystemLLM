import { apolloClient, ApolloProvider } from "@/library/apollo";
import theme from "@/theme/theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  CircularProgress,
  CssBaseline,
  StyledEngineProvider,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Branding } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/nextjs";
import Image from "next/image";
import { Suspense } from "react";
import "./globals.css";
import { navigation } from "./routes";

const branding: Branding = {
  title: "CorpDK | TNIV",
  logo: (
    <Image
      src="https://mui.com/static/logo.png"
      alt="MUI logo"
      width={40}
      height={40}
    />
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        <Suspense fallback={<CircularProgress />}>
          <AppRouterCacheProvider
            options={{ enableCssLayer: true, key: "css", prepend: true }}
          >
            <CssBaseline />
            <AppProvider
              theme={theme}
              navigation={navigation}
              branding={branding}
              // session={session}
              // authentication={AUTHENTICATION}
            >
              <StyledEngineProvider injectFirst>
                <ApolloProvider client={apolloClient}>
                  {children}
                </ApolloProvider>
              </StyledEngineProvider>
            </AppProvider>
          </AppRouterCacheProvider>
        </Suspense>
      </body>
    </html>
  );
}
