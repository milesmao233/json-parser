const log = console.log.bind(console)

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

// 1
// 补全函数
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
    let tokens1 = ['miles', ',', 'mao', ',', 'milesmao', ']']
    let json1 = parsedList(tokens1)
    let expected1 = ['miles', 'mao', 'milesmao']
    ensure(arrayEquals(json1, expected1), 'test parsed list 1')

    let tokens2 = ['miles', ',', 'mao', ',', 175, ']']
    let json2 = parsedList(tokens2)
    let expected2 = ['miles', 'mao', 175]
    ensure(arrayEquals(json2, expected2), 'test parsed list 2')
}

const __main = () => {
    testParsedList()
}

__main()