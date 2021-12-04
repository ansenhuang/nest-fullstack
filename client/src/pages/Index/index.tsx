import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IndexPage: React.FC = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios({
      url: '/api/users',
      method: 'GET',
      // data: {
      //   firstName: 'firstName2',
      //   lastName: 'lastName2',
      // },
    }).then((res) => {
      setData(res.data || {});
    });
  }, []);

  return (
    <div>
      <h1>Index</h1>
      <pre style={{ padding: 10, backgroundColor: '#eee' }}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default IndexPage;
