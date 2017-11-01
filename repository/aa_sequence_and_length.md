# Amino acid sequence and length

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

SELECT DISTINCT ?protein ?len ?aa_seq
WHERE 
{
  # protein
  VALUES ?protein { uniprotkb:{{params.up_acc}} }
  ?protein a up:Protein.

  # sequence
  ?protein up:sequence ?seq.
  ?seq rdf:value ?aa_seq.

  # seq-length
  ?seq_len up:sequenceFor ?protein.
  ?seq_len a up:Sequence.
  ?seq_len up:length ?len.
}


```

## output

```javascript
({result}) => {
  var list = result.results.bindings;
  var r = [];
  for(var i = 0; i < list.length; i++){
 		var obj = {
 			protein: list[i].protein.value,
 			len: list[i].len.value,
 			aa_seq: list[i].aa_seq.value
 		};
 		r.push(obj);
  }
  return r;
};
```
