'use client'

import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import { DOMParser as ProseMirrorDOMParser } from '@tiptap/pm/model'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { marked } from 'marked'

function ToolbarButton({
  onClick, active, children, label,
}: { onClick: () => void; active?: boolean; children: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`editor-toolbar-btn${active ? ' active' : ''}`}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  )
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const url = window.prompt('Link URL')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().unsetLink().run()
      return
    }
    editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="editor-toolbar">
      <ToolbarButton label="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>B</ToolbarButton>
      <ToolbarButton label="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>I</ToolbarButton>
      <ToolbarButton label="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}>H1</ToolbarButton>
      <ToolbarButton label="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>H2</ToolbarButton>
      <ToolbarButton label="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>H3</ToolbarButton>
      <ToolbarButton label="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>&bull; List</ToolbarButton>
      <ToolbarButton label="Ordered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>1. List</ToolbarButton>
      <ToolbarButton label="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>&ldquo;&rdquo;</ToolbarButton>
      <ToolbarButton label="Code block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')}>{'</>'}</ToolbarButton>
      <ToolbarButton label="Link" onClick={setLink} active={editor.isActive('link')}>Link</ToolbarButton>
      <ToolbarButton label="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>&mdash;</ToolbarButton>
    </div>
  )
}

export default function TiptapEditor({
  content, onChange,
}: { content: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer nofollow' },
      }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: 'editor-content post-content' },
      // Pasting plain text (e.g. copied from a .md file, notes app, or
      // terminal) is treated as Markdown and converted to rich content.
      // Pasted rich HTML (e.g. from a webpage) keeps Tiptap's normal
      // paste behavior untouched.
      handlePaste: (view, event) => {
        const html = event.clipboardData?.getData('text/html')
        const text = event.clipboardData?.getData('text/plain')
        if (html || !text?.trim()) return false

        const parsedHtml = marked.parse(text, { async: false }) as string
        const dom = document.createElement('div')
        dom.innerHTML = parsedHtml
        const slice = ProseMirrorDOMParser.fromSchema(view.state.schema).parseSlice(dom)
        view.dispatch(view.state.tr.replaceSelection(slice))
        return true
      },
    },
  })

  if (!editor) return null

  return (
    <div className="editor-wrapper">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
