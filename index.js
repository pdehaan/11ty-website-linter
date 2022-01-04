#!/usr/bin/env node

const path = require("node:path");

const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const glob = require("fast-glob");

const schemas = require("./schemas");

const schemaMap = {
  "community/*.js": schemas.community,
  "demos/*.js": schemas.demos,
  "plugins/*.json": schemas.plugins,
  "sites/*.json": schemas.sites,
  "starters/*.json": schemas.starters,
};

main(schemaMap, "./src/_data");

async function main(schemaMap = {}, pathPrefix = "", $dirname=process.cwd()) {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  const errors = {};
  for (const [fileGlob, schema] of Object.entries(schemaMap)) {
    const validate = ajv.compile(schema);
    const absFileGlob = path.join($dirname, pathPrefix, fileGlob);
    const badFileGlob = path.join(path.dirname(absFileGlob), "*");
    let dirErrors = [];
    let badFiles = await glob([`!${absFileGlob}`, badFileGlob]);
    badFiles = badFiles.map((file) => path.relative($dirname, file));
    if (badFiles.length === 0) {
      badFiles = undefined;
    }

    const files = await glob(absFileGlob);
    for (const file of files) {
      const relFilePath = path.relative($dirname, file);
      const data = require(file);
      try {
        await validate(data);
      } catch (err) {
        const $errors = err.errors.map((e) => ({
          file: relFilePath,
          data,
          error: e,
        }));
        dirErrors.push(...$errors);
      }
    }
    if (dirErrors.length === 0) {
      dirErrors = undefined;
    }
    if (dirErrors || badFiles) {
      errors[schema.$id] = { errors: dirErrors, badFiles };
    }
  }

  if (Object.keys(errors).length) {
    console.error(JSON.stringify(errors, null, 2));
    process.exitCode = 1;
  }
}
