import {BigNumber} from "ethers";

export const fromBigNumber= (bignumber:BigNumber) :string => BigNumber.from(bignumber).div(BigNumber.from(10).pow(18)).toString();
export const toBigNumber= (normalNumber:string) :BigNumber => BigNumber.from(normalNumber).div(BigNumber.from(10).pow(18));