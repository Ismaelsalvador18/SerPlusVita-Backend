
export function reformatearDate(object, nameDate) {
    return {
        ...object,
        [nameDate]: object[nameDate]?.toISOString().split("T")[0]
    }
}