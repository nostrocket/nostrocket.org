


function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


async function comments_init(thread)
{
  const relay = await Relay("wss://universe.nostrich.land/?lang=zh")
  const now = (new Date().getTime()) / 1000
  const model = {events: [], profiles: {},treeEvents:[]}
  const comments_id = uuidv4()
  const profiles_id = uuidv4()

  model.pool = relay
  model.el = document.querySelector("#comments")

  relay.subscribe(comments_id, {kinds: [1], "#e": [thread]})

  relay.event = (sub_id, ev) => {
      if (sub_id === comments_id) {
          if (ev.content !== "")
              insert_event_sorted(model.events, ev)
          if (model.realtime)
              render_home_view(model)
      } else if (sub_id === profiles_id) {
          try {
              model.profiles[ev.pubkey] = JSON.parse(ev.content)
          } catch {
              console.log("failed to parse", ev.content)
          }
      }
  }

// model.events.forEach((item) => {
//   console.log(item)
// const node = {
//   eventid:item.id,
//   children:[]
// };
// console.log(node,'b')
// const parent = findParentEvent(item).id
// addNode(node, parent);
// });

// model.events = data



  relay.eose = async (sub_id) => {
     
    const data = []
    const groupedEvents = {
      eventid:thread,
      children:[],
      ev:{}
      
    }
    function addNode(node, parentNodeid) {
      if (parentNodeid) {
        const parent = findNode(parentNodeid, data);
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
    
      } else {
        data.push(node);
      }
    }
    // Function to find a node by evid
    function findNode(eventid, nodes) {
      for (const node of nodes) {
        if (node.eventid === eventid) {
          return node;
        }
        if (node.children) {
          const found = findNode(eventid, node.children);
          if (found) {
            return found;
          }
        }
      }
      return null;
    }
    
    data.push(groupedEvents)
    
    for (const item of model.events) {
        const node = {
        eventid:item.id,
        children:[],
        ev:item
      };   
      const parent = findParentEvent(item)
      addNode(node, parent);
    }
    model.treeEvents = data
  //   console.log(data,'tree data here')
    if (sub_id === comments_id) {
      handle_comments_loaded(profiles_id, model)
  } else if (sub_id === profiles_id) {
      handle_profiles_loaded(profiles_id, model)
      model.events.forEach((item) => {
          // console.log('wtf',item.pubkey,model.profiles)
          const profile = model.profiles[item.pubkey] || {
              name: "anon",
              display_name: "Anonymous",
          }
  joinOrderEvent(true, profile,item);})
  }

  }

  return relay
}

function handle_profiles_loaded(profiles_id, model) {
  // stop asking for profiles
  model.pool.unsubscribe(profiles_id)
  model.realtime = true
  render_home_view(model)
}

// load profiles after comment notes are loaded
function handle_comments_loaded(profiles_id, model)
{
  const pubkeys = model.events.reduce((s, ev) => {
      s.add(ev.pubkey)
      return s
  }, new Set())
  const authors = Array.from(pubkeys)

  // load profiles
  model.pool.subscribe(profiles_id, {kinds: [0], authors: authors})
}

function render_home_view(model) {
  render_events(model)

  const delta = time_delta(new Date().getTime(), model.treeEvents[0].ev.created_at*1000)
  model.el.appendChild(createTree(model.treeEvents[0], 0,model.treeEvents[0].ev,delta,model))
  // console.log(model.el)

}


function createTree(data, depth = 0,ev,delta,model) {
  // joinOrderEvent(true, profile, ev);
  const profile = model.profiles[data.ev.pubkey] || {
      name: "anon",
      display_name: "Anonymous",
  }
  const comment = document.createElement('div');
  comment.classList.add('comment');
  if (    ev.created_at > 1678191250 &&
      ev.id !== "04ca02a37b216047eb1501bdd62f9c1a568f0c84940fc9f361cb299e74ade325"){
      const commenthead = document.createElement('div');
      commenthead.classList.add('commenthead');
      comment.appendChild(commenthead);

      const info = document.createElement('div');
      info.classList.add('info');
      const username = document.createElement('div');
      username.classList.add('username');
      ev = data.ev

      const pfp = document.createElement('img');
      pfp.classList.add('pfp');
      pfp.setAttribute('src', get_picture(ev.pubkey, profile));
      commenthead.appendChild(pfp);
      
      username.textContent = sanitize(get_name(ev.pubkey, profile));
      info.appendChild(username);
      const deltaSpan = document.createElement('span');
      deltaSpan.textContent = delta;
      info.appendChild(deltaSpan);
      commenthead.appendChild(info);
      

      
      const content = document.createElement('p');
      try {
      content.innerHTML = format_content(ev.content);
      } catch (e) {content.textContent = ""; }
      
      comment.appendChild(content);
      }

  
  comment.style.marginLeft = `${depth * 5}px`; // increase indentation based on depth

  if (data.children && data.children != []) {
    const subtree = document.createElement('div');
    let divname = (depth==0)?'comment':'subtree'
    subtree.classList.add(divname);
  //   subtree.style.marginLeft = `${depth * 10}px`;
    data.children.forEach(child => {
      if (verifyBitcoinAddress(child.ev)) {
          return;
      }
      
      
      let delta = time_delta(new Date().getTime(), child.ev.created_at*1000)
      subtree.appendChild(createTree(child, depth + 1,child.ev,delta,model));
      // data, depth = 0,ev,delta,model
      // increase depth for child nodes
    });
    if (subtree.hasChildNodes()) {
      comment.appendChild(subtree);
  }
    
  //   console.log(comment)
  }
  
  return comment;
}

function render_events(model) {

  const render = render_event.bind(null, model)
  return model.events.map(render).join("\n")
}

function render_event(model, ev) {
  const profile = model.profiles[ev.pubkey] || {
      name: "anon",
      display_name: "Anonymous",
  }
  let parsed = false
  if(parsed) {
      // fundingEvent(parsed, profile, ev)
  } else if (ev.created_at > 1678191250 && ev.pubkey !== "d91191e30e00444b942c0e82cad470b32af171764c2275bee0bd99377efd4075"){
      
      const delta = time_delta(new Date().getTime(), ev.created_at*1000)
      // console.log(model.treeEvents[0],"im the three")
      return createTree(model.treeEvents[0], 0,ev,delta,model)
      // data, depth = 0,ev,delta,model
//       return `
// <div class="comment">
// 	<div class="info">
// 	    <div class="username">${sanitize(get_name(ev.pubkey, profile))}</div>
// 		<span>${delta}</span>
// 	</div>
// 	<img class="pfp" src="${get_picture(ev.pubkey, profile)}">
// 	<p>
// 	${format_content(ev.content)}
// 	</p>
// </div>
// `
  }
}

var funders = -1
var addresses = new Map;
var totalFunding = 0
var npubList=[]
function get_username(pk, profile = {}) {
  const username = profile.name;
  return username;
}
function get_display_name(pk, profile = {}) {
const display_name = profile.display_name || profile.user;
// console.log(profile,"aaaaaaaaaaaaaaaaaaaaaaa");
// console.log(`display_name: ${display_name}`);
return display_name;
}

function fundingEvent(parsed, profile, ev) {
  try {
      if(verifyBitcoinSignedEvent(window.NostrTools.nip19.npubEncode(ev.pubkey), parsed[0], parsed[1])) {
          if (!addresses.get(parsed[0])) {
              addresses.set(parsed[0], true)
              let t = document.getElementById("funders")
              let tr = document.createElement("tr")
              tr.id = "table_row_"+ev.id
              tr.appendChild(makeTd(funders+1))
              let name = sanitize(get_name(ev.pubkey, profile))
              let link = document.createElement("a")
              link.href = "https://snort.social/e/" + window.NostrTools.nip19.noteEncode(ev.id)
              link.innerText = name
              let name_proof = makeTd()
              name_proof.appendChild(link)
              tr.appendChild(name_proof)
              let amountRow = makeTd("Fetching amount....")
              getBalance(parsed[0]).then(result => {
                  if(result) {
                      amountRow.innerText = result.toLocaleString()+ " sats";
                      totalFunding += result
                      if (document.getElementById("total_funding_row")) {
                          document.getElementById("total_funding_row").remove()
                      }
                      let tr_total = document.createElement("tr")
                      tr_total.id = "total_funding_row"
                      tr_total.append(makeTd(), makeTd("TOTAL"), makeTd(totalFunding.toLocaleString()+ " sats"))
                      t.appendChild(tr_total)
                  }
                  if (!result) {
                      if (result === 0) {
                          document.getElementById("table_row_"+ev.id).remove()
                          funders--
                      }
                  }
              })
              tr.appendChild(amountRow)
              if (funders < 0) {
                  t.replaceChildren(tr)

              } else {
                  t.appendChild(tr)
              }
              funders++
          }
      }
  } catch (e) {}
}

function makeTd(inner) {
  theadh = document.createElement("td")
  try {theadh.appendChild(inner)} catch (e) {
      if (typeof inner != "undefined") {
          theadh.innerText = inner
      }
  }
  return theadh
}

function convert_quote_blocks(content)
{
  const split = content.split("\n")
  let blockin = false
  return split.reduce((str, line) => {
      if (line !== "" && line[0] === '>') {
          if (!blockin) {
              str += "<span class='quote'>"
              blockin = true
          }
          str += sanitize(line.slice(1))
      } else {
          if (blockin) {
              blockin = false
              str += "</span>"
          }
          str += sanitize(line)
      }
      return str + "<br/>"
  }, "")
}

function format_content(content)
{
  return convert_quote_blocks(content)
}

function sanitize(content)
{
  if (!content)
      return ""
  return content.replaceAll("<","&lt;").replaceAll(">","&gt;")
}

function get_picture(pk, profile)
{
  return sanitize(profile.picture) || "https://robohash.org/" + pk
}

function get_name(pk, profile={})
{
  const display_name = profile.display_name || profile.user
  const username = profile.name || "anon"
  return  display_name || username
}

function time_delta(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
      return Math.round(elapsed/1000) + ' seconds ago';
  }

  else if (elapsed < msPerHour) {
      return Math.round(elapsed/msPerMinute) + ' minutes ago';
  }

  else if (elapsed < msPerDay ) {
      return Math.round(elapsed/msPerHour ) + ' hours ago';
  }

  else if (elapsed < msPerMonth) {
      return Math.round(elapsed/msPerDay) + ' days ago';
  }

  else if (elapsed < msPerYear) {
      return Math.round(elapsed/msPerMonth) + ' months ago';
  }

  else {
      return Math.round(elapsed/msPerYear ) + ' years ago';
  }
}
function findParentEvent(ev) {
const dataWithReply = ev.tags.find(
  (tag) => tag[0] === "e" && tag[2] === "reply"
);
if (dataWithReply === undefined) {
  let lastE = null;
  for (let i = ev.tags.length - 1; i >= 0; i--) {
    const tag = ev.tags[i];
    if (tag.includes("e")) {
      lastE = tag;
      break;
    }
  }
  return lastE[1];
} else {
  return dataWithReply[1];
}
}
function joinOrderEvent(parsed, profile, ev) {
  // console.log(profile,'profileinsidejoinorder')
  try {
        if (npubList.indexOf(ev.pubkey)!=-1){

          return
        } 
        else{
        npubList.push(ev.pubkey)
        let t = document.getElementById("funders");
        let tr = document.createElement("tr");
        tr.id = "table_row_" + ev.id;
        tr.appendChild(makeTd(funders + 1));
        let name =
          sanitize(
            get_username(ev.pubkey, profile) ||
              get_display_name(ev.pubkey, profile)
          ).toLowerCase() || anon_username;
          console.log(name,'name')
        let link = document.createElement("a");
        link.href =
          "https://nostr.band/?q=" + window.NostrTools.nip19.npubEncode(ev.pubkey);
        link.innerText = name;
        
        link.title =
          get_display_name(ev.pubkey, profile) ||
          get_username(ev.pubkey, profile) ||
          anon_display_name;
        let name_proof = makeTd();
        name_proof.appendChild(link);
        tr.appendChild(name_proof);

        if (funders < 0) {
          t.replaceChildren(tr);
        } else {
          t.appendChild(tr);
        }
        funders++;
      }
    }
   catch (e) {console.log(e)
  console.log('catch list error')}
}