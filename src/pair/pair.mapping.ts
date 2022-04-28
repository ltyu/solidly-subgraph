import { log } from '@graphprotocol/graph-ts'
import { Pair, Token } from '../../generated/schema'
import { Sync } from '../../generated/templates/BaseV1Pair/BaseV1Pair'
import { tokenAmountToDecimal } from '../token/helpers'

// Sets the pair reserve0 and reserve1
export function handleSync (event: Sync): void {
    const pairAddress = event.address.toHexString()
    const pair = Pair.load(pairAddress)
    if (!pair) {
        log.error('No pair found for address {}', [pairAddress])
        return
    }

    const token0 = Token.load(pair.token0)
    if (token0){
        pair.reserve0 = tokenAmountToDecimal(event.params.reserve0, token0.decimals)
    }

    const token1 = Token.load(pair.token1)
    if (token1) {
        pair.reserve1 = tokenAmountToDecimal(event.params.reserve1, token1.decimals)
    }

    pair.save()
}