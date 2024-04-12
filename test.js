const catzillaAmount = 1000;
let bitsPool = 0;

function registerFunction() {
    twitchCheerEvent += ratsAndCatzilla
}

function ratsAndCatzilla(cheer) {
    // Function only fires when bit cheer happens
    let ratSpawnAmount = 0;

    // Add to Pool?
    bitsPool += cheer

    // Spawn Rats based off bitsPool and cheer
    if (bitsPool > 0 && bitsPool <= catzillaAmount * .5) {
        ratSpawnAmount = (cheer / (catzillaAmount * .5)) * 5
    }
    else if (bitsPool > catzillaAmount * .5 && bitsPool <= catzillaAmount * .8) {
        ratSpawnAmount = (cheer / (catzillaAmount * .3)) * 5
    }
    else if (bitsPool > catzillaAmount * .8 && bitsPool <= catzillaAmount) {
        ratSpawnAmount = (cheer / (catzillaAmount * .2)) * 5
    }

    // Spawn Rats
    ratSpawnAmount = math.floor(ratSpawnAmount); // Round to nearest whole number
    ratSpawnAmount = clamp(ratSpawnAmount, 0, 5); // restrict between 0 and 5
    spawnRats(ratSpawnAmount);

    // Add to Pool?
    bitsPool += cheer

    // Check for catzilla spawn and spawn if bitsPool = catzillaAmount
    if (bitsPool >= catzillaAmount) spawnCatzilla();
}

const spawnCatzilla = () => console.log("warning! catzilla approaching")
const spawnRats = ratSpawnAmout => console.log("spawning rats")















const clamp = (num, min, max) => Math.min(Math.max(num, min), max)