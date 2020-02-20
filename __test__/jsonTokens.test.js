const log = console.log.bind(console)

// ensure 接受两个参数
// condition 是 bool, 如果为 false, 则输出 message
// 否则, 不做任何处理
const ensure = (condition, message) => {
    // 在条件不成立的时候, 输出 message
    if (!condition) {
        log('*** 测试失败:', message)
    }
}


const arrayEquals = function(a, b) {
    if (a.length === b.length) {
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

const numberElement = (s) => {
    // s 是一个以数字开头的字符串
    // 解析 s, 返回数值部分对应的字符串
    // 提示, 遍历 s, 找到第一个不是字符串的位置, 直接返回
    // 只需要考虑正整数的情况
    const regex = /\D/g
    let index = s.search(regex)
    let result = s.slice(0, index)
    return result
}


// 测试函数
const testNumberElement = () => {
    let s1 = `169
    }
    `
    let s2 = `169,
       "location": "hhvb"
    }
    `
    ensure(numberElement(s1) === '169', 'test number element 1')
    ensure(numberElement(s2) === '169', 'test number element 2')
}


const stringElement = (s) => {
    // s 是一个以字母开头的字符串
    // 解析 s, 返回对应的字符串
    // 提示, 遍历 s, 找到第一个不是字母的位置, 直接返回
    // 只需要考虑字母的情况, 不需要考虑 - 或者 _ 的情况, 不需要考虑转义字符的情况
    const regex = /[^a-z]/ig
    let index = s.search(regex)
    let result = s.slice(0, index)
    return result
}

// 测试函数
const testStringElement = () => {
    let s1 = `name": "mao",
       "height": 169
    }
    `
    let s2 = `hhvb"
    }
    `
    ensure(stringElement(s1) === 'name', 'test string element 1')
    ensure(stringElement(s2) === 'hhvb', 'test string element 2')
}


const symbolElement = (s) => {
    let symbols = ['{', '}', '[', ']', ':', ',']
    if (symbols.includes(s[0])) {
        return s[0]
    }
}

const jsonTokens = (s) => {
    // 把 json 字符串解析成 tokens 数组的形式
    // 提示
    // 1. 遍历字符串, 根据不同情况 push 不同元素到数组中
    // 2. 如果遇到的是 ", 按照字符串来处理
    // 3. 如果遇到的是数字, 按照数值来处理
    // 4. 如果遇到 '{', '}', '[', ']', ':', ',' 这几个字符, 直接 push 到数组中
    // 5. 如果遇到空白字符, 如换行, 空格, 缩进等, 直接跳过
    let symbols = ['{', '}', '[', ']', ':', ',']
    let result = []
    for (let i = 0; i < s.length; i++) {
        if (symbols.includes(s[i])) {
            result.push(s[i])
        } else if (s[i] === '"') {
            if (/[A-Za-z]/.test(s[i + 1])) {
                let string = stringElement(s.slice(i + 1))
                result.push(string)
            }
        } else if (/[0-9]/.test(s[i])) {
            if (/\D/.test(s[i - 1])) {
                let number = numberElement(s.slice(i))
                result.push(number)
            }
        }
    }

    return result
}

// 测试函数
const testJsonTokens = () => {
    let s1 = `
    {
       "name": "mao",
       "height": 169
    }
    `
    let expected1 = ["{", "name", ":", "mao", ",", "height", ":", "169", "}"]
    ensure(arrayEquals(jsonTokens(s1), expected1), 'test json tokens 1')

    let s2 = `
    {
        "location": ["hhvb"]
    }
    `
    let expected2 = ["{", "location", ":", "[", "hhvb", "]", "}"]
    ensure(arrayEquals(jsonTokens(s2), expected2), 'test json tokens 2')

    let s3 = `
    {
        "name": "mao",
        "height": 169,
        "location": ["hhvb"]
    }
    `
    let expected3 = ["{", "name", ":", "mao", ",", "height", ":", "169", ",", "location", ":", "[", "hhvb", "]", "}"]
    ensure(arrayEquals(jsonTokens(s3), expected3), 'test json tokens 3')
}


const __main = () => {
    // testNumberElement()
    // testStringElement()
    testJsonTokens()
}

__main()