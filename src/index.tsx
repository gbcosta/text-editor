import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header.tsx";
import { TextEditor } from "./components/editor.tsx";
import { isValidElement, useEffect, useState } from "react";
import { useFiles } from "./contexts/useFiles.tsx";
import { useActiveFile } from "./contexts/useActiveFile.tsx";

export function Index() {
  const [fileToDelete, setFileToDelete] = useState<string>("");
  const activeFile = useActiveFile();

  const files = useFiles();

  useEffect(() => {
    files.deleteFiles(fileToDelete);
    const newActiveFile = files.files.find((n: any) => {
      if (isValidElement<{ name: string }>(n) && n.props.name != fileToDelete) {
        return n;
      }
    });

    if (isValidElement<{ name: string }>(newActiveFile)) {
      activeFile.changeActiveFileName(newActiveFile.props.name);
      return;
    }

    activeFile.changeActiveFileName("");
  }, [fileToDelete]);

  return (
    <div className="grid grid-rows-12 grid-cols-12 h-screen">
      <Sidebar setFileToDelete={setFileToDelete} />
      <Header />
      <TextEditor />
    </div>
  );
}
