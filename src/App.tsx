import { Index } from "./index.tsx";
import { FilesProvider } from "./useFiles.tsx";
import { ActiveFileProvider } from "./useActiveFile.tsx";

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
