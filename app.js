import bodyParser from 'body-parser';
import { app, errorHandler } from 'mu';
import tasks from './tasks';
import { fetchDataset, addCsvExport, findFileByUrl, HOST_DOMAIN } from './support';

app.use(bodyParser.json({ type: function(req) { return /^application\/json/.test(req.get('content-type')); } }));

app.get('/perm/*', async function(req, res) {
  const url = `${HOST_DOMAIN}/perm/${req.params[0]}`;
  console.log(`Trying to find file with permalink ${url}`);

  try {
    new URL(url); // ensure valid URL
    const file = await findFileByUrl(url);
    if (file) {
      const downloadUrl = `/files/${file.id}/download`;
      res.redirect(302, downloadUrl);
    } else {
      res.status(404).send();
    }
  } catch (e) {
    console.log(`Invalid URL. Cannot find corresponding file for it`);
    console.log(e);
    res.status(400).send();
  }
});

app.post('/delta', async function(req, res) {
  const lodgingTtlDatasets = req.body
        .map((changeset) => changeset.inserts)
        .filter((inserts) => inserts.length > 0)
        .flat()
        .filter((insert) => insert.predicate.value === 'http://purl.org/dc/terms/type')
        .filter((insert) => insert.object.value === 'http://linked.toerismevlaanderen.be/id/dataset-types/ca82a1e3-8a7c-438e-ba37-cf36063ba060')
        .map((insert) => insert.subject.value);

  if (lodgingTtlDatasets.length) {
    console.log(`${lodgingTtlDatasets.length} new lodging TTL dataset(s) have been inserted. Going to generate the CSV datasets for it.`);
    res.status(202).send();
    for (const dataset of lodgingTtlDatasets) {
      await generateCsvExports(dataset);
    }
  } else {
    console.log('No lodging TTL dataset found in delta. Nothing should happen');
    res.status(204).send();
  }
});

app.post('/datasets/:id/subsets', async function(req, res) {
  const dataset = await fetchDataset(req.params.id);
  if (dataset) {
    const distributions = await generateCsvExports(dataset);
    res.send({ data: distributions });
  } else {
    res.status(404).send();
  }
});

async function generateCsvExports(dataset) {
  console.log(`Going to generate CSV exports for dataset <${dataset}>`);
  const distributions = [];
  for (const task of tasks) {
    console.log(`Generating CSV export "${task.title}"`);
    const distribution = await addCsvExport(task, dataset);
    distributions.push(distribution);
  }
  return distributions;
}

app.use(errorHandler);
