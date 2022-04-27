import { PairCreated } from '../../generated/BaseV1Factory/BaseV1Factory'
import { Sync } from '../../generated/templates/BaseV1Pair/BaseV1Pair'
import { Address, ethereum } from '@graphprotocol/graph-ts'
import { newMockEvent } from 'matchstick-as'
import { GaugeCreated } from '../../generated/BaseV1Voter/BaseV1Voter'

export const createNewPairEvent = (
  token0: string,
  token1: string,
  stable: boolean,
  pair: string,
  allPairsLen: i32
): PairCreated => {
  const mockEvent = newMockEvent()
  const pairEvent = new PairCreated(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters
  )
  pairEvent.parameters = [
    new ethereum.EventParam('token0', ethereum.Value.fromAddress(Address.fromString(token0))),
    new ethereum.EventParam('token1', ethereum.Value.fromAddress(Address.fromString(token1))),
    new ethereum.EventParam('token1', ethereum.Value.fromBoolean(stable)),
    new ethereum.EventParam('pair', ethereum.Value.fromAddress(Address.fromString(pair))),
    new ethereum.EventParam('allPairsLen', ethereum.Value.fromI32(allPairsLen))
  ]

  return pairEvent
}

export const createSyncEvent = (pairAddress: string, reserve0: i32, reserve1: i32): Sync => {
  const mockEvent = newMockEvent()
  const syncEvent = new Sync(
    Address.fromString(pairAddress),
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters
  )

  syncEvent.parameters = [
    new ethereum.EventParam('reserve0', ethereum.Value.fromI32(reserve0)),
    new ethereum.EventParam('reserve1', ethereum.Value.fromI32(reserve1))
  ]

  return syncEvent
}

export const createGaugeEvent = (gaugeAddress: string, pairAddress: string): GaugeCreated => {
  const mockEvent = newMockEvent()
  const gaugeEvent = new GaugeCreated(
    Address.fromString(pairAddress),
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters
  )

  gaugeEvent.parameters = [
    new ethereum.EventParam('gauge', ethereum.Value.fromAddress(Address.fromString(gaugeAddress))),
    new ethereum.EventParam('creator', ethereum.Value.fromAddress(mockEvent.address)),
    new ethereum.EventParam('bribe', ethereum.Value.fromAddress(mockEvent.address)),
    new ethereum.EventParam('pool', ethereum.Value.fromAddress(Address.fromString(pairAddress)))
  ]

  return gaugeEvent
}
