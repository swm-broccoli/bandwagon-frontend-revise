import React, {useEffect, useState} from 'react';
import ArticleCard from './ArticleCard';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import Button from '../../components/Button';
import RecruitTab from './RecruitTab';
import SearchBox from './SearchBox';
import { BandPostCardType, UserPostCardType } from '../../types/types';
import RecruitAPI from '../../apis/RecruitAPI';
import { useSearchPostStore } from '../../stores/SearchPostStore';
import { Link, useNavigate } from 'react-router-dom';

// true: 구인, false: 구직
function RecruitPage(props: {type: boolean}) {
  const [bandPostList, setBandPostList] = useState<BandPostCardType[]>([]);
  const [userPostList, setUserPostList] = useState<UserPostCardType[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const {
    selectStore,
    titleStore,
    minAgeStore,
    maxAgeStore} = useSearchPostStore();

  useEffect(() => {
    if (props.type) {
      RecruitAPI.LoadBandPost('')
      .then((res) => {
        console.log(res.data);
        setBandPostList(res.data.posts);
        setTotalItems(res.data.totalItems);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      RecruitAPI.LoadUserPost('')
      .then((res) => {
        console.log(res.data);
        setUserPostList(res.data.posts);
        setTotalItems(res.data.totalItems);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [props.type])

function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const requestParam = '?page=0' + titleStore + minAgeStore + maxAgeStore + selectStore.join('');

    console.log(requestParam);

    RecruitAPI.LoadBandPost(requestParam)
    .then((res) => {
      console.log(res.data);
      setBandPostList(res.data.posts);
      setTotalItems(res.data.totalItems);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      <GlobalNavBar />
      <div className='grid grid-cols-[1fr_3fr_3fr_1fr] auto-rows-auto'>
        <RecruitTab clicked={props.type} />
        <div className='row-start-1 col-start-3 justify-self-end pt-12'>
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>
             <Button label='글쓰기' x='w-[7.5rem] ' y='h-10 ' textSize='text-sm' onclick={(e) => <></>}/>
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to='/recruit/band/write'>밴드 찾기</Link></li>
            <li><Link to='/recruit/user/write'>멤버 찾기</Link></li>
          </ul>
        </div>
        </div>
        <SearchBox type={props.type} onClick={handleClick}/>
        <div className='row-start-3 col-start-2 flex gap-4 pt-14'>
          <h2 className='text-xl'>새 글</h2>
          <h2 className='text-xl text-secondary'>{totalItems + ' 개'}</h2>
        </div>
        <div className='row-start-4 col-start-2 col-end-4 grid grid-cols-1 md:grid-cols-2 flex-wrap gap-x-[3%] gap-y-1 justify-center'>
          {props.type ?
            <>
            {bandPostList.map((post, index) => 
              <Link to={'/recruit/' + post.id.toString()} key={index}>
                  <ArticleCard 
                  type={true}
                  pic={post.bandAvatarUrl}
                  title={post.title}
                  authorPic={post.bandAvatarUrl}
                  authorName={post.bandName}
                  authorId={post.bandId.toString()}
                  isHeartChecked={false} />
              </Link>
            )}
            </> :
            <>
            {userPostList.map((post, index) => 
              <Link to={'/recruit/' + post.id.toString()} key={index}>
                  <ArticleCard 
                  type={false}
                  pic={post.userAvatarUrl}
                  title={post.title}
                  authorPic={post.userAvatarUrl}
                  authorName={post.nickname}
                  authorId={post.email}
                  isHeartChecked={false} />
              </Link>
            )}
            </>
          }
        </div>
    </div>
    <GlobalFooter />
    </>
  );
}

export default RecruitPage;
