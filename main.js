const jsonTokens = require('./jsonTokens')
const parsedJson = require('./parsedJson')

/**
 * 主要思路：
 *  Json --> tokens
 *
 *  tokens --> object
 */

const log = console.log.bind(console)

const ensure = (condition, message) => {
    // 在条件不成立的时候, 输出 message
    if (!condition) {
        log('*** 测试失败:', message)
    } else {
        log('+++ 测试成功')
    }
}

const arrayEquals = function(a, b) {
    if (a.length === b.length) {
        for (var i = 0; i < a.length; i++) {
            if (!(a[i] === b[i])) {
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

const parse = (s) => {
    // s 是一个 JSON 格式的字符串
    // 解析 s, 返回相应的 JSON 对象格式
    // 1. 数字需要考虑负数和小数
    // 2. 字符串需要考虑转义字符
    // 3. 考虑嵌套数组和对象
    // 4. 需要加上布尔值和 null
    let arr = jsonTokens(s)
    let json = parsedJson(arr)

    return json
}

// 测试函数
const testParse = () => {
    let s1 = String.raw`{
    "s1": "gua",
    "num1": 11,
    "num2": -20,
    "num3": 12.5
}`
    let r1 = parse(s1)
    ensure(r1.num2 === -20 && r1.num3 === 12.5, 'test parse 1')

    let s2 = String.raw`{
    "s1": "gua",
    "s2": "a\bb\fc\nd\re\tf\\g\/h\"i"
}`
    let r2 = parse(s2)
    ensure(r2.s2 === "a\bb\fc\nd\re\tf\\g\/h\"i", 'test parse 2')

    let s3 = String.raw`{
    "arr1": [1, 2, 3],
    "obj": {
        "arr2": [4, 5, 6],
        "obj2": {
            "key1": [7, 10.3]
        }
    }
}`
    let r3 = parse(s3)
    ensure(r3.obj.arr2.length === 3 && r3.obj.obj2.key1.includes(10.3), 'test parse 3')

    let s4 = String.raw`{
    "boolean": true,
    "null": null
}`
    let r4 = parse(s4)
    ensure(r4.boolean && r4.null === null, 'test parse 4')
}


const __main = () => {
    testParse()
}

__main()