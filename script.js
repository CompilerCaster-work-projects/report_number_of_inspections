db.inspections.aggregate([
{
$match: {
'timestamps.processedAt': {
$gte: new Date('2023-11-27T00:00:00'),
$lte: new Date('2024-02-18T23:59:59')
},
'resolvedBy.type': 'human',
isTest: false,
'organization.inn': {
$in: [
// any necessary Tins
'5047227020', '7705002602'...
]
}
}
},
{
$project: {
org_inn: '$organization.inn',

date: {
$dateToString: {
format: '%Y-%m-%d',
date: '$timestamps.processedAt'
}
}


}
},
{
$group: {
_id: { INN: '$org_inn', date: '$date' },
count: { $sum: 1 }
}
},
{
$project: {
_id: 0,
INN: '$_id.INN',
date: '$_id.date',
count: 1
}
}
])