import React from 'react'
import { useNavigate } from 'react-router-dom';
import RecruitPostAPI from '../apis/RecruitPostAPI';

function DeleteModalButton (props: {postId: string}) {
  const navigate = useNavigate();
  return (
    <>
      <label htmlFor="delete-modal" className="btn modal-button btn-primary w-20 h-[3.125rem] rounded-lg text-white font-normal text-base">삭제</label>
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-80 md:w-96">
          <h3 className="text-lg text-center">삭제하시겠습니까?</h3>
          <div className="modal-action flex gap-2 justify-center">
            <label htmlFor="delete-modal" className="btn w-20 h-[3.125rem] rounded-lg text-white font-normal text-base">취소</label>
            <label
              htmlFor="delete-modal"
              onClick={(e) => {
                RecruitPostAPI.DeletePost(props.postId)
                .then((res) => navigate('/recruit/band'))
                .catch((err) => console.log(err))}
              }
              className="btn btn-primary w-20 h-[3.125rem] rounded-lg text-white font-normal text-base">삭제</label>
          </div>
        </div>
      </div>
    </>
  )
}
 
export default DeleteModalButton;