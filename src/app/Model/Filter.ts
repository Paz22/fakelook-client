export default interface Filter
{
    publishers:string[],
    startingDate:Date|null,
    endingDate:Date|null,
    tags:string[],
    taggedUsers:string[]
}