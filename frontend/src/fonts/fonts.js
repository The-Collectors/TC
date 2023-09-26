import React from 'react';
import { createGlobalStyle } from 'styled-components';

import GlitchGoblinwoff from './GlitchGoblin-2O87v.woff';
import GlitchGoblinttf from './GlitchGoblin-2O87v.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'glitch';
        src:
            local('glitch'),
            url(${GlitchGoblinwoff}) format('woff'),
            url(${GlitchGoblinttf}) format('ttf');
        font-weight: 300;
        font-style: normal;
    }
`;