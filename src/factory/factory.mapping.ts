import { PairCreated } from '../../generated/BaseV1Factory/BaseV1Factory'
import { Pair, Token } from '../../generated/schema'
import { BaseV1Pair as PairTemplate } from '../../generated/templates'
import { createToken } from '../token/helpers'
import { generatePairName } from './helpers'

export function handlePairCreated(event: PairCreated): void {
    // Should get the pair created using the address
    const pair = new Pair(event.params.pair.toHexString())
    pair.isStable = event.params.stable

    // Load or Create Token0
    let token0 = Token.load(event.params.token0.toHexString())
    if (!token0) {
        token0 = createToken(event.params.token0)
        token0.save()
    }
    pair.token0 = token0.id

    // Load or Create Token1
    let token1 = Token.load(event.params.token1.toHexString())
    if (!token1) {
        token1 = createToken(event.params.token1)
        token1.save()
    }
    pair.token1 = token1.id
    pair.name = generatePairName(token0.symbol, token1.symbol, pair.isStable)

    pair.save()
    PairTemplate.create(event.params.pair)
}