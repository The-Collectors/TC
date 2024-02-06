//import React from 'react';
import { createGlobalStyle } from 'styled-components';

import GlitchGoblinwoff from './GlitchGoblin-2O87v.woff';
import GlitchGoblinttf from './GlitchGoblin-2O87v.ttf';
import WordclockStencilMonootf from './WordclockStencilMono-Regular.otf';
import WordclockStencilMonottf from './WordclockStencilMono-Regular.ttf';
import WordclockStencilMonowoff2 from './WordclockStencilMono-Regular.woff2';
import KodeBttf from './Kode-Bold.ttf';
import KodeRttf from './Kode-Regular.ttf';
import KodeMttf from './Kode-Medium.ttf';
import KodeBwoff2 from './Kode-Bold.woff2';
import KodeRwoff2 from './Kode-Regular.woff2';
import KodeMwoff2 from './Kode-Medium.woff2';
import QTBoulevardotf from './QTBoulevard.otf';
import QTBoulevardwoff from './QTBoulevard.woff';
import QTBoulevardttf from './QTBoulevard.ttf';

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

	@font-face {
		// Careful, CAPITAL LETTER font!
		font-family: 'wordclock';
		src:
			local('wordclock'),
			local('word clock'),
			url(${WordclockStencilMonowoff2}) format('woff2'),
			url(${WordclockStencilMonootf}) format('otf'),
			url(${WordclockStencilMonottf}) format('ttf');
		font-weight: 300;
		font-style: normal;
	}

	@font-face {
		font-family: 'kodeR';
		src:
			local('kodeR'),
			url(${KodeRttf}) format('ttf'),
			url(${KodeRwoff2}) format('woff2');
		font-weight: 300;
		font-style: normal;
	}

	@font-face {
		font-family: 'kodeM';
		src:
			local('kodeM'),
			url(${KodeMttf}) format('ttf'),
			url(${KodeMwoff2}) format('woff2');
		font-weight: 300;
		font-style: normal;
	}
	
	@font-face {
		font-family: 'kodeB';
		src:
			local('kodeB'),
			url(${KodeBttf}) format('ttf'),
			url(${KodeBwoff2}) format('woff2');
		font-weight: 300;
		font-style: normal;
	}

	@font-face {
		font-family: 'Boulevard';
		src:
			local('Boulevard'),
			url(${QTBoulevardotf}) format('otf'),
			url(${QTBoulevardwoff}) format('woff'),
			url(${QTBoulevardttf}) format('ttf');
		font-weight: 300;
		font-style: normal;
	}
`;