import { test, assert, logStore, clearStore } from 'matchstick-as/assembly'
import { handlePairCreated } from '../src/factory/factory.mapping'
import { handleSync } from '../src/pair/pair.mapping'
import { handleGaugeCreated } from '../src/voter/voter.mapping'
import { generatePairName } from '../src/factory/helpers'
import { createGaugeEvent, createNewPairEvent, createSyncEvent } from './utils/helpers'
import { erc20TryDecimalsMock, erc20TryNameMock, erc20TrySymbolMock } from './utils/mocks'
import { tokenAmountToDecimal } from '../src/token/helpers'
import { BigInt } from '@graphprotocol/graph-ts'

test('Can handle create new pair', () => {
  const pairAddress = '0x45d749ed03a7715c36680cb4221d24693d3cb34c'
  const token0Address = '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83'
  const token1Address = '0x888EF71766ca594DED1F0FA3AE64eD2941740A20'
  // Mock external contract methods
  erc20TryDecimalsMock(token0Address, 13)
  erc20TryDecimalsMock(token1Address, 13)
  erc20TryNameMock(token0Address, 'Fantom')
  erc20TryNameMock(token1Address, 'Curve')
  erc20TrySymbolMock(token0Address, 'FTM')
  erc20TrySymbolMock(token1Address, 'CRV')

  const newPairEvent = createNewPairEvent(token0Address, token1Address, true, pairAddress, 1)
  handlePairCreated(newPairEvent)

  assert.fieldEquals('Pair', pairAddress, 'id', pairAddress)
  assert.fieldEquals('Pair', pairAddress, 'isStable', 'true')
  assert.fieldEquals('Pair', pairAddress, 'name', generatePairName('FTM', 'CRV', true))
  clearStore()
})

test('should sync reserve0 and reserve1 with an existing pair', () => {
  const pairAddress = '0x45d749ed03a7715c36680cb4221d24693d3cb34c'
  const token0Address = '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83'
  const token1Address = '0x888EF71766ca594DED1F0FA3AE64eD2941740A20'
  const decimals = 13
  // Mock external contract methods
  erc20TryDecimalsMock(token0Address, decimals)
  erc20TryDecimalsMock(token1Address, decimals)
  erc20TryNameMock(token0Address, 'Fantom')
  erc20TryNameMock(token1Address, 'Curve')
  erc20TrySymbolMock(token0Address, 'FTM')
  erc20TrySymbolMock(token1Address, 'CRV')

  handlePairCreated(createNewPairEvent(token0Address, token1Address, true, pairAddress, 1))
  handleSync(createSyncEvent(pairAddress, 203, 326))
  logStore()

  assert.fieldEquals('Pair', pairAddress, 'reserve0', `${tokenAmountToDecimal(BigInt.fromI32(203), BigInt.fromI32(decimals))}`)
  assert.fieldEquals('Pair', pairAddress, 'reserve1', `${tokenAmountToDecimal(BigInt.fromI32(326), BigInt.fromI32(decimals))}`)
  clearStore()
})

test('should attach gauge to existing pair', () => {
  const pairAddress = '0x45d749ed03a7715c36680cb4221d24693d3cb34c'
  const gaugeAddress = '0xaa7679ed483031836941a731f6af06d065737eb8'
  const token0Address = '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83'
  const token1Address = '0x888EF71766ca594DED1F0FA3AE64eD2941740A20'
  // Mock external contract methods
  erc20TryDecimalsMock(token0Address, 13)
  erc20TryDecimalsMock(token1Address, 13)
  erc20TryNameMock(token0Address, 'Fantom')
  erc20TryNameMock(token1Address, 'Curve')
  erc20TrySymbolMock(token0Address, 'FTM')
  erc20TrySymbolMock(token1Address, 'CRV')

  handlePairCreated(createNewPairEvent(token0Address, token1Address, true, pairAddress, 1))
  handleGaugeCreated(createGaugeEvent(gaugeAddress, pairAddress))
  assert.fieldEquals('Pair', pairAddress, 'gauge', gaugeAddress)

  logStore()
})
