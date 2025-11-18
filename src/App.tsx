import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header.tsx";
import { TextEditor } from "./components/editor.tsx";

function App() {
  return (
    <div className="grid grid-rows-12 grid-cols-12 h-screen">
      <Sidebar />
      <Header />
      <TextEditor />
    </div>
  );
}

export default App;
