import { log } from '@graphprotocol/graph-ts'
import { Pair } from '../../generated/schema'
import { Sync } from '../../generated/templates/BaseV1Pair/BaseV1Pair'

// Sets the pair reserve0 and reserve1
export function handleSync (event: Sync): void {
    const pairAddress = event.address.toHexString()
    const pair = Pair.load(pairAddress)
    if (!pair) {
        log.error('No pair found for address {}', [pairAddress])
        return
    }
    pair.reserve0 = event.params.reserve0
    pair.reserve1 = event.params.reserve1
   
    pair.save()
}