import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs } from 'antd';
import FieldList from './Field';
import StoreList from './Store';

export const EntityDetail: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTabChange = (key: string) => {
    searchParams.set('tab', key);
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <Tabs defaultActiveKey={searchParams.get('tab') || 'field'} onChange={handleTabChange}>
      <Tabs.TabPane key="field" tab="字段">
        <FieldList />
      </Tabs.TabPane>
      <Tabs.TabPane key="page" tab="页面">
        <StoreList />
      </Tabs.TabPane>
    </Tabs>
  );
};
