export const destinies = [
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Córdoba",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Almería",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Sevilla",
        code: makeid(5),
    },
    {
        destino: "Consejería de medio ambiente, sostenibilidad y economía azul",
        ciudad: "Granada",
        code: makeid(5),
    }
]

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
