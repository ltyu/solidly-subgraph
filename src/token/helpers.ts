import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ERC20 } from '../../generated/BaseV1Factory/ERC20'
import { Token } from "../../generated/schema"

export const fetchTokenName = (tokenAddress: Address): string => {
    const contract = ERC20.bind(tokenAddress)

    return contract.try_name().value
}

export const fetchTokenSymbol = (tokenAddress: Address): string => {
    const contract = ERC20.bind(tokenAddress)

    return contract.try_symbol().value
}

export const fetchTokenDecimals = (tokenAddress: Address): BigInt => {
    const contract = ERC20.bind(tokenAddress)

    const decimalResult = contract.try_decimals()
    let decimalValue = null
    if (!decimalResult.reverted) {
        decimalValue = decimalResult.value
    }
    return BigInt.fromI32(decimalValue as i32)
}

// export const fetchPair = () => {

// }

// Create, populate, and save a token
export const createToken = (tokenAddress: Address): Token => {
    const token = new Token(tokenAddress.toHexString())
    token.decimals = fetchTokenDecimals(tokenAddress)
    token.symbol = fetchTokenSymbol(tokenAddress)
    token.name = fetchTokenName(tokenAddress)
    return token
}