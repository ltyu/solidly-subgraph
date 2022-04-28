import { Address, BigInt, BigDecimal, log } from "@graphprotocol/graph-ts"
import { ERC20 } from '../../generated/BaseV1Factory/ERC20'
import { Token } from "../../generated/schema"
import { ONE_BI, ZERO_BI } from "../utils/constants"

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

export const exponentToBigDecimal = (decimals: BigInt): BigDecimal => {
  let bd = BigDecimal.fromString('1')
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

export const tokenAmountToDecimal = (tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal => {
  log.info(`result {}`, [tokenAmount.toString()])
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}