interface RecentPostItemType {
  image: string;
  avatar: string;
  title: string;
  date: string;
  content: string;
  likes: number;
  link: string;
}

export const tempRecentPosts: RecentPostItemType[] = [
  {
    image: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/50/50',
    title: '그레이트 서울 인베이전 방송',
    date: '2020-01-01',
    content: '서울 인베이전 방송',
    likes: 10911,
    link: '/post/1',
  },
  {
    image: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/50/50',
    title: '일렉기타 셋업 온라인 강좌',
    date: '2020-01-01',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    likes: 16384,
    link: '/post/2',
  },
  {
    image: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/50/50',
    title: '오랜만에 해본 기타 커버 영상',
    date: '2020-01-01',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    likes: 998244353,
    link: '/post/2',
  },
  {
    image: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/50/50',
    title: '일렉기타 셋업 온라인 강좌',
    date: '2020-01-01',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    likes: 16384,
    link: '/post/2',
  },
];

function MainRecentPostItem({
  recentPost,
}: {
  recentPost: RecentPostItemType;
}) {
  return (
    <div className='card rounded-lg aspect-[4/5] card-compact w-full bg-base-100 shadow-xl mx-3'>
      <img className='h-3/5' src={recentPost.image} alt='Shoes' />
      <div className='p-3'>
        <h2 className='truncate text-xl font-bold'>{recentPost.title}</h2>
        <p className='truncate'>{recentPost.content}</p>
        <span className='text-rose-500'>❤︎ {recentPost.likes}</span>
      </div>
    </div>
  );
}

export function MainRecentPosts({
  recentPosts,
}: {
  recentPosts: RecentPostItemType[];
}) {
  return (
    <section className='grid grid-flow-row grid-cols-6 items-center my-10'>
      <div className='col-span-full md:col-start-2 md:col-end-6 flex flex-col items-center'>
        <h1 className='text-2xl font-bold'>최근 인기글</h1>
        <h2 className='text-neutral tracking-[0.2rem] mb-5'>P O P U L A R</h2>
        <div className='w-full flex flex-row justify-between'>
          {recentPosts.slice(0, 3).map((recentPost, index) => (
            <MainRecentPostItem key={index} recentPost={recentPost} />
          ))}
        </div>
      </div>
    </section>
  );
}
