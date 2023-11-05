const lineOrderCookie = "crankin-line-order";

var lineOrderElement = document.getElementById("lineOrder");
var outElement = document.getElementById("out");
var linesElement = document.getElementById("lines");
var mailToElement = document.getElementById("mailto");

var savedLineOrder = getCookie(lineOrderCookie);
lineOrderElement.value = savedLineOrder || "";

lineOrderElement.addEventListener("input", () => {
    setCookie(lineOrderCookie, lineOrderElement.value);
});

linesElement.addEventListener("input", () => {
    let lines = linesElement.value.split("\n").map((e) => { return e.trim(" ") });
    let lineOrder = lineOrderElement.value.split(",").map((e) => { return e.trim(" ") });
    let rearrangedLines = [];
    lineOrder.forEach(i => { rearrangedLines.push(lines[i - 1] || "") });
    outElement.innerText = rearrangedLines.join("\n");
    mailToElement.href = mailTo("", "", rearrangedLines.join("\n"));
});

function setCookie(name, value) {
    document.cookie = name + "=" + (value || "");
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for(var i=0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0)==' ') cookie = cookie.substring(1,cookie.length);
        if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length,cookie.length);
    }
    return null;
}

function mailTo(to, subject, body) {
    return "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}