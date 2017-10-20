# Glycosylation Annotation

## parameters

* `up_acc` UniProt Accession
	* default: B0R8E4

## endpoint

http://sparql.uniprot.org/sparql

## `glycosylation_annotation` query glycosylation_annotation

```sparql
PREFIX up:<http://purl.uniprot.org/core/> 
PREFIX uniprotkb:<http://purl.uniprot.org/uniprot/> 
PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> 
PREFIX faldo:<http://biohackathon.org/resource/faldo#> 
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
SELECT DISTINCT ?protein ?len ?site ?evi ?topic ?title
WHERE 
{
	?state a rdf:Statement.
	VALUES ?protein { uniprotkb:{{params.up_acc}} }
	?state rdf:subject ?protein.
	# protein
	?protein a up:Protein.

	# seq-length
	?seq up:sequenceFor ?protein.
	?seq a up:Sequence.
	?seq up:length ?len.

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

limit 100

```

## output

```javascript
({glycosylation_annotation}) => glycosylation_annotation.results.bindings.map(
	binding => Object.keys(binding).map(
		k => ({[k]: binding[k].value})
	)
);
```
