const anon_username = "anon";
const anon_display_name = "Anonymous Coward";

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const groupedEvents = new Map();

async function comments_init(thread) {
  groupedEvents[thread] = [];
  const relay = await Relay("wss://relay.damus.io");
  const now = new Date().getTime() / 1000;
  const model = { events: [], profiles: {} };
  const comments_id = uuidv4();
  const profiles_id = uuidv4();
 

  model.pool = relay;
  model.el = document.querySelector("#comments");

  relay.subscribe(comments_id, { kinds: [1], "#e": [thread] });

  relay.event = (sub_id, ev) => {
    // const eTagsCount = data.tags.filter(tag => tag.includes('e')).length;
    if (sub_id === comments_id) {
      if (ev.content !== "")
        if (
          findParentEvent(ev) ===
            "04ca02a37b216047eb1501bdd62f9c1a568f0c84940fc9f361cb299e74ade325" ||
          findParentEvent(ev) ===
            "503941a9939a4337d9aef7b92323c353441cb5ebe79f13fed77aeac615116354"
        ) {
          insert_event_sorted(model.events, ev);
          // console.log(findParentEvent(ev),ev,'aaa///')
          // console.log(groupedEvents,'a')
          // console.log(groupedEvents[thread.id],'b',thread)
          if (groupedEvents[findParentEvent(ev)] === undefined) {
            groupedEvents[findParentEvent(ev)] = [];
          }
          insert_event_sorted(groupedEvents[findParentEvent(ev)], ev);
        } else {
          parentEvent = findParentEvent(ev);
          if (groupedEvents[parentEvent] === undefined) {
            groupedEvents[parentEvent] = [];
          }

          insert_event_sorted(groupedEvents[parentEvent], ev);
        }

      if (model.realtime) render_home_view(model);
    } else if (sub_id === profiles_id) {
      try {
        model.profiles[ev.pubkey] = JSON.parse(ev.content);
      } catch {
        console.log("failed to parse", ev.content);
      }
    }
  };

  relay.eose = async (sub_id) => {
    if (sub_id === comments_id) {
      handle_comments_loaded(profiles_id, model);
    } else if (sub_id === profiles_id) {
      handle_profiles_loaded(profiles_id, model);
    }
  };

  return relay;
}

function handle_profiles_loaded(profiles_id, model) {
  // stop asking for profiles
  model.pool.unsubscribe(profiles_id);
  model.realtime = true;
  render_home_view(model);
}

// load profiles after comment notes are loaded


function find_all_pubkeys(evs){
  s= new Set()
  for (ev of evs){
    if (groupedEvents[ev.id] === undefined) {
      s.add(ev.pubkey)
    } else
      {
        s.add(ev.pubkey)
        s = new Set([...s,...find_all_pubkeys(groupedEvents[ev.id])])
  }
}
return s
}

function handle_comments_loaded(profiles_id, model) {
  const pubkeys = find_all_pubkeys(model.events)
  const authors = Array.from(pubkeys);
  model.pool.subscribe(profiles_id, { kinds: [0], authors: authors });
}

function render_home_view(model) {
  model.el.innerHTML = render_events(model);
}

function render_events(model) {
  const render = render_event.bind(null, model);
  return model.events.map(render).join("\n");
}

function render_event(model, ev, display = true) {
  // first, if ev.id is  in groupedEvents'key, render the parent event
  // then, render the child events, set childevent's invisible to true
  // if click on the "show replies" button, set the child events' invisible to false
  const profile = model.profiles[ev.pubkey] || {
    name: anon_username,
    display_name: anon_display_name,
  };
  let parsed = verifyBitcoinAddress(ev);
  if (parsed) {
    fundingEvent(parsed, profile, ev);
  } else if (
    ev.created_at > 1678191250 &&
    ev.id !== "04ca02a37b216047eb1501bdd62f9c1a568f0c84940fc9f361cb299e74ade325"
  ) {
    const delta = time_delta(new Date().getTime(), ev.created_at * 1000);
    if (ev.id in groupedEvents && groupedEvents[ev.id] != "") {
      console.log("1");
      let childEvents = groupedEvents[ev.id];

      if (display) {
        let childelements = [];
        childEvents.forEach(function (item, index) {
          a = render_event(model, item, false);
          childelements.push(a);
        });

        return (
          `
                <div  style="border-left:3px solid #fa7a0b;">
                <div class="comment">
                    <div class="info">
                        ${get_user_div(ev, profile)}

                        <span>${delta}</span>
                    </div>
                    <img class="pfp" src="${get_picture(ev.pubkey, profile)}">
                    <p>
                    ${format_content(ev.content)}
                    </p>
                </div>
                ` +
          `\n` +
          childelements.join("/n")
        );
      } else {
        let childelements = [];
        childEvents.forEach(function (item, index) {
          a = render_event(model, item, false);
          childelements.push(a);
        });
        return (
          `
                <div class="comment hide">
                    <div class="info">
                        ${get_user_div(ev, profile)}

                        <span>${delta}</span>
                    </div>
                    <img class="pfp" src="${get_picture(ev.pubkey, profile)}">
                    <p>
                    ${format_content(ev.content)}
                    </p>

                </div>
                ` +
          `\n` +
          childelements.join("/n")
        );
      }
    } else {
      if (display) {
        return `
                <div class="comment">
                    <div class="info">
                        ${get_user_div(ev, profile)}
                        <span>${delta}</span>
                    </div>
                    <img class="pfp" src="${get_picture(ev.pubkey, profile)}">
                    <p>
                    ${format_content(ev.content)}
                    </p>
                </div>
                `;
      } else {
        return `
                <div class="comment hide">
                    <div class="info">
                        ${get_user_div(ev, profile)}
                        <span>${delta}</span>
                    </div>
                    <img class="pfp" src="${get_picture(ev.pubkey, profile)}">
                    <p>
                    ${format_content(ev.content)}
                    </p>
                </div>
                </div>
                `;
      }
    }
  }
}

function get_user_div(ev, profile) {
  let snort = "https://nostr.band/" + window.NostrTools.nip19.npubEncode(ev.pubkey)
  return `
    <div classe="user">
    <div class="display-name">
    
    <a href=${snort}>
        ${
          sanitize(
            get_display_name(ev.pubkey, profile) ||
              get_username(ev.pubkey, profile)
          ) || "Anonymous Coward"
        }
        </a>
    </div>
    <div class="username">${(
      "@" +
        sanitize(
          get_username(ev.pubkey, profile) ||
            get_display_name(ev.pubkey, profile)
        ) || anon_username
    ).toLowerCase()}
  </div>
  </div>
      `;
}

var funders = -1;
var addresses = new Map();
var totalFunding = 0;

function fundingEvent(parsed, profile, ev) {
  try {
    if (
      verifyBitcoinSignedEvent(
        window.NostrTools.nip19.npubEncode(ev.pubkey),
        parsed[0],
        parsed[1]
      )
    ) {
      if (!addresses.get(parsed[0])) {
        addresses.set(parsed[0], true);
        let t = document.getElementById("funders");
        let tr = document.createElement("tr");
        tr.id = "table_row_" + ev.id;
        tr.appendChild(makeTd(funders + 1));
        let name =
          sanitize(
            get_username(ev.pubkey, profile) ||
              get_display_name(ev.pubkey, profile)
          ).toLowerCase() || anon_username;
        let link = document.createElement("a");
        link.href =
          "https://snort.social/e/" + window.NostrTools.nip19.noteEncode(ev.id);
        link.innerText = name;
        link.title =
          get_display_name(ev.pubkey, profile) ||
          get_username(ev.pubkey, profile) ||
          anon_display_name;
        let name_proof = makeTd();
        name_proof.appendChild(link);
        tr.appendChild(name_proof);
        let amountRow = makeTd("Fetching amount....");
        getBalance(parsed[0]).then((result) => {
          if (result) {
            amountRow.innerText = result.toLocaleString() + " sats";
            totalFunding += result;
            if (document.getElementById("total_funding_row")) {
              document.getElementById("total_funding_row").remove();
            }
            let tr_total = document.createElement("tr");
            tr_total.id = "total_funding_row";
            tr_total.append(
              makeTd(),
              makeTd("TOTAL"),
              makeTd(totalFunding.toLocaleString() + " sats")
            );
            t.appendChild(tr_total);
          }
          if (!result) {
            if (result === 0) {
              document.getElementById("table_row_" + ev.id).remove();
              funders--;
            }
          }
        });
        tr.appendChild(amountRow);
        if (funders < 0) {
          t.replaceChildren(tr);
        } else {
          t.appendChild(tr);
        }
        funders++;
      }
    }
  } catch (e) {}
}

function makeTd(inner) {
  theadh = document.createElement("td");
  try {
    theadh.appendChild(inner);
  } catch (e) {
    if (typeof inner != "undefined") {
      theadh.innerText = inner;
    }
  }
  return theadh;
}

function convert_quote_blocks(content) {
  const split = content.split("\n");
  let blockin = false;
  return split.reduce((str, line) => {
    if (line !== "" && line[0] === ">") {
      if (!blockin) {
        str += "<span class='quote'>";
        blockin = true;
      }
      str += sanitize(line.slice(1));
    } else {
      if (blockin) {
        blockin = false;
        str += "</span>";
      }
      str += sanitize(line);
    }
    return str + "<br/>";
  }, "");
}

function format_content(content) {
  return convert_quote_blocks(content);
}

function sanitize(content) {
  if (!content) return "";
  return content.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function get_picture(pk, profile) {
  return sanitize(profile.picture) || "https://robohash.org/" + pk;
}

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

function get_any_name(pk, profile = {}) {
  const username = get_username(pk, profile);
  const display_name = get_display_name(pk, profile);
  return username || display_name;
}

function time_delta(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
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
