onmessage = function(abc){
    const ans = abc.data.reduce((acc, item)=>item+acc, 0);
    postMessage(ans);
}