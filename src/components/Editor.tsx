import React, { Dispatch, SetStateAction, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor (props: {
  body: string,
  setBody: Dispatch<SetStateAction<string>>
}) {
  const quillRef = React.useRef<ReactQuill>(null);

  const modules = {
    toolbar: {
        container: [
          [{ 'font': [] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block', 'formula'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}], 
          ['link', 'image', 'video'],
          [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
          ['clean'],
        ],
      },  
    }

  const formats = [
  'font',
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'formula',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'align', 'color', 'background',        
  ]
  return (
    <ReactQuill
      ref={quillRef}
      theme="snow" 
      modules={modules} 
      formats={formats} 
      value={props.body} 
      placeholder='내용을 입력하세요.'
      onChange={(content, delta, source, editor) => props.setBody(editor.getHTML())} />
  )
}

export default Editor;