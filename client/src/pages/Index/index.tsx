import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage: React.FC = () => {
  return (
    <div>
      <h1>Index</h1>
      <div>
        <Link to="/entity/list">EntityList</Link>
      </div>
    </div>
  );
};

export default IndexPage;
