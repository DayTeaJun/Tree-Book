import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;        
    }
    a {
        text-decoration: none;
        color: black;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }


    a, button, p, h1, h2 {
        font-family: 'SUIT-Regular';
    }

    @font-face {
    font-family: 'OG_Renaissance_Secret-Rg';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/OG_Renaissance_Secret-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;

    @font-face {
    font-family: 'SUIT-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
}
`;

export default GlobalStyles;
