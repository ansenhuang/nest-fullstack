import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IndexPage: React.FC = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios({
      url: '/api/json',
      method: 'GET',
      params: {
        name: 'xxx',
      },
    }).then((res) => {
      setData(res.data || {});
    });
  }, []);

  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default IndexPage;
