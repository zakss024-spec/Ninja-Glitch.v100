const $=s=>document.querySelector(s), qsa=s=>[...document.querySelectorAll(s)];
let failed=0,locked=false,page="home",activity=24;
const modules={
home:[
["BUG","⌁","BUG LAB","SIMULATION","Run local bug scenarios and inspect visual logs."],
["BUG GROUP","◈","GROUP BUG LAB","SIMULATION","Practice a synthetic group moderation flow."],
["BAN GROUP","×","BAN GROUP","SAFE","Local moderation simulator with no real target."],
["MANAGE SENDER","◎","SENDER MANAGER","LOCAL","Create and switch local sender profiles."],
["TERMINAL","›_","LOCAL TERMINAL","READY","Interactive fake terminal with safe commands."],
["SECURITY","◇","SECURITY CENTER","ACTIVE","Review local security indicators and session state."],
["STATISTICS","▥","STATISTICS","LIVE","Session counters and visual system metrics."],
["NOTIFICATIONS","!","NOTIFICATION HUB","READY","Review simulated system notifications."],
["IMAGE TEST","▧","ASSET CHECK","READY","Check local image assets and fallbacks."]
],
tools:[
["TERMINAL","›_","TERMINAL","READY","Local command simulator with generated output."],
["OSINT LAB","◎","OSINT LAB","SAFE","Synthetic identities and fictional datasets."],
["NETWORK LAB","⌁","NETWORK MAP","SAFE","Offline visual network topology simulator."],
["SENDER MANAGER","◎","MANAGE SENDER","LOCAL","Manage local sender profiles."],
["IMAGE TEST","▧","IMAGE TEST","READY","Verify all bundled assets load correctly."],
["PERFORMANCE","◌","PERFORMANCE","OPT","Animation and rendering diagnostics."]
],
labs:[
["HACK LAB","⌁","HACK LAB","SIMULATION","Educational local simulation; no target interaction."],
["REPORT LAB","⚑","REPORT LAB","SIMULATION","Build a fictional report workflow."],
["EXPLOIT LAB","◇","EXPLOIT LAB","SANDBOX","Conceptual sandbox with generated data only."],
["BUG GROUP","◈","BUG GROUP","SIMULATION","Synthetic group bug workflow."],
["BAN GROUP","×","BAN GROUP","SAFE","Fictional moderation controls."],
["SECURITY","◇","SECURITY CENTER","ACTIVE","Local security checklist."]
],
activity:[
["ACTIVITY","◷","ACTIVITY CENTER","LIVE","Session events and local actions."],
["STATISTICS","▥","STATISTICS","LIVE","Visualized session statistics."],
["NOTIFICATIONS","!","NOTIFICATION HUB","READY","Recent local notifications."],
["HISTORY","≡","HISTORY","LOCAL","Local simulated action history."]
],
settings:[
["SESSION","◉","SESSION","LOCAL","Local-only session state and logout controls."],
["PERFORMANCE","◌","PERFORMANCE","OPT","Animation intensity and UI diagnostics."],
["ABOUT","i","ABOUT","INFO","Ninja Glitch interface information."],
["DEVELOPERS","✦","DEVELOPERS","CREDITS","ZAKSS • DAKA • NATHAN"]
]};
function showOnly(id){["intro","login","finger","loading"].forEach(x=>$("#"+x).classList.add("hidden"));if(id)$("#"+id).classList.remove("hidden")}
function progress(bar,pct,done){let n=0,t=setInterval(()=>{n=Math.min(100,n+2);$(bar).style.width=n+"%";if(pct)$(pct).textContent=n+"%";if(n>=100){clearInterval(t);done&&done()}},32);return t}
let introTimer=progress("#introBar","#introPct",()=>{showOnly("login")});
$("#skipIntro").onclick=()=>{clearInterval(introTimer);showOnly("login")};
$("#loginBtn").onclick=()=>{
 if(locked)return;
 if($("#user").value==="Ninja67"&&$("#pass").value==="Glitch76"){localStorage.setItem("ng_session","1");showOnly("finger")}
 else{failed++;$("#loginMsg").textContent=failed>=5?"ACCESS LOCKED FOR 30 SECONDS":"INVALID CREDENTIALS";if(failed>=5){locked=true;setTimeout(()=>{locked=false;failed=0;$("#loginMsg").textContent=""},30000)}}
};
$("#fingerBtn").onclick=()=>{
 $("#fingerBtn").disabled=true;$("#fingerText").textContent="SCANNING...";
 progress("#fingerBar",null,()=>{showOnly("loading");startCore()})
};
function startCore(){let t=progress("#loadBar","#loadPct",()=>openApp());$("#skipLoad").onclick=()=>{clearInterval(t);openApp()}}
function openApp(){showOnly(null);$("#app").classList.remove("hidden");render(page)}
function toast(s){$("#toast").textContent=s;$("#toast").classList.add("toast-show");setTimeout(()=>$("#toast").classList.remove("toast-show"),1800)}
function render(p){
 page=p; qsa(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===p));
 const title={home:"COMMAND CENTER",tools:"TOOLS & UTILITIES",labs:"SIMULATION LABS",activity:"ACTIVITY CENTER",settings:"SYSTEM SETTINGS"}[p];
 $("#pageTitle").textContent=title;
 let list=modules[p]||modules.home;
 $("#panelArea").innerHTML=`<div class="section-head"><div><h2>${title}</h2><p>Local interface modules / safe visual environment</p></div><span class="eyebrow">${String(list.length).padStart(2,"0")} MODULES</span></div>
 <div class="module-grid">${list.map((m,i)=>`<article class="module"><span class="tag">${m[3]}</span><div class="ico">${m[1]}</div><h3>${m[2]}</h3><p>${m[4]}</p><button data-mod="${m[0]}">OPEN</button></article>`).join("")}</div>
 <div class="activity-panel"><div class="section-head"><div><h2>LIVE ACTIVITY</h2><p>Generated locally for interface feedback</p></div></div>
 <div class="log"><i class="dot"></i><div><b>CORE</b><br><small>Interface heartbeat synchronized</small></div></div>
 <div class="log"><i class="dot"></i><div><b>MODULE</b><br><small>Visual module registry loaded successfully</small></div></div>
 <div class="log"><i class="dot"></i><div><b>SESSION</b><br><small>Operator session running locally</small></div></div></div>`;
 qsa("[data-mod]").forEach(b=>b.onclick=()=>{activity++;$("#activityCount").textContent=String(activity).padStart(3,"0");toast(b.dataset.mod+" • LOCAL SIMULATION READY")});
}
qsa(".bottom-nav button").forEach(b=>b.onclick=()=>render(b.dataset.page));
qsa("[data-open]").forEach(b=>b.onclick=()=>{render("labs");toast("Opening "+b.dataset.open.toUpperCase())});
$("#logout").onclick=()=>{localStorage.removeItem("ng_session");location.reload()};
if(localStorage.getItem("ng_session")==="1"){openApp()}