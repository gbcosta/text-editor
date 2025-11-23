import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createEditor, Editor, Element, Transforms } from "slate";
import {
  Slate,
  Editable,
  withReact,
  type RenderElementProps,
  type RenderLeafProps,
} from "slate-react";
import type { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaListUl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa";
import { IoCode } from "react-icons/io5";
import { useActiveFile } from "../contexts/useActiveFile";

type TypeElements =
  | "paragraph"
  | "startAlign"
  | "centerAlign"
  | "endAlign"
  | "justifyAlign"
  | "code";

type CustomElement = {
  type: TypeElements;
  children: CustomText[];
};
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
const Paragraph = ({
  props,
  align,
}: {
  props: RenderElementProps;
  align?: "start" | "end" | "center" | "justify";
}) => {
  return (
    <p style={{ textAlign: align }} {...props}>
      {props.children}
    </p>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props: any) => {
  const style = {
    fontWeight: props.leaf.bold ? "bold" : "normal",
    fontStyle: props.leaf.italic ? "italic" : "normal",
    textDecoration: props.leaf.underline ? "underline" : "none",
  };

  if (props.leaf.code) {
    return (
      <code {...props.attributes} style={style}>
        {props.children}
      </code>
    );
  }
  return (
    <span {...props.attributes} style={style}>
      {props.children}
    </span>
  );
};

const Button = ({
  mark,
  children,
  editor,
  markName,
  typeName,
}: {
  mark?: boolean;
  children: ReactNode;
  editor: Editor;
  markName?: string;
  typeName?: TypeElements;
}) => {
  return (
    <button
      className="bg-none rounded-lg hover:bg-gray-700 cursor-pointer p-2"
      onClick={() => {
        if (mark) {
          CustomEditor.toggleMark(editor, markName ?? "bold");
          return;
        }
        CustomEditor.toggleTypeBlock(editor, typeName ?? "paragraph");
      }}
    >
      {children}
    </button>
  );
};

const CustomEditor = {
  isMarkActive(editor: Editor, mark: string) {
    const marks: any = Editor.marks(editor);
    return marks ? marks[mark] === true : false;
  },

  toggleMark(editor: Editor, mark: string) {
    const isActive = CustomEditor.isMarkActive(editor, mark);
    if (isActive) {
      Editor.removeMark(editor, mark);
    } else {
      Editor.addMark(editor, mark, true);
    }
  },

  isTypeActive(editor: Editor, type: TypeElements) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === type,
    });

    return !!match;
  },

  toggleTypeBlock(editor: Editor, type: TypeElements) {
    const isActive = CustomEditor.isTypeActive(editor, type);
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : type },
      { match: (n: any) => Element.isElement(n) && Editor.isBlock(editor, n) },
    );
  },
};

export const TextEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const activeFileContext = useActiveFile();

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "startAlign":
        return <Paragraph props={props} align="start" />;
      case "centerAlign":
        return <Paragraph props={props} align="center" />;
      case "endAlign":
        return <Paragraph props={props} align="end" />;
      case "justifyAlign":
        return <Paragraph props={props} align="justify" />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const isAnyFileActive =
    activeFileContext.getActiveFile() != "" ? "" : "hidden";

  useEffect(() => {
    if (activeFileContext.getJson() != "") {
      editor.children = JSON.parse(activeFileContext.getJson());
      editor.onChange();
    } else {
      editor.children = initialValue;
      editor.onChange();
    }
  }, [activeFileContext.activeFile]);

  return (
    <div className="col-span-10 row-span-11">
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type,
          );
          if (isAstChange) {
            const content = JSON.stringify(value);
            activeFileContext.saveJson(content);
          }
        }}
      >
        <div className="flex flex-col h-full bg-gray-800 ">
          <div className="flex gap-2 p-2 text-xl border-b-2 border-b-gray-600 text-gray-400">
            <div className="flex gap-3 border-r-3 pr-2 border-r-gray-600 ">
              <Button mark markName="bold" editor={editor}>
                <FaBold />
              </Button>
              <Button mark markName="italic" editor={editor}>
                <FaItalic />
              </Button>
              <Button mark markName="underline" editor={editor}>
                <FaUnderline />
              </Button>
              <Button mark markName="code" editor={editor}>
                <IoCode />
              </Button>
            </div>
            <div className="flex gap-4 border-r-3 border-r-gray-600 pr-2">
              <Button typeName="startAlign" editor={editor}>
                <FaListOl />
              </Button>
              <Button typeName="startAlign" editor={editor}>
                <FaListUl />
              </Button>
              <Button typeName="startAlign" editor={editor}>
                <FaAlignLeft />
              </Button>
              <Button editor={editor} typeName="centerAlign">
                <FaAlignCenter />
              </Button>
              <Button editor={editor} typeName="endAlign">
                <FaAlignRight />
              </Button>
              <Button editor={editor} typeName="justifyAlign">
                <FaAlignJustify />
              </Button>
            </div>
          </div>
          <Editable
            renderLeaf={renderLeaf}
            className={`grow p-4 m-12 bg-slate-900 text-gray-200 ${isAnyFileActive}`}
            renderElement={renderElement}
          />
        </div>
      </Slate>
    </div>
  );
};
