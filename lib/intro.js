/** Evita flash del intro si ya se vio en la sesión (antes de hidratar React). */
export const introInitScript = `(function(){try{if(sessionStorage.getItem('intro_seen')==='1'){document.documentElement.dataset.introDone='1';}}catch(e){}})();`;
