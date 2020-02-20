const processString = (s) => {
    let result = ''
    let i = 0
    while (s[i] !== '"') {
        if (s[i] === '\\'){
            let letter = s[i] + s[i + 1]
            result += letter
            i += 2
        } else {
            result += s[i]
            i++
        }
    }


    return {
        property: result,
        index: i + 1
    }
}

const processNumber = (s, symbols) => {
    let result = ''
    let i = 0
    while (!symbols.includes(s[i])) {
        result += s[i]
        i++
    }

    return {
        property: result,
        index: i - 1
    }
}

const jsonTokens = (s) => {
    let result = []
    let symbols = ['{', '}', '[', ']', ':', ',']
    let i = 0
    while (i < s.length) {
        if (symbols.includes(s[i])) {
            result.push(s[i])
        }
        // string 处理
        else if (s[i] === '"') {
            let d = processString(s.slice(i + 1))
            let property = d.property
            let index = d.index
            result.push(property)
            i = i + index

        }
        // 数字处理
        else if (/[0-9]/.test(s[i])) {
            let d = processNumber(s.slice(i), symbols)
            let property = d.property
            if (s[i - 1] === '-') {
                property = '-' + d.property
            }
            property = Number(property)
            let index = d.index
            result.push(property)
            i = i + index
        }
        // 布尔值和Null处理
        else if (s[i] === 't') {
            if (s.slice(i, i + 4) === 'true') {
                result.push('true')
            }
        } else if (s[i] === 'f') {
            if (s.slice(i, i + 5) === 'false') {
                result.push('false')
            }
        } else if (s[i] === 'n') {
            if (s.slice(i, i + 4) === 'null') {
                result.push('null')
            }
        }

        i++
    }

    return result
}

module.exports = jsonTokens