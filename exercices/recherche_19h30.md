# base
ndjson-sort "a.views > b.views ? -1 : 1" < episodes.ndjson  \
| head -10  \
| ndjson-map "{ firstTitle: d.segments[0].title }" \
| ndjson-reduce
## try
le nombre de fois que president est cité par mois 

ndjson-filter "d.title.toLowerCase().includes('président')" < segments.ndjson \
| ndjson-sort "a.date > b.date ? 1 : 1" \
| ndjson-map "{ month: d.date.split('-')[1], citation: 1 }" \
| node scriptes/sum citation month \
| node scriptes/graphDurationByMonth \
| vl2png > images/virus.png