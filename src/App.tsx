import { Index } from "./index.tsx";
import { FilesProvider } from "./contexts/useFiles.tsx";
import { ActiveFileProvider } from "./contexts/useActiveFile.tsx";

function App() {
  return (
    <FilesProvider>
      <ActiveFileProvider>
        <Index></Index>
      </ActiveFileProvider>
    </FilesProvider>
  );
}

export default App;
