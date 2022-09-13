import { Link } from 'react-router-dom';

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
  recentPost,
}: {
  recentPost: PopularPostItemType;
}) {
  return (
    <Link
      to={recentPost.link}
      className='flex-1 card rounded-lg min-w-[180px] card-compact bg-base-100 shadow-xl mx-3 my-4'
    >
      <img className='aspect-square' src={recentPost.image} alt='Shoes' />
      <div className='p-2 flex flex-col h-full justify-between'>
        <h2 className='text-lg font-bold line-clamp-2'>{recentPost.title}</h2>
        <p className='text-sm text-neutral line-clamp-2'>
          <img
            className='w-6 h-6 rounded-full float-left mr-2'
            src={recentPost.authorProfileImage}
            alt='author avatar'
          />
          {recentPost.author}
        </p>
        <span className='text-rose-500'>❤︎ {recentPost.likeCount}</span>
      </div>
    </Link>
  );
}

export function MainPopularPosts({
  recentPosts,
}: {
  recentPosts: PopularPostItemType[];
}) {
  return (
    <section className='w-full grid grid-cols-6 justify-center items-center py-10 md:mx-8'>
      <div className='col-span-full lg:col-start-2 lg:col-end-6 flex flex-col items-center'>
        <h1 className='text-2xl font-bold'>최근 인기글</h1>
        <h2 className='text-neutral tracking-[0.2rem] mb-5'>P O P U L A R</h2>
        <div className='w-full max-w-[1280px] flex flex-row justify-between overflow-x-auto'>
          {recentPosts.slice(0, 4).map((recentPost, index) => (
            <MainPopularPostItem key={index} recentPost={recentPost} />
          ))}
        </div>
      </div>
    </section>
  );
}
