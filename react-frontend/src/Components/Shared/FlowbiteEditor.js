import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import History from '@tiptap/extension-history';
import 'flowbite/dist/flowbite.css';
import 'flowbite-typography/dist/flowbite-typography.css';

export default function FlowbiteEditor({ value = '', onChange, placeholder = 'Write something...', height = 250 }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      CodeBlock,
      Blockquote,
      History,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none min-h-[${height}px] bg-white dark:bg-gray-700 p-3 rounded-b-lg`,
        placeholder,
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false);
    }
    // eslint-disable-next-line
  }, [value]);

  if (!editor) return <div className="border rounded p-4 bg-gray-50 text-gray-400">Loading editor...</div>;

  return (
    <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
      {/* Toolbar */}
      <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-600 flex flex-wrap gap-1">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded-sm ${editor.isActive('bold') ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'} dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`} title="Bold"><b>B</b></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded-sm ${editor.isActive('italic') ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'} dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`} title="Italic"><i>I</i></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-1.5 rounded-sm ${editor.isActive('underline') ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'} dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`} title="Underline"><u>U</u></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-1.5 rounded-sm ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'} dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`} title="H1">H1</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-1.5 rounded-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'} dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`} title="H2">H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-1.5 rounded-sm ${editor.isActive('bulletList') ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'} dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`} title="Bullet List">• List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-1.5 rounded-sm ${editor.isActive('orderedList') ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'} dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`} title="Ordered List">1. List</button>
        <button type="button" onClick={() => {
          const url = window.prompt('Enter link URL');
          if (url) editor.chain().focus().toggleLink({ href: url }).run();
        }} className={`p-1.5 rounded-sm ${editor.isActive('link') ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'} dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`} title="Link">🔗</button>
        <button type="button" onClick={() => {
          const url = window.prompt('Enter image URL');
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }} className="p-1.5 rounded-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600" title="Image">🖼️</button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-1.5 rounded-sm ${editor.isActive('codeBlock') ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'} dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`} title="Code">{'</>'}</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-1.5 rounded-sm ${editor.isActive('blockquote') ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'} dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`} title="Blockquote">❝</button>
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="p-1.5 rounded-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600" title="Undo">↺</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="p-1.5 rounded-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600" title="Redo">↻</button>
      </div>
      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
} 