import React from 'react';
import { Tabs } from 'antd';
import FieldList from './Field';
import StoreList from './Store';

export const EntityDetail: React.FC = () => {
  return (
    <Tabs>
      <Tabs.TabPane key="field" tab="字段">
        <FieldList />
      </Tabs.TabPane>
      <Tabs.TabPane key="page" tab="页面">
        <StoreList />
      </Tabs.TabPane>
    </Tabs>
  );
};
