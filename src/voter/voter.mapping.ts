import { Address, log } from '@graphprotocol/graph-ts'
import { GaugeCreated } from '../../generated/BaseV1Voter/BaseV1Voter'
import { Gauge, Pair } from '../../generated/schema'

export function handleGaugeCreated(event: GaugeCreated): void {
    const pairAddress = event.params.pool.toHexString()
    const gaugeAddress = event.params.gauge.toHexString()

    const pair = Pair.load(pairAddress)
    if (!pair) {
        log.error('No pair found for address {}', [pairAddress])
        return
    }

    const gauge = new Gauge(gaugeAddress)
    gauge.bribe = event.params.bribe.toHexString()
    pair.gauge = gauge.id
    gauge.save()
    pair.save()
}