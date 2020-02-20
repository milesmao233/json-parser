// 定义我们的 log 函数

const log = console.log.bind(console)

// 定义我们用于测试的函数
// ensure 接受两个参数
// condition 是 bool, 如果为 false, 则输出 message
// 否则, 不做任何处理
const ensure = (condition, message) => {
    // 在条件不成立的时候, 输出 message
    if (!condition) {
        log('*** 测试失败:', message)
    } else {
        log('+++ 测试成功')
    }
}

const arrayEquals = function(a, b) {
    if (a.length == b.length) {
        for (var i = 0; i < a.length; i++) {
            if (!(a[i] == b[i])) {
                return false
            }
        }
        return true
    } else {
        return false
    }
}


const objectEquals = (a, b) => {
    let aProps = Object.getOwnPropertyNames(a)
    let bProps = Object.getOwnPropertyNames(b)

    if (aProps.length !== bProps.length) {
        return false
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i]

        if (Array.isArray(a[propName])) {
            if (!arrayEquals(a[propName], b[propName])) {
                return false
            }
        } else {
            if (a[propName] !== b[propName]) {
                return false
            }
        }
    }

    return true
}


const parsedList = (tokens) => {
    // tokens 是一个包含部分 JSON array tokens 的数组
    // 解析 tokens, 返回解析后的 JSON 值
    let symbolsArr = [',', ']']
    let result = []
    for (let i = 0; i < tokens.length; i++) {
        if (!symbolsArr.includes(tokens[i])) {
            result.push(tokens[i])
        }
    }
    return result
}

// 测试函数
const testParsedList = () => {
    let tokens1 = ['xiao', ',', 'gua', ',', 'xiaogua', ']']
    let json1 = parsedList(tokens1)
    let expected1 = ['xiao', 'gua', 'xiaogua']
    ensure(arrayEquals(json1, expected1), 'test parsed list 1')

    let tokens2 = ['xiao', ',', 'gua', ',', 169, ']']
    let json2 = parsedList(tokens2)
    let expected2 = ['xiao', 'gua', 169]
    ensure(arrayEquals(json2, expected2), 'test parsed list 2')
}




const caculateNext = (t) => {
    // 计算 ] 的位置
    let i = 0
    while (t[i] !== ']') {
        i++
        break
    }
    let list = t.slice(1, i + 2)
    let parsedArr = parsedList(list)

    return {
        i: i,
        parsedArr
    }
}

const parsedDict = (tokens) => {
    // tokens 是一个包含部分 JSON object tokens 的数组
    // 解析 tokens, 返回解析后的 object
    let result = {}
    let i = 0
    while (tokens[i] !== '}') {
        if (tokens[i] === ':') {
            if (tokens[i + 1] === '[') {
                let arrDic = caculateNext(tokens.slice(i + 1))
                let k = tokens[i - 1]
                let v = arrDic.parsedArr
                result[k] = v
                i = i + arrDic.i
            } else {
                let k = tokens[i - 1]
                let v = tokens[i + 1]
                result[k] = v
                i = i + 1
            }
        }
        i++
    }

    log('result', result)
    return result
}


// 测试函数
const testParsedDict = () => {
    let tokens1 = ['name', ':', 'mao', '}']
    let json1 = parsedDict(tokens1)
    let expected1 = {
        name: 'mao',
    }
    // objectEquals 请自行实现, 如果没有想法, 就多在群里讨论
    ensure(objectEquals(json1, expected1), 'test parsed dict 1')

    let tokens2 = ['name', ':', 'mao', ',', 'location', ':', '[', 'hhvb', ']', '}']
    let json2 = parsedDict(tokens2)
    let expected2 = {
        name: 'mao',
        location: ['hhvb'],
    }
    ensure(objectEquals(json2, expected2), 'test parsed dict 2')
}

const __main = () => {
    // testParsedList()
    testParsedDict()
}

__main()