# logies-dataset-generator-service
Microservice to generate and publish datasets for Toerisme Vlaanderen.

## Getting started
### Add the service to your stack
To add the service to your stack, add the following snippet to `docker-compose.yml`:

```yml
services:
  dataset-generator:
    image: redpencil/logies-dataset-generator-service
    volumes:
      - ./data/files:/share
```

`/share` contains the folder to which the generated datasets will bewritten. The volume mounted here must be the same volume as mounted in the [file-service](https://github.com/mu-semtech/file-service) if files must be downloadable by the end user.

Add the following snippet to `config/delta/rules.js` to trigger the dataset generation on each insertion of a Lodging TTL dataset:

```javascript
    match: {
      predicate: {
        type: 'uri',
        value: 'http://purl.org/dc/terms/type'
      },
      object: {
        type: 'uri',
        value: 'http://linked.toerismevlaanderen.be/id/dataset-types/ca82a1e3-8a7c-438e-ba37-cf36063ba060'
      }
    },
```

## Reference
### Configuration
#### Tasks
The conversion tasks are configured in `./app/tasks/index.js`. It's an array containing instances of `ExportTask`. Each task will generate a DCAT dataset and has the following properties:
* title: title of dataset
* datasetType: type of the dataset
* fileName: name of the file (without extension). A.o. used when a user downloads the file.
* graphs: array of graphs the task may query to generate the export
* datasetGraph: graph to which the resulting DCAT dataset must be written
* query: SPARQL select query template to construct the export. Contains placeholders like `%LIMIT%` and `%OFFSET%` for pagination.
* perRowQueries: SPARQL select queries to execute for each row in the resultset of `query`. Typically used for multi-valued properties.
  * type: one of `multi-value`, `join-value`, `label-value`. Defines strategy how values must be combined.
  * query: SPARQL select query that will be executed per row. The row subject must be referenced as `%s%` and will be replaced with the tourist attraction URI at execution time.
  
#### Environment variables
The following environment variables can be configured:
* `HOST_DOMAIN` (default https://linked.toerismevlaanderen.be) : host domain used to construct file download URLs


### API
#### POST /delta
Endpoint called by the delta-notifier if a new Loding TTL dataset gets inserted. Triggers the generation of the accompanying CSV datasets as configured in `./tasks/index.js`.

#### POST /datasets/:id/subsets
Manually trigger the generation of the accompanying CSV datasets for a given TTL dataset.
