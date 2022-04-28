import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { createMockedFunction } from "matchstick-as";

export function erc20TryDecimalsMock(contractAddress: string, decimals: i32): void {
    createMockedFunction(Address.fromString(contractAddress), 'decimals', 'decimals():(uint8)')
        .returns([ethereum.Value.fromI32(decimals)])
}

export function erc20TryNameMock(contractAddress: string, name: string): void {
    createMockedFunction(Address.fromString(contractAddress), 'name', 'name():(string)')
        .returns([ethereum.Value.fromString(name)])
}

export function erc20TrySymbolMock(contractAddress: string, symbol: string): void {
    createMockedFunction(Address.fromString(contractAddress), 'symbol', 'symbol():(string)')
        .returns([ethereum.Value.fromString(symbol)])
}