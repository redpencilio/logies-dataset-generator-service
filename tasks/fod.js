import ExportTask from './export-task';

export default class FodExport extends ExportTask {
  title = `Basisregister met het capaciteitsaanbod voor de FOD Economie`;
  datasetType = 'http://linked.toerismevlaanderen.be/id/concepts/72035ee0-60bf-4de7-b467-4e8c54c13289';
  fileName = 'fod';
  permalink = '/perm/datasets/fod';
  graphs = [
    'http://mu.semte.ch/graphs/public',
    'http://mu.semte.ch/graphs/mapped/public',
    'http://mu.semte.ch/graphs/mapped/private/fod-economy'
  ];
  datasetGraph = 'http://mu.semte.ch/graphs/mapped/private/fod-economy'
  columnSpec = [
    { source: 'product_id', value: 'business_product_id' },
	  { source: '', value: 'legacy_tdb_subcategory_id' },
	  { source: '', value: 'legacy_vlis_id' },
	  { source: 'fod_id', value: 'statistical_id' },
	  { source: 'name', value: 'name' },
	  { source: 'fod_label', value: 'partnerlabel_fod' },
	  { source: 'alt_name', value: 'name_or_number' },
	  { source: 'fod_category', value: 'FOD_TYPE' },
	  { source: 'category', value: 'discriminator' },
	  { source: 'product_type', value: 'product_type' },
	  { source: '', value: 'parent_product_ids' }, // only base products included, thus always empty
	  { source: 'street', value: 'street' },
	  { source: 'house_number', value: 'house_number' },
	  { source: 'box_number', value: 'box_number' },
	  { source: 'postal_code', value: 'postal_code' },
	  { source: 'city_name', value: 'city_name' },
	  { source: 'promotional_region', value: 'promotional_region' },
    { source: 'statistical_region', value: 'statistical_region' },
	  { source: 'telephone', value: 'phone1' },
	  { source: 'telephone_2', value: 'phone2' },
	  { source: 'telephone_3', value: 'phone3' },
	  { source: 'email', value: 'email' },
	  { source: 'website', value: 'website' },
	  { source: '', value: 'deleted' },
 	  { source: 'modified', value: 'changed_time' },
    { source: 'registration_status_label', value: 'status' },
    { source: 'registration_date', value: 'last_status_change_date' },
	  { source: 'rating', value: 'comfort_class' },
	  { source: 'number_of_units', value: 'number_of_units' },
	  { source: 'maximum_capacity', value: 'maximum_capacity' },
	  { source: 'aantal_campingplaatsen_voor_kortverblijf', value: 'number_of_short_term_camping_spots' },
	  { source: 'aantal_toeristische_campingplaatsen', value: 'number_of_touristic_camping_spots' },
	  { source: 'aantal_staanplaatsen',value: 'number_of_camper_stands' },
	  { source: 'aantal_campingplaatsen', value: 'number_of_camping_spots' },
	  { source: 'aantal_wooneenheden', value: 'number_of_residence_units' },
	  { source: 'aantal_campingplaatsen_voor_lange_termijn', value: 'number_of_long_term_camping_spots' },
	  { source: 'aantal_wooneenheden_te_huur', value: 'number_of_residence_units_for_rental' },
	  { source: 'aantal_wandelaarshutten', value: 'number_of_hikers_huts' },
    { source: 'product_owner', value: 'product_owner_contact_id_fod' },
    { source: 'product_owner_company_identification', value: 'product_owner_company_identification_fod' },
    { source: 'product_owner_company_name', value: 'product_owner_company_name_fod' },
 	  { source: 'product_owner_title', value: 'product_owner_title_fod' },
 	  { source: 'product_owner_first_name', value: 'product_owner_first_name_fod' },
 	  { source: 'product_owner_last_name', value: 'product_owner_last_name_fod' },
 	  { source: 'product_owner_street', value: 'product_owner_street_fod' },
 	  { source: 'product_owner_house_number', value: 'product_owner_house_number_fod' },
 	  { source: 'product_owner_box_number', value: 'product_owner_box_number_fod' },
 	  { source: 'product_owner_city_name', value: 'product_owner_city_name_fod' },
 	  { source: 'product_owner_postal_code', value: 'product_owner_postal_code_fod' },
 	  { source: 'product_owner_telephone', value: 'product_owner_phone1_fod' },
 	  { source: 'product_owner_telephone_2', value: 'product_owner_phone2_fod' },
 	  { source: 'product_owner_telephone_3', value: 'product_owner_phone3_fod' },
 	  { source: 'product_owner_email', value: 'product_owner_email_fod' },
 	  { source: 'product_owner_website', value: 'product_owner_website_fod' },
 	  { source: 'agent', value: 'agent_contact_id_fod' },
    { source: 'agent_company_identification', value: 'agent_company_identification_fod' },
    { source: 'agent_company_name', value: 'agent_company_name_fod' },
 	  { source: 'agent_street', value: 'agent_street_fod' },
 	  { source: 'agent_house_number', value: 'agent_house_number_fod' },
 	  { source: 'agent_box_number', value: 'agent_box_number_fod' },
 	  { source: 'agent_city_name', value: 'agent_city_name_fod' },
 	  { source: 'agent_postal_code', value: 'agent_postal_code_fod' },
 	  { source: 'agent_telephone', value: 'agent_phone1_fod' },
 	  { source: 'agent_telephone_2', value: 'agent_phone2_fod' },
 	  { source: 'agent_telephone_3', value: 'agent_phone3_fod' },
 	  { source: 'agent_email', value: 'agent_email_fod' },
 	  { source: 'agent_website', value: 'agent_website_fod' }
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
?modified
?street
?houseNumber
?boxNumber
?postalCode
?cityName
?promotionalRegion
?statisticalRegion
?email
?website
?rating
?numberOfUnits
?capacity
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
?fodId
?fodLabel
?fodCategory
%FROM%
WHERE {
  ?product a logies:Logies .

  ?product logies:heeftRegistratie ?registration .
  ?registration logies:registratieStatus ?registrationStatus .
  FILTER (?registrationStatus != <http://linked.toerismevlaanderen.be/id/concepts/1ab08286-bc53-4a09-958d-e29b4acd76bf>)
  ?registrationStatus tvl:sqlKey ?registrationStatusLabel .
  OPTIONAL {
    ?registration dct:type/tvl:sqlKey ?type .
   }
  OPTIONAL {
    ?registration tvl:category ?categoryUri .
    ?categoryUri tvl:sqlKey ?category .

    OPTIONAL {
      ?categoryUri skos:relatedMatch/skos:notation ?fodCategory .
      FILTER(LANG(?fodCategory) = "nl")
    }
  }

  FILTER NOT EXISTS { ?parent logies:heeftAlternatieveUitbating ?product . }

  OPTIONAL {
    ?product adms:identifier ?tvlIdentifier .
    ?tvlIdentifier adms:schemaAgency "Toerisme Vlaanderen" ;
      skos:notation ?productId .
  }

  OPTIONAL { ?product schema:name ?name . }
  OPTIONAL { ?product schema:alternativeName ?altName . }
  OPTIONAL { ?product dct:modified ?modified . }

  OPTIONAL {
    ?product logies:onthaalAdres ?address .
    OPTIONAL { ?address locn:thoroughfare ?street . }
    OPTIONAL { ?address adres:Adresvoorstelling.huisnummer ?houseNumber . }
    OPTIONAL { ?address adres:Adresvoorstelling.busnummer ?boxNumber . }
    OPTIONAL { ?address locn:postCode ?postalCode . }
    OPTIONAL { ?address adres:gemeentenaam ?cityName . }
  }

  OPTIONAL { ?product logies:behoortTotToeristischeRegio/tvl:sqlKey ?promotionalRegion . }
  OPTIONAL { ?product tvl:belongsToStatisticalRegion/tvl:sqlKey ?statisticalRegion . }

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

  OPTIONAL {
    ?product adms:identifier ?fodIdentifier .
    ?fodIdentifier a adms:Identifier ;
      adms:schemaAgency "Federale Overheidsdienst Economie" ;
      skos:notation ?fodId .
  }

  OPTIONAL {
    ?product dct:identifier ?fodLabel .
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
      }
    ];
}
