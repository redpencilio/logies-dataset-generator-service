import ExportTask from './export-task';

export default class ProvinceExport extends ExportTask {
  constructor(province, label, datasetType, filter) {
    super(...arguments);
    this.title = `Basisregister met het logiesaanbod voor ${label}`;
    this.datasetType = datasetType;
    this.fileName = `logies-${label.replace(/\s/g, '_')}`;
    this.graphs = [
      'http://mu.semte.ch/graphs/public',
      'http://mu.semte.ch/graphs/mapped/public',
      `http://mu.semte.ch/graphs/mapped/private/${province}`
    ];
    this.datasetGraph = `http://mu.semte.ch/graphs/mapped/private/${province}`;
    this.filter = filter;
    this.query = `
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
?greenKeyLabel
?accessibilityLabel
?agent
?agentFirstName
?agentLastName
?agentTitle
?agentCompanyName
?agentIdentifier
?agentEmail
?agentWebsite
?agentStreet
?agentHouseNumber
?agentBoxNumber
?agentPostalCode
?agentCityName
?productOwner
?productOwnerFirstName
?productOwnerLastName
?productOwnerTitle
?productOwnerCompanyName
?productOwnerIdentifier
?productOwnerEmail
?productOwnerWebsite
?productOwnerStreet
?productOwnerHouseNumber
?productOwnerBoxNumber
?productOwnerPostalCode
?productOwnerCityName
%FROM%
WHERE {
  ?product a logies:Logies .

  ?product logies:heeftRegistratie ?registration .
  ?registration logies:registratieStatus ?registrationStatus .
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

  OPTIONAL { ?product schema:name ?name . }
  OPTIONAL { ?product schema:alternativeName ?altName . }
  OPTIONAL { ?product dct:modified ?modified . }

  OPTIONAL { ?parent logies:heeftAlternatieveUitbating ?product . }
  BIND(IF(BOUND(?parent), "PROMO", "BASE") as ?productType)

  ?product tvl:belongsToStatisticalRegion/skos:prefLabel ?statisticalRegion .

  ?product logies:onthaalAdres ?address .
  ?address locn:adminUnitL2 ?province .

  %PROVINCE_FILTER%

  OPTIONAL { ?address locn:thoroughfare ?street . }
  OPTIONAL { ?address adres:Adresvoorstelling.huisnummer ?houseNumber . }
  OPTIONAL { ?address adres:Adresvoorstelling.busnummer ?boxNumber . }
  OPTIONAL { ?address locn:postCode ?postalCode . }
  OPTIONAL { ?address adres:gemeentenaam ?cityName . }

  OPTIONAL {
    ?product logies:onthaalLocatie ?location .
    OPTIONAL { ?location wgs:lat ?lat . }
    OPTIONAL { ?location wgs:long ?long . }
  }

  OPTIONAL { ?product logies:behoortTotToeristischeRegio/skos:prefLabel ?promotionalRegion . }

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
    ?product logies:heeftKwaliteitslabel ?greenKeyLabel .
    ?greenKeyLabel skos:prefLabel "Green Key"@nl .
  }

  OPTIONAL {
    ?product logies:heeftKwaliteitslabel ?accessibilityLabel .
    ?accessibilityLabel skos:prefLabel ?accessibilityPrefLabel .
    FILTER (CONTAINS(STR(?accessibilityPrefLabel), "Toegankelijkheidslabel"))
  }


  OPTIONAL {
    ?product schema:offeredBy ?agent .
    ?agent a org:Organisation .
    OPTIONAL { ?agent skos:prefLabel ?agentCompanyName . }
    OPTIONAL { ?agent adms:identifier/skos:notation ?agentIdentifier . }
    OPTIONAL {
      ?agent schema:contactPoint ?agentContactPoint .
      OPTIONAL { ?agentContactPoint schema:email ?agentEmail . }
      OPTIONAL { ?agentContactPoint foaf:page ?agentWebsite . }
      OPTIONAL { ?agent foaf:firstName ?agentFirstName . }
      OPTIONAL { ?agent foaf:givenName ?agentLastName . }
      OPTIONAL { ?agent vcard:honorificPrefix ?agentTitle . }
      OPTIONAL {
        ?agentContactPoint locn:address ?agentAddress .
        OPTIONAL { ?agentAddress locn:thoroughfare ?agentStreet . }
        OPTIONAL { ?agentAddress adres:Adresvoorstelling.huisnummer ?agentHouseNumber . }
        OPTIONAL { ?agentAddress adres:Adresvoorstelling.busnummer ?agentBoxNumber . }
        OPTIONAL { ?agentAddress locn:postCode ?agentPostalCode . }
        OPTIONAL { ?agentAddress adres:gemeentenaam ?agentCityName . }
      }
    }
  }

  OPTIONAL {
    ?productOwner schema:owns ?product .
    ?productOwner a org:Organisation .
    OPTIONAL { ?productOwner skos:prefLabel ?productOwnerCompanyName . }
    OPTIONAL { ?productOwner adms:identifier/skos:notation ?productOwnerIdentifier . }
    OPTIONAL {
      ?productOwner schema:contactPoint ?productOwnerContactPoint .
      OPTIONAL { ?productOwnerContactPoint schema:email ?productOwnerEmail . }
      OPTIONAL { ?productOwnerContactPoint foaf:page ?productOwnerWebsite . }
      OPTIONAL { ?productOwner foaf:firstName ?productOwnerFirstName . }
      OPTIONAL { ?productOwner foaf:givenName ?productOwnerLastName . }
      OPTIONAL { ?productOwner vcard:honorificPrefix ?productOwnerTitle . }
      OPTIONAL {
        ?productOwnerContactPoint locn:address ?productOwnerAddress .
        OPTIONAL { ?productOwnerAddress locn:thoroughfare ?productOwnerStreet . }
        OPTIONAL { ?productOwnerAddress adres:Adresvoorstelling.huisnummer ?productOwnerHouseNumber . }
        OPTIONAL { ?productOwnerAddress adres:Adresvoorstelling.busnummer ?productOwnerBoxNumber . }
        OPTIONAL { ?productOwnerAddress locn:postCode ?productOwnerPostalCode . }
        OPTIONAL { ?productOwnerAddress adres:gemeentenaam ?productOwnerCityName . }
      }
    }
  }
} ORDER BY ?type ?name ?product LIMIT %LIMIT% OFFSET %OFFSET%`;
    this.perRowQueries = [
      {
        type: 'multi-value',
        query: `PREFIX schema: <http://schema.org/>
       SELECT DISTINCT ?telephone
       %FROM%
       WHERE {
         <%s%> schema:contactPoint ?contactPoint .
         FILTER NOT EXISTS { ?contactPoint schema:contactType ?contactType . }
         ?contactPoint schema:telephone ?telephone .
       }`,
      },
      {
        type: 'multi-value',
        query: `PREFIX schema: <http://schema.org/>
       PREFIX org: <http://www.w3.org/ns/org#>
       SELECT DISTINCT ?agentTelephone
       %FROM%
       WHERE {
         <%s%> schema:offeredBy ?agent .
         ?agent a org:Organisation .
         ?agent schema:contactPoint ?agentContactPoint .
         ?agentContactPoint schema:telephone ?agentTelephone .
       }`
      },
      {
        type: 'multi-value',
        query: `PREFIX schema: <http://schema.org/>
       PREFIX org: <http://www.w3.org/ns/org#>
       SELECT DISTINCT ?productOwnerTelephone
       %FROM%
       WHERE {
         ?productOwner schema:owns <%s%> .
         ?productOwner a org:Organisation .
         ?productOwner schema:contactPoint ?productOwnerContactPoint .
         ?productOwnerContactPoint schema:telephone ?productOwnerTelephone .
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
      }
    ];
  }

  batchedQuery(limit, offset) {
    return super.batchedQuery(limit, offset)
      .replace('%PROVINCE_FILTER%', this.filter);
  }
}