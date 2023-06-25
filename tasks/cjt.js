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
  columnSpec = [
    { source: 'product_id', value: 'business_product_id' },
	  { source: 'name', value: 'name' },
	  { source: 'alt_name', value: 'name_or_number' },
	  { source: 'category', value: 'discriminator' },
	  { source: 'product_type', value: 'product_type' },
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
    { source: '', value: 'notification_date' },
    { source: '', value: 'acknowledgement_date' },
	  { source: 'rating', value: 'comfort_class' },
	  { source: 'number_of_units', value: 'number_of_units' },
	  { source: 'maximum_capacity', value: 'maximum_capacity' },
	  { source: 'fire_safety_certificate_experiation_date', value: 'fire_safety_certificate_expiration_date' },
	  { source: 'fire_safety_advice', value: 'fire_safety_advice' },
    { source: 'file_number', value: 'file_number' },
    { source: '', value: 'tva_type' },
    { source: '', value: 'tva_acknowledgement' },
    { source: 'tva_capacity', value: 'tva_capacity' },
    { source: 'tva_capacity_description', value: 'tva_capacity_description' },
    { source: '', value: 'tva_acknowledgement_old' },
 	  { source: '', value: 'tva_capacity_old' },
 	  { source: 'tva_contact', value: 'tva_contact_contact_id' },
 	  { source: 'tva_contact_title', value: 'tva_contact_title' },
 	  { source: 'tva_contact_first_name', value: 'tva_contact_first_name' },
 	  { source: 'tva_contact_last_name', value: 'tva_contact_last_name' },
 	  { source: 'tva_contact_street', value: 'tva_contact_street' },
 	  { source: 'tva_contact_house_number', value: 'tva_contact_house_number' },
 	  { source: 'tva_contact_box_number', value: 'tva_contact_box_number' },
 	  { source: 'tva_contact_city_name', value: 'tva_contact_city_name' },
 	  { source: 'tva_contact_postal_code', value: 'tva_contact_postal_code' },
 	  { source: 'tva_contact_telephone', value: 'tva_contact_phone1' },
 	  { source: 'tva_contact_telephone_2', value: 'tva_contact_phone2' },
 	  { source: 'tva_contact_telephone_3', value: 'tva_contact_phone3' },
 	  { source: 'tva_contact_email', value: 'tva_contact_email' },
 	  { source: 'tva_contact_website', value: 'tva_contact_website' },
 	  { source: 'tva_organization', value: 'tva_organization_contact_id' },
 	  { source: 'tva_organisation_identifier', value: 'tva_organization_company_identification' },
 	  { source: 'tva_organisation_name', value: 'tva_organization_company_name' },
 	  { source: 'tva_organisation_street', value: 'tva_organization_street' },
 	  { source: 'tva_organisation_house_number', value: 'tva_organization_house_number' },
 	  { source: 'tva_organisation_box_number', value: 'tva_organization_box_number' },
 	  { source: 'tva_organisation_city_name', value: 'tva_organization_city_name' },
 	  { source: 'tva_organisation_postal_code', value: 'tva_organization_postal_code' },
 	  { source: 'tva_organisation_telephone', value: 'tva_organization_phone1' },
 	  { source: 'tva_organisation_telephone_2', value: 'tva_organization_phone2' },
 	  { source: 'tva_organisation_telephone_3', value: 'tva_organization_phone3' },
 	  { source: 'tva_organisation_email', value: 'tva_organization_email' },
 	  { source: 'tva_organisation_website', value: 'tva_organization_website' },
 	  { source: '', value: 'tva_acknowledgement_date' },
 	  { source: '', value: 'tva_principal_acknowledgement_date' },
 	  { source: '', value: 'tva_revoke_date' },
 	  { source: '', value: 'tva_suspension_date' },
 	  { source: '', value: 'tva_suspension_removal_date' },
 	  { source: '', value: 'deleted' },
 	  { source: 'green_key_label', value: 'green_key_labeled' },
 	  { source: 'accessibility_pref_label', value: 'accessibility_label' },
 	  { source: 'modified', value: 'changed_time' }
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
?maximumCapacity
?fireSafetyCertificateExperiationDate
?fireSafetyAdvice
?fileNumber
?greenKeyLabel
?accessibilityLabel
?tvaCapacity
?tvaCapacityDescription
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
        <http://linked.toerismevlaanderen.be/id/concepts/4f269330-bc00-41e9-8928-1a454f38e760>,
        <http://linked.toerismevlaanderen.be/id/concepts/f9305a29-0508-4e24-8615-f83bd4bf84a7>
  ))
  ?registrationStatus tvl:sqlKey ?registrationStatusLabel .

  OPTIONAL { ?registration dct:type/tvl:sqlKey ?category .  }
  OPTIONAL { ?registration prov:qualifiedGeneration/prov:atTime ?registrationDate . }
  OPTIONAL { ?registration prov:qualifiedInvalidation/prov:atTime ?registrationInvalidationDate . }


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
    ?product schema:starRating/schema:ratingValue ?ratingValue .
    ?internalKey tvl:sqlKey ?rating ; tvl:linkedKey ?ratingValue .
  }

  OPTIONAL { ?product logies:aantalVerhuureenheden ?numberOfUnits . }
  OPTIONAL { ?product logies:aantalSlaapplaatsen ?maximumCapacity . }

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
    ?product logies:heeftKwaliteitslabel ?greenKey .
    BIND(IF(BOUND(?greenKey), 1, 0) as ?greenKeyLabel)
  }

  OPTIONAL {
    ?product logies:heeftKwaliteitslabel ?accessibilityLabel .
    ?accessibilityLabel skos:prefLabel ?accessibilityPrefLabel .
    FILTER (CONTAINS(STR(?accessibilityPrefLabel), "Toegankelijkheidslabel"))
  }

  OPTIONAL {
    ?product a schema:QuantitativeValue ;
      schema:value ?tvaCapacity ;
      schema:unitText "TVA capaciteit"@nl .
  }

  OPTIONAL {
    ?product a schema:PropertyValue ;
      schema:value ?tvaCapacityDescription ;
      schema:unitText "TVA capaciteit"@nl .
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
