import { PairCreated } from '../generated/BaseV1Factory/BaseV1Factory'
import { Address, ethereum, } from '@graphprotocol/graph-ts'
import { newMockEvent, test, assert, logStore, clearStore, } from 'matchstick-as/assembly'
import { Pair } from '../generated/schema'
import { handlePairCreated } from '../src/pair/pair.mapping'

export function createNewPairEvent(
    token0: string,
    token1: string,
    stable: boolean,
    pair: string,
    allPairsLen: i32
  ): PairCreated {
    const mockEvent = newMockEvent()
    const newPairEvent = new PairCreated(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters
    )
    newPairEvent.parameters = new Array()
    const token0Param = new ethereum.EventParam('token0', ethereum.Value.fromAddress(Address.fromString(token0)))
    const token1Param = new ethereum.EventParam('token1', ethereum.Value.fromAddress(Address.fromString(token1)))
    const stableParam = new ethereum.EventParam('token1', ethereum.Value.fromBoolean(stable))
    const pairParam = new ethereum.EventParam('pair', ethereum.Value.fromAddress(Address.fromString(pair)))
    const allPairsLenParam = new ethereum.EventParam('allPairsLen', ethereum.Value.fromI32(allPairsLen))
    
    newPairEvent.parameters.push(token0Param)
    newPairEvent.parameters.push(token1Param)
    newPairEvent.parameters.push(stableParam)
    newPairEvent.parameters.push(pairParam)
    newPairEvent.parameters.push(allPairsLenParam)
    return newPairEvent
  }

  test('Can handle new pair', () => {
    const pairAddress = '0x45d749ed03a7715c36680cb4221d24693d3cb34c'
    const newPairEvent = createNewPairEvent('0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', '0x888EF71766ca594DED1F0FA3AE64eD2941740A20', true, pairAddress, 1)
    const pair = handlePairCreated(newPairEvent)
    assert.fieldEquals('Pair', pairAddress, 'id', pairAddress)
    assert.booleanEquals(pair.isStable, true)
    logStore()
    clearStore()
  })