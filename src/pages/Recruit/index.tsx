import React, {useEffect, useState} from 'react';
import ArticleCard from '../../components/ArticleCard';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import Button from '../../components/Button';
import RecruitTab from './RecruitTab';
import SearchBox from './SearchBox';
import Pagination from '../../components/Pagination';
import { PostCardType } from '../../types/types';
import RecruitAPI from '../../apis/RecruitAPI';
import { useSearchPostStore } from '../../stores/SearchPostStore';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

// true: 구인, false: 구직
function RecruitPage(props: {type: boolean},) {
  const [postList, setPostList] = useState<PostCardType[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();
  const {
    pageStore,
    selectStore,
    genreArray,
    areaArray,
    titleStore,
    minAgeStore,
    maxAgeStore,
    clearStore} = useSearchPostStore();
    

  useEffect(() => {
    if (!search) {
      console.log('clear');
      clearStore();
    }

    if (props.type) {
      RecruitAPI.LoadBandPost(search)
      .then((res) => {
        console.log(res.data);
        setPostList(res.data.posts);
        setTotalItems(res.data.totalItems);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      RecruitAPI.LoadUserPost(search)
      .then((res) => {
        console.log(res.data);
        setPostList(res.data.posts);
        setTotalItems(res.data.totalItems);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [props.type, search])

  useEffect(() => {
    const query = new URLSearchParams(search);

    query.set('page', pageStore);
    setSearchParams(query);
  }, [pageStore])
  

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const query = new URLSearchParams();

    console.log(selectStore);
    console.log(genreArray);
    console.log(areaArray);

    if (titleStore) query.set('title', titleStore);
    if (minAgeStore) query.set('minAge', minAgeStore);
    if (maxAgeStore) query.set('maxAge', maxAgeStore);
    
    selectStore.forEach(element => query.append(element.type, element.id));

    setSearchParams(query);

    console.log('click');
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
            <li><Link to='/recruit/band/write'>멤버 찾기</Link></li>
            <li><Link to='/recruit/user/write'>밴드 찾기</Link></li>
          </ul>
        </div>
        </div>
        <SearchBox type={props.type} onClick={handleClick}/>
        <div className='row-start-3 col-start-2 flex gap-4 pt-14'>
          <h2 className='text-xl'>새 글</h2>
          <h2 className='text-xl text-secondary'>{totalItems + ' 개'}</h2>
        </div>
        <div className='row-start-4 col-start-2 col-end-4 grid grid-cols-1 md:grid-cols-2 flex-wrap gap-x-[3%] gap-y-1 justify-center'>
            {postList.map((post, index) => 
              <Link to={'/recruit/' + post.id.toString()} key={index}>
                  <ArticleCard 
                    postInfo={post} />
              </Link>
            )}
        </div>
        <div className='w-auto h-fit row-start-5 col-start-2 col-end-4 mt-[4.5rem]'>
          <Pagination type={props.type} totalPage={totalPages - 1}/>
        </div>
    </div>
    <GlobalFooter />
    </>
  );
}

export default RecruitPage;
