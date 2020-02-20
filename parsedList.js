/**
 * 
 * @param {*} tokens 是一个包含部分 JSON array tokens 的数组
 * ['miles', ',', 'mao', ',', 'milesmao', ']']  => ['miles', 'mao', 'milesmao']
 */

const parsedList = (tokens) => {
    // tokens 是一个包含部分 JSON array tokens 的数组
    // 解析 tokens, 返回解析后的 JSON 值
    tokens = tokens.slice(1)
    let symbolsArr = [',', ']']
    let result = []
    for (let i = 0; i < tokens.length; i++) {
        if (!symbolsArr.includes(tokens[i])) {
            result.push(tokens[i])
        }
    }
    return result
}

module.exports = parsedList