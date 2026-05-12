import { AppRouter } from "./app/router";
import { ChakraProvider } from "@chakra-ui/react";
import { darkTheme } from "./app/themeConfig"; // adjust path

function App() {
  return (
    <ChakraProvider value={darkTheme}>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
