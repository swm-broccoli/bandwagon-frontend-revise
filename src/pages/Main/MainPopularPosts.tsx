import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainPageAPI from '../../apis/MainPageAPI';
import defaultPopularPostImage from '../../assets/carousel-intro.jpg';
import defauleProfileImage from '../../assets/band-default-pic.png';
import parse from 'html-react-parser';
import { FaHeart } from 'react-icons/fa';

export interface PopularPostItemType {
  image: string;
  title: string;
  content: string;
  author: string;
  authorProfileImage: string;
  likeCount: number;
  link: string;
}

function MainPopularPostItem({
  popularPost,
}: {
  popularPost: PopularPostItemType;
}) {
  return (
    <Link
      to={popularPost.link}
      className='flex-col flex-1 card rounded-lg min-w-[150px] card-compact bg-base-100 shadow-md my-4'
    >
      <img
        className='aspect-square flex-1'
        src={popularPost.image}
        alt='popular-posts'
      />
      <div className='flex-1 p-2 flex flex-col h-full justify-between'>
        <h2 className='text-md font-bold font-sans-kr line-clamp-2'>
          {popularPost.title}
        </h2>
        <p className='text-sm text-neutral font-sans-kr'>
          <img
            className='w-6 h-6 rounded-full float-left mr-1'
            src={popularPost.authorProfileImage}
            alt='author avatar'
          />
          {popularPost.author}
        </p>
        <div className='flex flex-row items-center text-rose-500 font-sans-kr'>
          <FaHeart className='mr-1' /> {popularPost.likeCount}
        </div>
      </div>
    </Link>
  );
}

function extractImageFromHtml(html: string): string {
  const img = new DOMParser()
    .parseFromString(html, 'text/html')
    .querySelector('img');
  return img ? img.src : '';
}

export function MainPopularPosts() {
  const [popularPosts, setPopularPosts] = useState<PopularPostItemType[]>([]);

  //
  useEffect(() => {
    MainPageAPI.getPopularPosts().then((res) => {
      //console.log(res.data);
      setPopularPosts(
        res.data.posts.map((post: any): PopularPostItemType => {
          if (post.dtype === 'Band') {
            return {
              image:
                extractImageFromHtml(post.body) === ''
                  ? defaultPopularPostImage
                  : extractImageFromHtml(post.body),
              title: post.title,
              content: post.body,
              author: post.bandName,
              authorProfileImage: post.bandAvatarUrl
                ? post.bandAvatarUrl
                : defauleProfileImage,
              likeCount: post.likeCount,
              link: `/recruit/${post.id}`,
            };
          } else {
            return {
              image:
                extractImageFromHtml(post.body) === ''
                  ? defaultPopularPostImage
                  : extractImageFromHtml(post.body),
              title: post.title,
              content: post.body,
              author: post.nickname,
              authorProfileImage: post.userAvatarUrl
                ? post.userAvatarUrl
                : defauleProfileImage,
              likeCount: post.likeCount,
              link: `/recruit/${post.id}`,
            };
          }
        }),
      );
    });
  }, []);

  return (
    <section className='w-full grid grid-cols-6 justify-center items-center py-10'>
      <div className='col-span-full lg:col-start-2 lg:col-end-6 flex flex-col items-center'>
        <h1 className='text-xl font-bold font-sans-kr'>최근 인기글</h1>
        <h2 className='text-neutral font-montserrat tracking-[0.2rem] mb-5'>
          P O P U L A R
        </h2>
        <div className='w-full max-w-[1280px] flex flex-row justify-between overflow-x-auto px-5 md:px-10 lg:px-0 gap-5'>
          {popularPosts.slice(0, 4).map((popularPost, index) => (
            <MainPopularPostItem key={index} popularPost={popularPost} />
          ))}
        </div>
      </div>
    </section>
  );
}
