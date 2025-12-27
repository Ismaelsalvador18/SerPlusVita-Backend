
export function reformatearDate(object, nameDate) {
    return {
        ...object,
        [nameDate]: object[nameDate]?.toISOString().split("T")[0]
    }
}

export function normalizarBooleans (objeto) {
    for (const clave in objeto) {
        if (objeto[clave] === "true") {
            objeto[clave] = true;
        } else if (objeto[clave] === "false") {
            objeto[clave] = false;
        } else {
            throw new Error(`El parametro ${clave} debe de ser 'true' o 'false'.`);
        }
    }

    return objeto;
};