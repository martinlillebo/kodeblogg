//  **************************************************** alle funksjoner
const fuglHoppOppover = () => {
  fuglHøyde -= 25
  fugl.style.top = fuglHøyde + "px"
}

function fuglFalleNedover() {
  fuglHøyde += tyngdekraft
  fugl.style.top = fuglHøyde + "px"
}

function lagBakke() {
  let bakkeVenstre = -500;

  const bakke = document.createElement("div")
  bakke.classList.add("bakke")
  spillContainer.appendChild(bakke)

  function bevegBakkeMotHøyre() {
    if (spillFerdig) {
      clearInterval(kjørBakke)
    }
    if (bakkeVenstre > 500) {
      clearInterval(kjørBakke)
      spillContainer.removeChild(bakke)
    }
    bakkeVenstre += 2;
    bakke.style.right = bakkeVenstre + "px";
  }
  const kjørBakke = setInterval(bevegBakkeMotHøyre, 10);
  if (!spillFerdig) setTimeout(lagBakke, 4000)
}

function lagStolper() {
  const stolpe = document.createElement("div")
  const stolpeOver = document.createElement("div")

  let stolpeVenstre = 500;
  let stolpeHøyde = 200;
  let åpning = 100;
  stolpeHøyde += Math.random() * 120
  let stolpeHøydeOver = stolpeHøyde - 250 - åpning;
  let passert = false;

  stolpe.classList.add("stolpe")
  stolpeOver.classList.add("stolpeOver")
  stolpe.style.left = stolpeVenstre + "px"
  stolpeOver.style.left = stolpeVenstre + "px"
  stolpe.style.top = stolpeHøyde + "px"
  stolpeOver.style.top = stolpeHøydeOver + "px"
  if (!spillFerdig) {
    spillContainer.appendChild(stolpe)
    spillContainer.appendChild(stolpeOver)
  }

  function stolpeBevegeMotHøyre() {
    if (!spillFerdig) {
      if ((stolpeVenstre < fuglVenstre) && passert === false) {
        stolperPassert += 1;
        ticker.innerHTML = stolperPassert;
        passert = true;
      }
      if (stolpeVenstre < -55) {
        clearInterval(kjørStolpe)
        spillContainer.removeChild(stolpe)
        spillContainer.removeChild(stolpeOver)
      }
      stolpeVenstre -= 2
      stolpe.style.left = stolpeVenstre + "px"
      stolpeOver.style.left = stolpeVenstre + "px"
    }
    if (
      fuglHøyde >= 355 || // trigger hvis fuglen krasjer i bakken
      fuglHøyde < 0 ||    // trigger hvis fuglen krasjer i taket 
      fuglHøyde + 45 > stolpeHøyde && stolpeVenstre < (fuglVenstre + 40) && (fuglVenstre - stolpeVenstre < 39) ||
      // første delbetingelse trigger hvis fuglen er nedenfor toppen på nedre rør (f.eks. krasjer i veggen),
      // andre delbetingelse trigger så lenge fuglen ikke er *forbi* nedre rør (f.eks. krasjen oppå toppen av rør), 
      // tredje delbetingelse trigger så lenge fuglen ikke er helt forbi røret, sånn at den kan få synke ned på andre siden av røret.

      // Følgende tre linjer er betingelser som trigger hvis fuglen krasjer i øvre rør.
      stolpeVenstre < (fuglVenstre + 40) && fuglHøyde < (stolpeHøydeOver + 250) && (fuglVenstre - stolpeVenstre < 39)
    ) {
      clearInterval(kjørStolpe) // hindrer stolpeBevegeMotHøyre() fra å bli kjørt i en uendelig loop
      gameOver()
    }
  }
  let kjørStolpe = setInterval(stolpeBevegeMotHøyre, 10)
  if (!spillFerdig) setTimeout(lagStolper, 2000)
}

function gameOver() {
  spillFerdig = true
  clearInterval(nedoverIntervall)
  document.removeEventListener("keyup", fuglHoppOppover)
  document.removeEventListener("click", fuglHoppOppover)
  // lager "nytt spill?"-skjermen
  spillContainer.style.opacity = 0.75;
  const nyttSpillKnapp = document.createElement("button")
  nyttSpillKnapp.innerHTML = "Spille igjen?"
  nyttSpillKnapp.classList.add("nyttSpillKnapp")
  nyttSpillKnapp.setAttribute("onclick", "location.href = 'http://kodeblogg.herokuapp.com/flappybird'") // denne kan nok bli skrevet litt mer elegant enn dette. 
  spillContainer.appendChild(nyttSpillKnapp)
}

//  **************************************************** variablerdeklarering, eventlyttere og funksjonsinvokering 

// Pynter på headeren
document.querySelector("#header-lenke").innerHTML = "FlappyBird"

// deklarerer variabler som velger spillobjektene
const spillContainer = document.querySelector(".spill-container")
const fugl = document.querySelector(".fugl")

let fuglHøyde = 180;
fugl.style.top = fuglHøyde + "px"; // setter starthøyden
let fuglVenstre = 160;
fugl.style.left = fuglVenstre + "px";
const tyngdekraft = 2;
let spillFerdig = false
let stolperPassert = 0;
const ticker = document.querySelector(".ticker-tall")

lagBakke()
lagStolper() // oppretter en stolpe og starter et intervall som skyver den mot venstre.

document.addEventListener("keyup", fuglHoppOppover)
document.addEventListener("click", fuglHoppOppover)


let nedoverIntervall = setInterval(fuglFalleNedover, 20)
