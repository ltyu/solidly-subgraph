import { GaugeCreated } from '../../generated/BaseV1Voter/BaseV1Voter'
import { Gauge } from '../../generated/schema'

export function handleGaugeCreated(event: GaugeCreated): Gauge {
    const gauge = new Gauge(event.params.pool.toHex())
    gauge.save()
    return gauge
}