import DefaultPostImg from '../../../assets/default/post_no_img.png';
import { PictureType } from '../../../types/types';

export function PortfolioAlbumItem({ photo }: { photo: PictureType }) {
  return (
    <div className='flex flex-row shrink-0 mr-4 items-start'>
      <img
        className='w-32 h-32 rounded-xl mr-1'
        src={photo.name || DefaultPostImg}
        alt={`밴드 사진`}
      />
    </div>
  );
}

export default PortfolioAlbumItem;
