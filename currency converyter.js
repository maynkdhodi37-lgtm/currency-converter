
const API_URL = "https://v6.exchangerate-api.com/v6/c86ec2676d910707b7a3d596/latest";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("button");

const frocurr = document.querySelector(".from select");

const toccurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

const swapbtn = document.querySelector("#swapbtn")

for (let select of dropdowns) {

    for (currCode in countryList) {

        let newoption = document.createElement("option");

        newoption.innerText = currCode;

        newoption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newoption.selected = true;
        }

        else if (select.name === "to" && currCode === "INR") {
            newoption.selected = true;
        }

        select.append(newoption);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {

    let currcode = element.value;

    let countrycode = countryList[currcode];

    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");

    img.src = newSrc;
};

const updateexchangerate = async () => {

    let amount = document.querySelector(".amount input");

    let amountval = amount.value;

    if (amountval === "" || amountval < 1) {

        amountval = 1;

        amount.value = "1";
    }

    const fromCurr = frocurr.value;

    const toCurr = toccurr.value;

    const finalURL = `${API_URL}/${fromCurr}`;

    let response = await fetch(finalURL);

    let data = await response.json();

    let rate = data.conversion_rates[toCurr];

    let finalamount = amountval * rate;

    msg.innerText =
        `${amountval} ${fromCurr} = ${finalamount.toFixed(2)} ${toCurr}`;
};

btn.addEventListener("click", (evt) => {

    evt.preventDefault();

    updateexchangerate();
});


swapbtn.addEventListener("click", () => {
    let temp = frocurr.value;

    frocurr.value = toccurr.value;
    toccurr.value = temp

    updateflag(frocurr);
    updateflag(toccurr);

    updateexchangerate();
});

window.addEventListener("load", () => {
    updateexchangerate();
});

