import React from 'react';
import { Inspector } from 'react-dev-inspector';
import { IS_DEV } from 'src/consts';

export const DevInspector = IS_DEV ? Inspector : React.Fragment;
