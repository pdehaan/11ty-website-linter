const S = require("fluent-json-schema");

const baseSchema = S.object()
  .raw({ $async: true })
  .additionalProperties(false);

module.exports.community = S.object()
	.id("community")
	.definition(
		"keys",
		S.enum([
			"api-services-avatar",
			"api-services-opengraph",
			"api-services-screenshot",
			"api-services-sparkline",
			"collections",
			"data-cascade",
			"data",
			"getting-started",
			"image",
			"javascript",
			"plugins",
			"quicktips",
			"serverless",
			"tutorial-blog",
			"tutorial-intro",
			"tutorial-simplewebsite",
		]).id("#keys")
	)
  // Required Properties
	.prop("author", S.string().minLength(1).required())
	.prop("key", S.ref("#keys").required())
	.prop("title", S.string().minLength(1).required())
	.prop("url", S.string().format(S.FORMATS.URI).required())
  // Misc
  .extend(baseSchema)
	.valueOf();

module.exports.demos = S.object()
	.id("demos")
	.definition(
		"category",
		S.array()
			.items(S.enum(["serverless"]))
			.minItems(1)
			.id("#category")
	)
	// Required Properties
	.prop("category", S.ref("#category").required())
	.prop("name", S.string().minLength(1).required())
	.prop("url", S.string().format(S.FORMATS.URI).minLength(1).required())
	// Optional Properties
	.prop("description", S.string())
	.prop("twitter", S.string())
	.prop("source_url", S.string().format(S.FORMATS.URI))
	.prop("authoredBy", S.array().items(S.string().minLength(1)).minItems(1))
  // Misc
  .extend(baseSchema)
	.valueOf();

module.exports.plugins = S.object()
	.id("plugins")
	// Required Properties
	.prop("description", S.string().minLength(1).required())
	.prop("npm", S.string().minLength(1).required())
	// Optional Properties
	.prop("author", S.string().minLength(1))
	.prop("deprecated", S.string())
  // Misc
  .extend(baseSchema)
	.valueOf();

module.exports.sites = S.object()
	.id("sites")
	// Definitions
	.definition("uri", S.string().id("#uri").format(S.FORMATS.URI))
	.definition(
		"business",
		S.object()
			.id("#business")
			.prop("cta", S.ref("#uri").required())
			// Optional
			.prop("availability", S.string())
			.prop("name", S.string().minLength(1))
	)
	// Required Properties
	.prop("name", S.string().minLength(1).required())
	// Optional Properties
	.prop("authoredBy", S.array().items(S.string().minLength(1)))
	.prop("business", S.ref("#business"))
	.prop("demo", S.ref("#uri"))
	.prop("description", S.string())
	.prop("disabled", S.boolean())
	.prop("excludedFromLeaderboards", S.boolean())
	.prop("featured", S.boolean())
	.prop("hideOnHomepage", S.boolean())
	.prop("launch_post", S.ref("#uri"))
	.prop("source_url", S.oneOf([S.ref("#uri"), S.const("")]))
	.prop("superfeatured", S.boolean())
	.prop("twitter", S.string())
	.prop("url", S.ref("#uri"))
  // Misc
  .extend(baseSchema)
	.valueOf();

module.exports.starters = S.object()
	.id("starters")
	// Required properties
	.prop("description", S.string().minLength(1).required())
	.prop("name", S.string().minLength(1).required())
	.prop("url", S.string().format(S.FORMATS.URI).minLength(1).required())
	// Optional properties
	.prop("author", S.string().minLength(1))
	.prop("demo", S.string().format(S.FORMATS.URI).minLength(1))
	.prop("disabled", S.boolean())
	.prop("excludedFromLeaderboards", S.boolean())
	.prop("featured", S.boolean())
	.prop("npmStartScript", S.string().minLength(1))
	.prop("official", S.boolean())
	.prop("order", S.integer())
	.prop("source_url", S.string().format(S.FORMATS.URI).minLength(1))
  // Misc
  .extend(baseSchema)
	.valueOf();
