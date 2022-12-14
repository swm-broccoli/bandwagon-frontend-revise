import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import BandInfoCard from '../../components/BandInfoCard';
import RequirementBox from './RequirementBox';
import Button from '../../components/Button';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar/NavBar';
import RecruitPostAPI from '../../apis/RecruitPostAPI';
import { useNavigate, useParams } from 'react-router-dom';
import UserInfoCard from '../../components/UserInfoCard';
import RecruitProcessAPI from '../../apis/RecruitProcessAPI';
import { useBandRequirementStore } from '../../stores/BandRequirementStore';
import Editor from '../../components/Editor';

function TitleTextField(props: {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}) {
  return (
    <input
      placeholder='제목을 입력하세요'
      className='input input-bordered w-full h-[3.125rem] focus:outline-none focus:border-primary text-accent text-base'
      value={props.title}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        props.setTitle(e.target.value)
      }
    />
  );
}

function WriteRecruitPage(props: { type: boolean }) {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const {
    preqId,
    minStore,
    maxStore,
    genderStore,
    areaStore,
    genreStore,
    positionStore,
    clearStore,
  } = useBandRequirementStore();

  useEffect(() => {
    clearStore();
  }, []);

  useEffect(() => {
    if (postId) {
      RecruitPostAPI.LoadPost(postId)
        .then((res) => {
          setTitle(res.data.title);
          setBody(res.data.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [postId]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.type) {
      RecruitPostAPI.UploadArticle(postId, {
        title: title,
        body: body,
        dtype: 'Band',
      })
        .then((res) => {
          console.log(res.data.id);
          if (minStore || maxStore) {
            RecruitProcessAPI.sendPrequisites(
              {
                dtype: 'Age',
                min: minStore,
                max: maxStore,
                gender: null,
                areas: null,
                genres: null,
                positions: null,
              },
              res.data.id,
              preqId.age,
            )
              .then((res) => {
                console.log('age');
              })
              .catch((err) => {
                console.log(err);
              });
          }
          if (genderStore !== null) {
            RecruitProcessAPI.sendPrequisites(
              {
                dtype: 'Gender',
                min: null,
                max: null,
                gender: genderStore,
                areas: null,
                genres: null,
                positions: null,
              },
              res.data.id,
              preqId.gender,
            )
              .then((res) => {
                console.log('gender');
              })
              .catch((err) => {
                console.log(err);
              });
          }
          if (areaStore.length) {
            RecruitProcessAPI.sendPrequisites(
              {
                dtype: 'Area',
                min: null,
                max: null,
                gender: null,
                areas: areaStore,
                genres: null,
                positions: null,
              },
              res.data.id,
              preqId.area,
            )
              .then((res) => {
                console.log('area');
              })
              .catch((err) => {
                console.log(err);
              });
          }
          console.log(
            genreStore.length,
            areaStore.length,
            positionStore.length,
          );
          if (genreStore.length) {
            RecruitProcessAPI.sendPrequisites(
              {
                dtype: 'Genre',
                min: null,
                max: null,
                gender: null,
                areas: null,
                genres: genreStore,
                positions: null,
              },
              res.data.id,
              preqId.genre,
            )
              .then((res) => {
                console.log('genre');
              })
              .catch((err) => {
                console.log(err);
              });
          }
          if (positionStore.length) {
            RecruitProcessAPI.sendPrequisites(
              {
                dtype: 'Position',
                min: null,
                max: null,
                gender: null,
                areas: null,
                genres: null,
                positions: positionStore,
              },
              res.data.id,
              preqId.position,
            )
              .then((res) => {
                console.log('position');
              })
              .catch((err) => {
                console.log(err);
              });
          }
          if (postId) {
            window.alert('글이 수정되었습니다');
            navigate('/recruit/' + postId);
          } else {
            window.alert('글이 작성되었습니다');
            navigate('/recruit/' + res.data.id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      RecruitPostAPI.UploadArticle(postId, {
        title: title,
        body: body,
        dtype: 'User',
      })
        .then((res) => {
          console.log(res.data.id);
          if (postId) {
            window.alert('글이 수정되었습니다');
            navigate('/recruit/' + postId);
          } else {
            window.alert('글이 작성되었습니다');
            navigate('/recruit/' + res.data.id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <GlobalNavBar />
      <div className='flex justify-center w-full h-fit py-10'>
        <div className='flex flex-col gap-6 w-9/12 max-w-3xl'>
          {/* 글쓰기 알림, 등록 버튼 */}
          <div className='grid grid-cols-2 items-center mb-4'>
            {props.type ? (
              <h2 className='col-start-1 text-accent text-2xl'>
                글쓰기 (구인)
              </h2>
            ) : (
              <h2 className='col-start-1 text-accent text-2xl'>
                글쓰기 (구직)
              </h2>
            )}
            <div className='col-start-2 justify-self-end'>
              <Button
                label='등록'
                x='w-[7.5rem] '
                y='h-10'
                textSize='text-sm'
                onclick={handleClick}
              />
            </div>
          </div>
          {/* 제목 입력 */}
          <TitleTextField title={title} setTitle={setTitle} />
          {/* 밴드 정보 */}
          {props.type ? (
            <BandInfoCard type={true} bandId={undefined} />
          ) : (
            <UserInfoCard type={true} userId={undefined} />
          )}
          {/* 본문 쓰기 */}
          <div className='flex flex-col gap-4'>
            <h3 className='text-accent text-base'>글쓰기</h3>
            <div className='h-full mb-20'>
              <Editor body={body} setBody={setBody} />
            </div>
          </div>
          {/* 모집 정보 (지원 조건, 추가 지원 양식) */}
          {props.type ? <RequirementBox postId={postId} /> : <></>}
        </div>
      </div>
      <GlobalFooter />
    </>
  );
}

export default WriteRecruitPage;
