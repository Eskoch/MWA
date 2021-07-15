const func = ()=>{setTimeout(()=>{
    console.log("Timeout 1")
    process.nextTick(()=>console.log("Next tick queue inside setTimeout"))
},0)
};

setTimeout(()=>console.log("Timeout 2"),0);
setTimeout(()=>console.log("Timeout 3"),3000);

setImmediate(()=>console.log("Immediate"));
process.nextTick(()=>console.log("Next tick queue"));