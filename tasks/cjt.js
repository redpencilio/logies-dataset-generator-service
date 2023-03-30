import ExportTask from './export-task';

export default class CjtExport extends ExportTask {
  title = 'Register van alle TVA verblijven in Vlaanderen voor CJT';
  datasetType = 'http://linked.toerismevlaanderen.be/id/concepts/e4369326-19cf-4028-aaea-ed1a57453261';
  fileName = 'cjt';
  permalink = '/perm/datasets/cjt';
  graphs = [
    'http://mu.semte.ch/graphs/public',
    'http://mu.semte.ch/graphs/mapped/public',
    'http://mu.semte.ch/graphs/mapped/private/tva'
  ];
  datasetGraph = 'http://mu.semte.ch/graphs/mapped/private/tva';
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
?name
?altName
?type
?category
?registrationStatusLabel
?registrationDate
?registrationInvalidationDate
?productType
?modified
?street
?houseNumber
?boxNumber
?postalCode
?cityName
?lat
?long
?promotionalRegion
?statisticalRegion
?email
?website
?rating
?numberOfUnits
?capacity
?fireSafetyCertificateExperiationDate
?fireSafetyAdvice
?fileNumber
?greenKeyLabel
?accessibilityLabel
?tvaContact
?tvaContactFirstName
?tvaContactLastName
?tvaContactTitle
?tvaContactEmail
?tvaContactWebsite
?tvaContactStreet
?tvaContactHouseNumber
?tvaContactBoxNumber
?tvaContactPostalCode
?tvaContactCityName
?tvaOrganisation
?tvaOrganisationName
?tvaOrganisationIdentifier
?tvaOrganisationEmail
?tvaOrganisationWebsite
?tvaOrganisationStreet
?tvaOrganisationHouseNumber
?tvaOrganisationBoxNumber
?tvaOrganisationPostalCode
?tvaOrganisationCityName
%FROM%
WHERE {
  ?product a logies:Logies .

  ?product logies:heeftRegistratie ?registration .
  ?registration logies:registratieStatus ?registrationStatus .
  FILTER (?registrationStatus IN (
        <http://linked.toerismevlaanderen.be/id/concepts/37fd4d81-846b-448d-92d1-4dc1232540fd>,
        <http://linked.toerismevlaanderen.be/id/concepts/5a164cce-0c3c-469d-8910-707a456e0933>,
        <http://linked.toerismevlaanderen.be/id/concepts/4f269330-bc00-41e9-8928-1a454f38e760>
  ))
  ?registrationStatus skos:prefLabel ?registrationStatusLabel .
  FILTER(LANG(?registrationStatusLabel) = "nl")
  OPTIONAL {
    ?registration dct:type/skos:prefLabel ?type .
    FILTER(LANG(?type) = "nl")
   }
  OPTIONAL {
    ?registration tvl:category/skos:prefLabel ?category .
    FILTER(LANG(?category) = "nl")
  }
  OPTIONAL { ?registration prov:qualifiedGeneration/prov:atTime ?registrationDate . }
  OPTIONAL { ?registration prov:qualifiedInvalidation/prov:atTime ?registrationInvalidationDate . }

  OPTIONAL { ?product schema:name ?name . }
  OPTIONAL { ?product schema:alternativeName ?altName . }
  OPTIONAL { ?product dct:modified ?modified . }

  OPTIONAL { ?parent logies:heeftAlternatieveUitbating ?product . }
  BIND(IF(BOUND(?parent), "PROMO", "BASE") as ?productType)

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
  }

  OPTIONAL { ?product logies:behoortTotToeristischeRegio/skos:prefLabel ?promotionalRegion . }
  OPTIONAL { ?product tvl:belongsToStatisticalRegion/skos:prefLabel ?statisticalRegion . }

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
    ?product schema:starRating/schema:ratingValue ?rating .
  }

  OPTIONAL { ?product logies:aantalVerhuureenheden ?numberOfUnits . }
  OPTIONAL { ?product logies:aantalSlaapplaatsen ?capacity . }

  OPTIONAL {
    ?permit a schema:GovernmentPermit ;
    dct:subject ?product ;
    schema:validUntil ?fireSafetyCertificateExperiationDate .
  }

  OPTIONAL { ?product tvl:receivedFireSafetyAdvice ?fireSafetyAdvice . }

  OPTIONAL {
    ?product adms:identifier/skos:notation ?fileNumber .
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

  OPTIONAL {
    ?product schema:contactPoint ?tvaContact .
    ?tvaContact schema:contactType "TVA Contact" .
    OPTIONAL { ?tvaContact foaf:firstName ?tvaContactFirstName . }
    OPTIONAL { ?tvaContact foaf:givenName ?tvaContactLastName . }
    OPTIONAL { ?tvaContact vcard:honorificPrefix ?tvaContactTitle . }
    OPTIONAL { ?tvaContact schema:email ?tvaContactEmail . }
    OPTIONAL { ?tvaContact foaf:page ?tvaContactWebsite . }
    OPTIONAL {
      ?tvaContact locn:address ?tvaContactAddress .
      OPTIONAL { ?tvaContactAddress locn:thoroughfare ?tvaContactStreet . }
      OPTIONAL { ?tvaContactAddress adres:Adresvoorstelling.huisnummer ?tvaContactHouseNumber . }
      OPTIONAL { ?tvaContactAddress adres:Adresvoorstelling.busnummer ?tvaContactBoxNumber . }
      OPTIONAL { ?tvaContactAddress locn:postCode ?tvaContactPostalCode . }
      OPTIONAL { ?tvaContactAddress adres:gemeentenaam ?tvaContactCityName . }
    }
  }

  OPTIONAL {
    ?product schema:contactPoint ?tvaOrganisationContactPoint .
    ?tvaOrganisationContactPoint schema:contactType "TVA Organisation" .
    OPTIONAL {
      ?tvaOrganisation schema:contactPoint ?tvaOrganisationContactPoint .
      ?tvaOrganisation a org:Organisation .
      OPTIONAL { ?tvaOrganisation skos:prefLabel ?tvaOrganisationName . }
      OPTIONAL { ?tvaOrganisation adms:identifier/skos:notation ?tvaOrganisationIdentifier . }
    }
    OPTIONAL { ?tvaOrganisationContactPoint schema:email ?tvaOrganisationEmail . }
    OPTIONAL { ?tvaOrganisationContactPoint foaf:page ?tvaOrganisationWebsite . }
    OPTIONAL {
      ?tvaOrganisationContactPoint locn:address ?tvaOrganisationAddress .
      OPTIONAL { ?tvaOrganisationAddress locn:thoroughfare ?tvaOrganisationStreet . }
      OPTIONAL { ?tvaOrganisationAddress adres:Adresvoorstelling.huisnummer ?tvaOrganisationHouseNumber . }
      OPTIONAL { ?tvaOrganisationAddress adres:Adresvoorstelling.busnummer ?tvaOrganisationBoxNumber . }
      OPTIONAL { ?tvaOrganisationAddress locn:postCode ?tvaOrganisationPostalCode . }
      OPTIONAL { ?tvaOrganisationAddress adres:gemeentenaam ?tvaOrganisationCityName . }
    }
  }
} ORDER BY ?type ?name ?product LIMIT %LIMIT% OFFSET %OFFSET%`;
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
      type: 'multi-value',
      query: `PREFIX schema: <http://schema.org/>
     SELECT DISTINCT ?tvaContactTelephone
     %FROM%
     WHERE {
       <%s%> schema:contactPoint ?tvaContact .
       ?tvaContact schema:contactType "TVA Contact" .
       ?tvaContact schema:telephone ?tvaContactTelephone .
     }`
    },
    {
      type: 'multi-value',
      query: `PREFIX schema: <http://schema.org/>
     PREFIX org: <http://www.w3.org/ns/org#>
     SELECT DISTINCT ?tvaOrganisationTelephone
     %FROM%
     WHERE {
       <%s%> schema:contactPoint ?tvaOrganisationContactPoint .
       ?tvaOrganisationContactPoint schema:contactType "TVA Organisation" .
       ?tvaOrganisation schema:contactPoint ?tvaOrganisationContactPoint .
       ?tvaOrganisation a org:Organisation .
       ?tvaOrganisationContactPoint schema:telephone ?tvaOrganisationTelephone .
     }`
    }
  ]
};
