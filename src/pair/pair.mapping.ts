import { PairCreated } from '../../generated/BaseV1Factory/BaseV1Factory'
import { Pair, Token } from '../../generated/schema'

export function handlePairCreated(event: PairCreated): Pair {
    const pair = new Pair(event.params.pair.toHex())
    pair.isStable = event.params.stable

    // Load or Create Token0
    let token0 = Token.load(event.params.token0.toHex())
    if (!token0) {
        token0 = new Token(event.params.token0.toHex())
        
        token0.save()
    }
    pair.token0 = token0.id

    // Load or Create Token1
    let token1 = Token.load(event.params.token1.toHex())
    if (!token1) {
        token1 = new Token(event.params.token1.toHex())
        token1.save()
    }
    pair.token1 = token1.id

    // Saves
    pair.save()

    return pair
}