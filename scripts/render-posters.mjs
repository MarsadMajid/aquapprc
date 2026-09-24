import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--enable-unsafe-swiftshader"]});
const page=await browser.newPage({viewport:{width:1600,height:1200},deviceScaleFactor:1});
page.on("pageerror",e=>console.error(e.message));
const products={pn20:"pprc-pn20-pipe",fiber:"fiber-composite-pipe",elbow:"90-degree-fusion-elbow",tee:"equal-fusion-tee",socket:"brass-threaded-socket",valve:"pprc-ball-valve"};
try{for(const [id,slug] of Object.entries(products)){
 await page.goto(`http://localhost:3001/products/${slug}`);
 await page.getByRole("button",{name:"3D",exact:true}).click();
 await page.locator('canvas').waitFor({state:"visible",timeout:60000});
 await page.addStyleTag({content:".viewer-anchor{width:1200px!important}.viewer-stage{width:1200px!important;height:900px!important}"});
 await page.locator('canvas').scrollIntoViewIfNeeded();
 await page.waitForTimeout(1200);
 const data=await page.locator('canvas').evaluate(c=>c.toDataURL("image/png"));
 await writeFile(`public/images/models/${id}-studio.png`,Buffer.from(data.split(",")[1],"base64"));
 console.log(`Rendered ${id}`);
 if(id==="fiber"){await page.getByRole("button",{name:"Layers",exact:true}).click();await page.waitForTimeout(600);const layers=await page.locator('canvas').evaluate(c=>c.toDataURL("image/png"));await writeFile("public/images/models/fiber-layers-studio.png",Buffer.from(layers.split(",")[1],"base64"));}
}}finally{await browser.close();}
