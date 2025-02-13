export interface IEnergyList {
    data:IData
}
interface IData {
    from:Date,
    generationmix:IGenerationMix[]
    to:Date
}
interface IGenerationMix {
    fuel:string,
    perc:number
}