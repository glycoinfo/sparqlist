# Glycosylation Annotation

## parameters

* `up_acc` UniProt Accession
	* default: B0R8E4

## endpoint

http://sparql.uniprot.org/sparql

## `result` query glycosylation_annotation

```sparql
PREFIX up:<http://purl.uniprot.org/core/> 
PREFIX uniprotkb:<http://purl.uniprot.org/uniprot/> 
PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> 
PREFIX faldo:<http://biohackathon.org/resource/faldo#> 
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
SELECT DISTINCT ?protein ?site ?evi ?topic ?title
WHERE 
{
	?state a rdf:Statement.
	VALUES ?protein { uniprotkb:{{params.up_acc}} }
	?state rdf:subject ?protein.
	# protein
	?protein a up:Protein.

	# glycosylation
	?state rdf:object ?annotation.
	?annotation a up:Glycosylation_Annotation.
	?annotation up:range ?range .
	?range faldo:begin/faldo:position ?site .

	# evidence
	?state up:attribution ?attr.
	?attr up:evidence ?evi.

	# citation
	OPTIONAL{
	?attr up:source ?source.
	?source foaf:primaryTopicOf  ?topic.
	?source up:title ?title.
	}
}


```

## output

```javascript
({result}) => {
  var list = result.results.bindings;
  var r = [];
  for(var i = 0; i < list.length; i++){
 		var obj = {
 			site: list[i].site.value,
 			protein: list[i].protein.value
 		};
 			if(list[i].evi) obj.evi = list[i].evi.value;
 			if(list[i].topic) obj.topic = list[i].topic.value;
 			if(list[i].title) obj.title = list[i].title.value;
 		r.push(obj);
  }
  return r;
};
```
