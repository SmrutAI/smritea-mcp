export const SMONKU_CSS = `
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f5f0eb;color:#1a1a1a}
.card{text-align:center;padding:48px 40px;max-width:400px}
.monk{width:200px;height:200px;margin:0 auto 28px}

.smonku-fade{-webkit-mask-image:radial-gradient(ellipse 70% 70% at center,black 40%,transparent 100%);mask-image:radial-gradient(ellipse 70% 70% at center,black 40%,transparent 100%)}
.smonku-enter{animation:smonku-spring .6s cubic-bezier(.34,1.56,.64,1) forwards}
.smonku-text-1{animation:smonku-fade-up .4s ease-out .35s both}
.smonku-text-2{animation:smonku-fade-up .4s ease-out .5s both}

@keyframes smonku-spring{0%{transform:scale(.2);opacity:0}50%{transform:scale(1.15);opacity:1}70%{transform:scale(.95)}85%{transform:scale(1.05)}100%{transform:scale(1)}}
@keyframes smonku-fade-up{0%{transform:translateY(12px);opacity:0}100%{transform:translateY(0);opacity:1}}

h1{font-size:32px;font-weight:700;margin-bottom:10px}
p{font-size:18px;color:#666;margin-top:6px;line-height:1.5}
`;
