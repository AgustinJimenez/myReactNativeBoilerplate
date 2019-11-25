export default string => {
    if (!!string && !!string.length && string.length >= 1) return string.charAt(0).toUpperCase() + string.slice(1)

    return ''
}
