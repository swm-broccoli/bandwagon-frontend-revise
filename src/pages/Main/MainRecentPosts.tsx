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
  {
    image: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/50/50',
    title: '그레이트 서울 인베이전 방송',
    date: '2020-01-01',
    content: '서울 인베이전 방송',
    likes: 10911,
    link: '/post/1',
  },
];

function MainRecentPostItem({
  recentPost,
}: {
  recentPost: RecentPostItemType;
}) {
  return (
    <div className='flex-1 card rounded-lg min-w-[180px] card-compact bg-base-100 shadow-xl mx-3 lg:mx-5 my-4'>
      <img className='aspect-square' src={recentPost.image} alt='Shoes' />
      <div className='p-2 flex flex-col h-full justify-between'>
        <h2 className='text-lg font-bold line-clamp-2'>{recentPost.title}</h2>
        <p className='text-sm text-neutral line-clamp-2'>
          {recentPost.content}
        </p>
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
    <section className='w-full grid grid-cols-6 justify-center items-center py-10 md:mx-8'>
      <div className='col-span-full lg:col-start-2 lg:col-end-6 flex flex-col items-center'>
        <h1 className='text-2xl font-bold'>최근 인기글</h1>
        <h2 className='text-neutral tracking-[0.2rem] mb-5'>P O P U L A R</h2>
        <div className='w-full max-w-[1280px] flex flex-row justify-between overflow-x-auto'>
          {recentPosts.slice(0, 4).map((recentPost, index) => (
            <MainRecentPostItem key={index} recentPost={recentPost} />
          ))}
        </div>
      </div>
    </section>
  );
}
