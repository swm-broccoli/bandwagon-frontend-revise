import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function OauthPage() {
  const queryString = useParams();

  useEffect(() => {
    console.log(queryString);
  }, []);

  return <div>Oauth 페이지</div>;
}

export default OauthPage;
