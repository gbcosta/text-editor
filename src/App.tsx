import { Index } from "./index.tsx";
import { FilesProvider } from "./useFiles.tsx";

function App() {
  return (
    <FilesProvider>
      <Index></Index>
    </FilesProvider>
  );
}

export default App;
