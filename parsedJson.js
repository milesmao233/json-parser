const parsedDict = require('./parsedDict')
const parsedList = require('./parsedList')

const recursionHelper = (arr, index) => {
    if (index === arr.length - 1) {
        return
    }

    let result = ['{']
    let i = index
    while (arr[i] !== '}') {
        if (arr[i] === '{') {
            let v = recursionHelper(arr, i + 1)
            let r = v.result
            let j = v.index
            result.push(r)
            i = j
        } else {
            result.push(arr[i])
        }

        i++
    }

    result.push('}')
    return {
        result,
        index: i
    }
}

/**
 * obj: 里的值 也变成 tokens 数组的形式
 * @param arr
 * @returns {[string]}
 */

const processTokensToDictPattern = (arr) => {
    const v = recursionHelper(arr, 1)
    return v.result
}


/**
 * 
 * @param {*} tokens  tokens 是一个包含 JSON tokens 的数组,解析 tokens, 返回解析后的 object 或者数组
 */

const parsedJson = (tokens) => {
    let result
    if (tokens[0] === '{') {
        tokens = processTokensToDictPattern(tokens)
        result = parsedDict(tokens)
    } else if (tokens[0] === '[') {
        result = parsedList(tokens)
    }

    return result
}

module.exports = parsedJson