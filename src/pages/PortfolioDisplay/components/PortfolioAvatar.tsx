function PortfolioAvatar({ avatarURL }: { avatarURL: string }) {
  return (
    <section className='flex flex-col items-center'>
      <div className='avatar w-1/3'>
        <div className='w-full rounded-full border border-base-300'>
          <img src={avatarURL} alt='프로필 사진' />
        </div>
      </div>
    </section>
  );
}

export default PortfolioAvatar;
