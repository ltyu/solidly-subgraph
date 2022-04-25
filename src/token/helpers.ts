import { Address, BigInt } from "@graphprotocol/graph-ts"

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
    const contract = ERC20.bind(tokenAddress)
    // try types uint8 for decimals
    let decimalValue = null
    const decimalResult = contract.try_decimals()
    if (!decimalResult.reverted) {
      decimalValue = decimalResult.value
    }
    return BigInt.fromI32(decimalValue as i32)
}