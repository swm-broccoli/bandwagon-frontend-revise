import React, {useEffect, useState} from 'react';
import ArticleCard from './ArticleCard';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import Button from '../../components/Button';
import RecruitTab from './RecruitTab';
import SearchBox from './SearchBox';
import { Link } from 'react-router-dom';
import { PostCardType } from '../../types/types';
import RecruitAPI from '../../apis/RecruitAPI';
import { useSearchPostStore } from '../../stores/SearchPostStore';

function RecruitPage() {
  const [postList, setPostList] = useState<PostCardType[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const {
    selectStore,
    titleStore,
    minAgeStore,
    maxAgeStore} = useSearchPostStore();

  useEffect(() => {
    RecruitAPI.LoadBandPost('')
    .then((res) => {
      console.log(res.data);
      setPostList(res.data.posts);
      setTotalItems(res.data.totalItems);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  useEffect(() => {
    console.log(selectStore);
  }, [selectStore]);

function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const requestParam = '?page=0' + titleStore + minAgeStore + maxAgeStore + selectStore.join('');

    console.log(requestParam);

    RecruitAPI.LoadBandPost(requestParam)
    .then((res) => {
      console.log(res.data);
      setPostList(res.data.posts);
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
        <RecruitTab clicked={true} />
        <div className='row-start-1 col-start-3 justify-self-end pt-12'>
        <Link to='/recruit/write'>
          <Button label='글쓰기' x='w-[7.5rem] ' y='h-10 ' textSize='text-sm' />
        </Link>
        </div>
        <SearchBox onClick={handleClick}/>
        <div className='row-start-3 col-start-2 flex gap-4 pt-14'>
          <h2 className='text-xl'>새 글</h2>
          <h2 className='text-xl text-secondary'>{totalItems + ' 개'}</h2>
        </div>
        <div className='row-start-4 col-start-2 col-end-4 grid grid-cols-1 md:grid-cols-2 flex-wrap gap-x-[3%] gap-y-1 justify-center'>
          {postList.length ? 
            <>
            {postList.map((post, index) => 
              <Link to={post.id.toString()} key={index}>
                <ArticleCard 
                pic={post.bandAvatarUrl}
                title={post.title}
                authorPic={post.bandAvatarUrl}
                authorName={post.bandName}
                authorId={post.bandId}
                isHeartChecked={false} />
              </Link>
            )}
            </> :
          <></>}
        </div>
    </div>
    <GlobalFooter />
    </>
  );
}

export default RecruitPage;
