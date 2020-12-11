const tabs = document.getElementById("tabs");
const lis = tabs.children[0].children
const tabContents = document.getElementsByClassName("tab-contents")

function resetIsActive() {
    Array.from(lis).forEach(li => li.classList.remove("is-active"))
    Array.from(tabContents).forEach(li => li.classList.add("is-hidden"))
}

function switchTo(what) {
    resetIsActive()
    const li = Array.from(lis).filter(a => a.children[0].innerHTML == what)[0]
    li.classList.add("is-active")
    document.getElementsByClassName(li.children[0].innerHTML + "-tabcontents")[0].classList.remove("is-hidden")
}

switchTo("Logs")