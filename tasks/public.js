import ExportTask from './export-task';
import { parseGmlX, parseGmlY } from './helpers';

export default class PublicExport extends ExportTask {
  title = 'Basisregister Vlaams Logiesaanbod';
  datasetType = 'http://linked.toerismevlaanderen.be/id/dataset-types/ca82a1e3-8a7c-438e-ba37-cf36063ba060';
  fileName = 'public';
  permalink = '/perm/datasets/public';
  graphs = [
    'http://mu.semte.ch/graphs/public',
    'http://mu.semte.ch/graphs/mapped/public',
  ];
  columnSpec = [
    { source: 'product_id', value: 'business_product_id' },
	  { source: 'product_type', value: 'product_type' },
	  { source: 'parent', value: 'parent_product_ids' },
	  { source: 'name', value: 'name' },
	  { source: 'alt_name', value: 'name_or_number' },
	  { source: 'category', value: 'discriminator' },
	  { source: 'street', value: 'street' },
	  { source: 'house_number', value: 'house_number' },
	  { source: 'box_number', value: 'box_number' },
	  { source: 'postal_code', value: 'postal_code' },
	  { source: 'city_name', value: 'city_name' },
	  { source: 'lat', value: 'lat' },
	  { source: 'long', value: 'long' },
    { source: 'gml', value: 'x', map: parseGmlX },
    { source: 'gml', value: 'y', map: parseGmlY },
	  { source: 'promotional_region', value: 'promotional_region' },
	  { source: 'modified', value: 'changed_time' },
	  { source: 'registration_status_change_date', value: 'last_status_change_date' },
	  { source: 'telephone', value: 'phone1' },
	  { source: 'telephone_2', value: 'phone2' },
	  { source: 'telephone_3', value: 'phone3' },
	  { source: 'email', value: 'email' },
	  { source: 'website', value: 'website' },
	  { source: 'registration_status_label', value: 'status' },
	  { source: 'rating', value: 'comfort_class' },
	  { source: 'number_of_units', value: 'number_of_units' },
	  { source: 'maximum_capacity', value: 'maximum_capacity' },
    { source: 'normale_capaciteit', value: 'normal_capacity' },
    { source: 'aantpal_plaatsen_voor_tenten', value: 'tent_capacity' },
	  { source: 'aantal_campingplaatsen_voor_kortverblijf', value: 'number_of_short_term_camping_spots' },
	  { source: 'aantal_toeristische_campingplaatsen', value: 'number_of_touristic_camping_spots' },
	  { source: 'aantal_staanplaatsen',value: 'number_of_camper_stands' },
	  { source: 'aantal_campingplaatsen', value: 'number_of_camping_spots' },
	  { source: 'aantal_wooneenheden', value: 'number_of_residence_units' },
	  { source: 'aantal_campingplaatsen_voor_lange_termijn', value: 'number_of_long_term_camping_spots' },
	  { source: 'aantal_wooneenheden_te_huur', value: 'number_of_residence_units_for_rental' },
	  { source: 'aantal_wandelaarshutten', value: 'number_of_hikers_huts' }
  ];
  query = `
PREFIX adms: <http://www.w3.org/ns/adms#>
PREFIX adres: <https://data.vlaanderen.be/ns/adres#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX generiek: <https://data.vlaanderen.be/ns/generiek#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX locn: <http://www.w3.org/ns/locn#>
PREFIX logies: <https://data.vlaanderen.be/ns/logies#>
PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
PREFIX org: <http://www.w3.org/ns/org#>
PREFIX organisatie: <https://data.vlaanderen.be/ns/organisatie#>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX regorg: <http://www.w3.org/ns/regorg#>
PREFIX schema: <http://schema.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX tvl: <http://linked.toerismevlaanderen.be/vocabularies/accessibility/>
PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>
PREFIX wgs: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT DISTINCT
?product
?productId
?name
?altName
?type
?category
?registrationStatusLabel
?registrationStatusChangeDate
?productType
?modified
?street
?houseNumber
?boxNumber
?postalCode
?cityName
?lat
?long
?gml
?promotionalRegion
?email
?website
?rating
?greenKeyLabel
?accessibilityLabel
?numberOfUnits
?maximumCapacity
%FROM%
WHERE {
  ?product a logies:Logies .

  ?product logies:heeftRegistratie ?registration .
  ?registration logies:registratieStatus ?registrationStatus ;
    tvl:category ?categoryConcept .
  FILTER (?registrationStatus IN (
    <http://linked.toerismevlaanderen.be/id/concepts/96dbd436-b59b-4e6e-b080-26a83456dc4e>,
    <http://linked.toerismevlaanderen.be/id/concepts/f9305a29-0508-4e24-8615-f83bd4bf84a7>,
    <http://linked.toerismevlaanderen.be/id/concepts/bb9d1b1b-05ea-4a98-bb54-87084c38da4e>,
    <http://linked.toerismevlaanderen.be/id/concepts/ed624155-305e-4da3-83a0-e4c586ca7b81>
  ))
  FILTER(?categoryConcept NOT IN (
    <http://linked.toerismevlaanderen.be/id/concepts/b02b59e8-580f-4d97-a88b-8d2ce59ad3c9>
  ))

  ?registrationStatus tvl:sqlKey ?registrationStatusLabel .

  ?categoryConcept tvl:sqlKey ?category .

  OPTIONAL {
    ?registration dct:type/skos:prefLabel ?type .
    FILTER(LANG(?type) = "nl")
  }

  OPTIONAL {
    ?product adms:identifier ?tvlIdentifier .
    ?tvlIdentifier adms:schemaAgency "Toerisme Vlaanderen" ;
      skos:notation ?productId .
  }

  OPTIONAL {
    ?registration prov:qualifiedGeneration/prov:atTime ?registrationStatusChangeDate .
  }

  OPTIONAL { ?product schema:name ?name . }
  OPTIONAL { ?product schema:alternativeName ?altName . }
  OPTIONAL { ?product dct:modified ?modified . }

  OPTIONAL { ?parent logies:heeftAlternatieveUitbating ?product . }
  BIND(IF(BOUND(?parent), "PROMO", "BASE") as ?productType)

  OPTIONAL { ?product logies:aantalVerhuureenheden ?numberOfUnits . }
  OPTIONAL { ?product logies:aantalSlaapplaatsen ?maximumCapacity . }

  OPTIONAL {
    ?product logies:onthaalAdres ?address .
    OPTIONAL { ?address locn:thoroughfare ?street . }
    OPTIONAL { ?address adres:Adresvoorstelling.huisnummer ?houseNumber . }
    OPTIONAL { ?address adres:Adresvoorstelling.busnummer ?boxNumber . }
    OPTIONAL { ?address locn:postCode ?postalCode . }
    OPTIONAL { ?address adres:gemeentenaam ?cityName . }
  }

  OPTIONAL {
    ?product logies:onthaalLocatie ?location .
    OPTIONAL { ?location wgs:lat ?lat . }
    OPTIONAL { ?location wgs:long ?long . }
    OPTIONAL { ?location geosparql:asGML ?gml . }
  }

  OPTIONAL { ?product logies:behoortTotToeristischeRegio/tvl:sqlKey ?promotionalRegion . }

  OPTIONAL {
    ?product schema:contactPoint ?contactPointEmail .
    FILTER NOT EXISTS { ?contactPointEmail schema:contactType ?contactTypeEmail . }
    ?contactPointEmail schema:email ?email .
  }
  OPTIONAL {
    ?product schema:contactPoint ?contactPointWebsite .
    FILTER NOT EXISTS { ?contactPointWebsite schema:contactType ?contactTypeWebsite . }
    FILTER NOT EXISTS { ?contactPointWebsite foaf:name ?contactPointChannel . }
    ?contactPointWebsite foaf:page ?website .
  }

  OPTIONAL {
    ?product schema:starRating/schema:ratingValue ?ratingValue .
    ?internalKey tvl:sqlKey ?rating ; tvl:linkedKey ?ratingValue .
  }

  OPTIONAL {
    ?product logies:heeftKwaliteitslabel ?greenKeyLabel .
    ?greenKeyLabel skos:prefLabel "Green Key"@nl .
  }

  OPTIONAL {
    ?product logies:heeftKwaliteitslabel ?accessibilityLabel .
    ?accessibilityLabel skos:prefLabel ?accessibilityPrefLabel .
    FILTER (CONTAINS(STR(?accessibilityPrefLabel), "Toegankelijkheidslabel"))
  }

} ORDER BY ?name ?product LIMIT %LIMIT% OFFSET %OFFSET%`;
  perRowQueries = [
    {
      type: 'multi-value',
      query: `PREFIX schema: <http://schema.org/>
     SELECT DISTINCT ?telephone
     %FROM%
     WHERE {
       <%s%> schema:contactPoint ?contactPoint .
       FILTER NOT EXISTS { ?contactPoint schema:contactType ?contactType . }
       ?contactPoint schema:telephone ?telephone .
     }`
    },
    {
      type: 'join-value',
      query:
      `PREFIX schema: <http://schema.org/>
       PREFIX logies: <https://data.vlaanderen.be/ns/logies#>
       SELECT DISTINCT ?parent
       %FROM%
       WHERE {
         ?parent logies:heeftAlternatieveUitbating <%s%> .
         ?parent a schema:TouristAttraction .
       }`
    },
    {
      type: 'label-value',
      query: `PREFIX schema: <http://schema.org/>
       PREFIX logies: <https://data.vlaanderen.be/ns/logies#>
       SELECT DISTINCT ?value ?label
       %FROM%
       WHERE {
         <%s%> logies:capaciteit ?capacity .
         ?capacity a schema:QuantitativeValue ;
           schema:value ?value ;
           schema:unitText ?label .
       }`
    }
  ]
};
