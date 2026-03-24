import Navigator from "@/navigators/navigator";

import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Navigator />;
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
