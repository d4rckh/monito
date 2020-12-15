function saveTriggers() {
    const newTriggers = {}
    Array.from(document.getElementsByClassName("trigger-edit")).forEach(trigger => {
        const id = Array.from(trigger.children).filter(
            a => a.classList.contains("trigger-id-input")
        )[0].value
        const name = Array.from(trigger.children).filter(
            a => a.classList.contains("trigger-name-input")
        )[0].value
        const description = Array.from(trigger.children).filter(
            a => a.classList.contains("trigger-description-input")
        )[0].value
        const type = Array.from(trigger.children).filter(
            a => a.classList.contains("trigger-type-input")
        )[0].value
        newTriggers[id] = { name, description, type }
    })
    damntriggers = newTriggers

    const response = fetch("/api/triggers", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            code, triggers: newTriggers
        }) // body data type must match "Content-Type" header
      });    
}

function newTrigger() {
    damntriggers["Trigger" + Object.keys(damntriggers).length] = {
        name: "", description: "", type: "info"
    }
    renderTriggers(damntriggers)
}

function deleteTrigger(code) {
    delete damntriggers[code];
    renderTriggers(damntriggers)

}

function renderTriggers(triggers) {
    const div = document.getElementById("Triggers")

    div.innerHTML = "<h1 class='title'>Triggers</h1>" 

    console.log(triggers)

    Object.keys(triggers).forEach(a => {
        div.innerHTML += `
<div class="trigger-edit">
- Type: <input type="text" class="trigger-type-input input" value="${triggers[a].type}"> ID: <input type="text" class="input trigger-id-input" value="${a}"> Name: <input type="text" class="trigger-name-input input" value="${triggers[a].name}"> Description: <input type="text" class="input trigger-description-input" size="100" value="${triggers[a].description}"> 
<button class="button is-danger" onclick="deleteTrigger('${a}')">X</button><br>
</div>
        `
    })

    div.innerHTML += "<br><br><button class=\"button is-success\" onclick=\"newTrigger()\">+</button>" 

    div.innerHTML += "<br><br><button class=\"button is-danger\" onclick=\"saveTriggers()\">Save Triggers</button>" 
}