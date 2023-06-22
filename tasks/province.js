import ExportTask from './export-task';

export default class ProvinceExport extends ExportTask {
  constructor(province, label, datasetType, filter) {
    super(...arguments);
    this.title = `Basisregister met het logiesaanbod voor ${label}`;
    this.datasetType = datasetType;
    this.fileName = `logies-${label.replace(/\s/g, '_')}`;
    this.permalink = `/perm/datasets/${province}`;
    this.graphs = [
      'http://mu.semte.ch/graphs/public',
      'http://mu.semte.ch/graphs/mapped/public',
      `http://mu.semte.ch/graphs/mapped/private/${province}`
    ];
    this.datasetGraph = `http://mu.semte.ch/graphs/mapped/private/${province}`;

    this.filter = filter;
    this.columnSpec = [
      { source: 'product_id', value: 'business_product_id' },
	    { source: '', value: 'legacy_tdb_subcategory_id' },
	    { source: '', value: 'legacy_vlis_id' },
	    { source: 'name', value: 'name' },
	    { source: 'alt_name', value: 'name_or_number' },
	    { source: 'category', value: 'discriminator' },
	    { source: 'product_type', value: 'product_type' },
	    { source: 'parent', value: 'parent_product_ids' },
	    { source: 'street', value: 'street' },
	    { source: 'house_number', value: 'house_number' },
	    { source: 'box_number', value: 'box_number' },
	    { source: 'postal_code', value: 'postal_code' },
	    { source: 'city_name', value: 'city_name' },
	    { source: 'promotional_region', value: 'promotional_region' },
      { source: 'statistical_region', value: 'statistical_region' },
	    { source: 'lat', value: 'lat' },
	    { source: 'long', value: 'long' },
	    { source: 'telephone', value: 'phone1' },
	    { source: 'telephone_2', value: 'phone2' },
	    { source: 'telephone_3', value: 'phone3' },
	    { source: 'email', value: 'email' },
	    { source: 'website', value: 'website' },
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
 	    { source: 'product_owner', value: 'product_owner_contact_id' },
      { source: '', value: 'product_owner_share_with_partners' },
      { source: 'product_owner_company_identification', value: 'product_owner_company_identification' },
      { source: 'product_owner_company_name', value: 'product_owner_company_name' },
 	    { source: 'product_owner_title', value: 'product_owner_title' },
 	    { source: 'product_owner_first_name', value: 'product_owner_first_name' },
 	    { source: 'product_owner_last_name', value: 'product_owner_last_name' },
 	    { source: 'product_owner_street', value: 'product_owner_street' },
 	    { source: 'product_owner_house_number', value: 'product_owner_house_number' },
 	    { source: 'product_owner_box_number', value: 'product_owner_box_number' },
 	    { source: 'product_owner_city_name', value: 'product_owner_city_name' },
 	    { source: 'product_owner_postal_code', value: 'product_owner_postal_code' },
 	    { source: 'product_owner_telephone', value: 'product_owner_phone1' },
 	    { source: 'product_owner_telephone_2', value: 'product_owner_phone2' },
 	    { source: 'product_owner_telephone_3', value: 'product_owner_phone3' },
 	    { source: 'product_owner_email', value: 'product_owner_email' },
 	    { source: 'product_owner_website', value: 'product_owner_website' },
 	    { source: 'agent', value: 'agent_contact_id' },
      { source: '', value: 'agent_share_with_partners' },
      { source: 'agent_company_identification', value: 'agent_company_identification' },
      { source: 'agent_company_name', value: 'agent_company_name' },
 	    { source: 'agent_title', value: 'agent_title' },
 	    { source: 'agent_first_name', value: 'agent_first_name' },
 	    { source: 'agent_last_name', value: 'agent_last_name' },
 	    { source: 'agent_street', value: 'agent_street' },
 	    { source: 'agent_house_number', value: 'agent_house_number' },
 	    { source: 'agent_box_number', value: 'agent_box_number' },
 	    { source: 'agent_city_name', value: 'agent_city_name' },
 	    { source: 'agent_postal_code', value: 'agent_postal_code' },
 	    { source: 'agent_telephone', value: 'agent_phone1' },
 	    { source: 'agent_telephone_2', value: 'agent_phone2' },
 	    { source: 'agent_telephone_3', value: 'agent_phone3' },
 	    { source: 'agent_email', value: 'agent_email' },
 	    { source: 'agent_website', value: 'agent_website' },
 	    { source: '', value: 'deleted' },
 	    { source: 'green_key_label', value: 'green_key_labeled' },
 	    { source: 'accessibility_pref_label', value: 'accessibility_label' },
 	    { source: 'modified', value: 'changed_time' }
    ];
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
?productId
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
?maximumCapacity
?greenKeyLabel
?accessibilityPrefLabel
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
  ?registrationStatus tvl:sqlKey ?registrationStatusLabel .
  OPTIONAL {
    ?registration dct:type/tvl:sqlKey ?type .
   }
  OPTIONAL {
    ?registration tvl:category/tvl:sqlKey ?category .
  }

  OPTIONAL {
    ?product adms:identifier ?tvlIdentifier .
    ?tvlIdentifier adms:schemaAgency "Toerisme Vlaanderen" ;
      skos:notation ?productId .
  }

  OPTIONAL { ?product schema:name ?name . }
  OPTIONAL { ?product schema:alternativeName ?altName . }
  OPTIONAL { ?product dct:modified ?modified . }

  OPTIONAL { ?parent logies:heeftAlternatieveUitbating ?product . }
  BIND(IF(BOUND(?parent), "PROMO", "BASE") as ?productType)

  ?product tvl:belongsToStatisticalRegion/tvl:sqlKey ?statisticalRegion .

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

  OPTIONAL { ?product logies:aantalVerhuureenheden ?numberOfUnits . }
  OPTIONAL { ?product logies:aantalSlaapplaatsen ?maximumCapacity . }

  OPTIONAL {
    ?product logies:heeftKwaliteitslabel ?greenKey .
    BIND(IF(BOUND(?greenKey), 1, 0) as ?greenKeyLabel)
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
} ORDER BY ?name ?product LIMIT %LIMIT% OFFSET %OFFSET%`;
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
