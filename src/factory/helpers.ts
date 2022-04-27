import { Token } from "../../generated/schema";

export const generatePairName = (token0Symbol: string, token1Symbol: string, isStable: bool): string => {
    const prefix = isStable ? 'sAMM' : 'vAMM'
    return `${prefix}-${token0Symbol}/${token1Symbol}`
}