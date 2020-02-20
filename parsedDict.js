const parsedList = require('./parsedList')

const caculateArr = (t) => {
    // 计算 ] 的位置
    let i = 0
    while (t[i] !== ']') {
        i++
    }
    let list
    if (t[i + 1] === '}') {
        list = t.slice(0, i + 1)
    } else if (t[i + 1] === ',') {
        list = t.slice(0, i + 2)
    }

    let parsedArr = parsedList(list)

    return {
        i: i,
        parsedArr
    }
}

const isNumber = n => Object.prototype.toString.call(n) === "[object Number]"

// let s2 =  String.raw`a\bb\fc\nd\re\tf\\g\/h\"i`
// let s3 = 'a\\bb\\fc\\nd\\re\\tf\\\\g\\/h\\"i'
// let s4 = "a\bb\fc\nd\re\tf\\g\/h\"i"
// s2 和 s3 打印出来是一样的

const processTransformString = (token) => {
    let ts = token
        .replace(/\\b/g, '\b')
        .replace(/\\f/g, '\f')
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\\\/g, '\\')
        .replace(/\\\//g, '\/')
        .replace(/\\"/g, '\"')

    return ts
}

const processBoolAndNull = (token) => {
    let dict = {
        'true': true,
        'false': false,
        'null': null
    }

    return dict[token]
}


const parsedDictRecurHelper = (tokens) => {
    // terminator

    // process current
    tokens = tokens.slice(1)
    let i = 0
    let result = {}
    while (tokens[i] !== '}') {
        if (tokens[i] === ':') {
            if (tokens[i + 1] === '[') {
                let arrDic = caculateArr(tokens.slice(i + 1))
                let k = tokens[i - 1]
                let v = arrDic.parsedArr
                result[k] = v
                i = i + arrDic.i
            } else if (!isNumber(tokens[i + 1]) && tokens[i + 1].includes('\\')) {
                let k = tokens[i - 1]
                let v = processTransformString(tokens[i + 1])
                result[k] = v
                i = i + 1
            } else if (Array.isArray(tokens[i + 1])) {
                let k = tokens[i - 1]
                let dict = parsedDictRecurHelper(tokens[i + 1])
                let v = dict
                result[k] = v
                i = i + 1
            } else if (['true', 'false', 'null'].includes(tokens[i + 1])) {
                let k = tokens[i - 1]
                let v = processBoolAndNull(tokens[i + 1])
                result[k] = v
                i = i + 1
            } else {
                let k = tokens[i - 1]
                let v = tokens[i + 1]
                result[k] = v
                i = i + 1
            }
        }
        i++
    }

    return result
}

/**
 * 
 * @param {*} tokens  是一个包含部分 JSON object tokens 的数组
 * ['name', ':', 'miles', ',', 'location', ':', '[', 'hhvb', ']', '}']
 *  => 
 * {
 *      name: 'miles',
 *      location: ['hhvb']
 * }
 * 关键 找到 : 解析它的左右
 */

const parsedDict = (tokens) => {
    // tokens 是一个包含部分 JSON object tokens 的数组
    // 解析 tokens, 返回解析后的 object
    // log('tokens', tokens)

    let result = parsedDictRecurHelper(tokens)


    return result
}


module.exports = parsedDict