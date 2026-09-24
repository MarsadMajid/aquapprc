import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome'});
const results=[];
for(const route of ['/','/products','/products/pprc-pn20-pipe']) {
 const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 const page=await context.newPage();const cdp=await context.newCDPSession(page);
 await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750});
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 await page.addInitScript(()=>{
  window.metrics={lcp:0,cls:0};
  new PerformanceObserver(list=>{for(const e of list.getEntries())window.metrics.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.metrics.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
 });
 await page.goto(`http://localhost:3002${route}`);await page.waitForTimeout(5000);
 const result=await page.evaluate(()=>({...window.metrics,jsBytes:performance.getEntriesByType('resource').filter(e=>e.initiatorType==='script').reduce((n,e)=>n+e.transferSize,0),canvases:document.querySelectorAll('canvas').length}));
 results.push({route,...result});console.log(JSON.stringify(results.at(-1)));
 await page.screenshot({path:`test-results/production-${route==='/'?'home':route==='/products'?'catalogue':'product'}-mobile.png`});
 await context.close();
}
await browser.close();
await writeFile('test-results/performance.json',JSON.stringify({conditions:'Chrome headless, production localhost:3002, 390x844, cold browser cache, 4x CPU slowdown, 1.6 Mbps down/0.75 Mbps up, 150ms latency. One run per route; not a physical Android measurement.',results},null,2));
