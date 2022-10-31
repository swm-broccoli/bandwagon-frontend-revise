import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PortfolioAPI from '../../../apis/PortfolioAPI';
import { BandProfileType } from '../../../types/types';
import PortfolioAvatar from '../components/PortfolioAvatar';
import PortfolioText from '../components/PortfolioText';
import PortfolioSelectList from '../components/PortfolioSelectList';
import PortfolioAreaList from '../components/PortfolioAreaList';
import PortfolioDescription from '../components/PortfolioDescription';
import PortfolioRecordField from '../components/PortfolioRecordField';
import { vacantBandProfile } from '../../BandProfile/initialBandProfile';

function BandPortfolioDisplay() {
  const { bandId } = useParams();

  const [bandProfile, setBandProfile] =
    useState<BandProfileType>(vacantBandProfile);

  useEffect(() => {
    console.log(bandId);
    PortfolioAPI.getBandPortfolioInfo(parseInt(bandId || '1')).then((res) => {
      console.log(res.data);
      setBandProfile(res.data);
    });
  }, []);
  return (
    <div>
      <PortfolioAvatar avatarURL={bandProfile.avatarUrl} />
      <PortfolioText label='밴드명' text={bandProfile.name} />
      <PortfolioAreaList
        label='활동 지역'
        areas={bandProfile.areas}
        name='areas'
      />
      <PortfolioSelectList
        label='장르'
        selections={bandProfile.genres}
        name='genres'
      />
      <PortfolioSelectList
        label='활동 요일'
        selections={bandProfile.days}
        name='genres'
      />
      <PortfolioDescription
        label='밴드 소개'
        description={bandProfile.description || ''}
        name='description'
      />
      <PortfolioRecordField
        label='공연 기록'
        records={bandProfile.bandGigs}
        name='userPerformances'
      />
      <PortfolioRecordField
        label='연습 기록'
        records={bandProfile.bandPractices}
        name='userPerformances'
      />
    </div>
  );
}

export default BandPortfolioDisplay;