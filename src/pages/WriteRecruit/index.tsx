import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import BandInfoCard from '../../components/BandInfoCard';
import Button from '../../components/Button';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import WritePostAPI from '../../apis/WritePostAPI';
import { useNavigate } from 'react-router-dom';

function TitleTextField (props: {
  title: string,
  setTitle: Dispatch<SetStateAction<string>>}) {

  return (
    <input
      placeholder='제목을 입력하세요'
      className='input input-bordered w-full h-[3.125rem] focus:outline-none focus:border-primary text-accent text-base'
      value={props.title}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setTitle(e.target.value)}/>
  );
};

/* useRef props로 전달하는 법 공부 후 사용
function WriteEditor (props: {
  editorRef: React.ForwardedRef<Editor>}) {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-accent text-base'>글쓰기</h3>
      <Editor
        initialValue="밴드를 소개해 주세요."
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        ref={props.editorRef} />
    </div>
  )
}
*/

function WriteRecruitPage () {
  const [title, setTitle] = useState('');
  const editorRef = useRef<Editor>(null);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(editorRef.current?.getInstance().getHTML().toString());

    WritePostAPI.UploadArticle({
      title: title,
      body: editorRef.current?.getInstance().getHTML().toString()})
      .then((res) => {
        console.log(res.data.id);
        window.alert('글이 작성되었습니다.')
        navigate('/recruit/' + res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <GlobalNavBar />
    <div className='flex justify-center w-full h-fit py-10'>
      <div className='flex flex-col gap-6 w-9/12 max-w-3xl'>
        {/* 글쓰기 알림, 등록 버튼 */}
        <div className='grid grid-cols-2 items-center mb-4'>
          <h2 className='col-start-1 text-accent text-2xl'>글쓰기 (구인)</h2>
          <div className='col-start-2 justify-self-end'>
            <Button label='등록' x='w-[7.5rem] ' y='h-10' textSize='text-sm' onclick={handleClick}/>
          </div>
        </div>
        {/* 제목 입력 */}
        <TitleTextField title={title} setTitle={setTitle}/>
        {/* 밴드 정보 */}
        <BandInfoCard type={true}/>
        {/* 본문 쓰기 */}
        <div className='flex flex-col gap-4'>
          <h3 className='text-accent text-base'>글쓰기</h3>
          <Editor
            initialValue="밴드를 소개해 주세요."
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            ref={editorRef} />
        </div>
        {/* 모집 정보 (지원 조건, 추가 지원 양식) */}
      </div>
    </div>
    <GlobalFooter />
    </>
  )
}

export default WriteRecruitPage;