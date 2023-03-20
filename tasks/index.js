import CjtExport from './cjt';
import ProvinceExport from './province';
import FodExport from './fod';
import PublicExport from './public';

export default [
  new PublicExport(),
  new CjtExport(),
  new FodExport(),
  new ProvinceExport(
    'province-antwerp',
    'Toerisme Provincie Antwerpen',
    'http://linked.toerismevlaanderen.be/id/concepts/64519c70-d12f-4a11-9fb4-555da303c895',
    `FILTER (STR(?province) = 'Antwerpen' || STR(?statisticalRegion) = 'Scheldeland')`
  ),
  new ProvinceExport(
    'province-flemish-brabant',
    'Toerisme Provincie Vlaams-Brabant',
    'http://linked.toerismevlaanderen.be/id/concepts/5305baa9-b10d-45f5-b19c-d2a50621cf1a',
    `FILTER (STR(?province) = 'Vlaams-Brabant')`
  ),
  new ProvinceExport(
    'province-east-flanders',
    'Toerisme Provincie Oost-Vlaanderen',
    'http://linked.toerismevlaanderen.be/id/concepts/038e331f-caa9-45b9-937b-908c119aaef6',
    `FILTER (STR(?province) = 'Oost-Vlaanderen' || STR(?statisticalRegion) = 'Scheldeland' || STR(?statisticalRegion) = 'Leiestreek')`
  ),
  new ProvinceExport(
    'province-west-flanders',
    'Toerisme Provincie West-Vlaanderen',
    'http://linked.toerismevlaanderen.be/id/concepts/9b26a421-67df-444b-9d18-5d31fa1cc9bc',
    `FILTER (STR(?province) = 'West-Vlaanderen' || STR(?statisticalRegion) = 'Leiestreek')`
  ),
  new ProvinceExport(
    'province-limburg',
    'Toerisme Provincie Limburg',
    'http://linked.toerismevlaanderen.be/id/concepts/5acf8710-5bba-4ab6-8021-31eb555a1b47',
    `FILTER (STR(?province) = 'Limburg')`
  )
];
