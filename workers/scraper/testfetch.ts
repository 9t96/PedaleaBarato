async function pruebaas () {
    const testo = await fetch('https://www.canaglia.com/bicicletas');
    console.log(await testo.text());
}

pruebaas();