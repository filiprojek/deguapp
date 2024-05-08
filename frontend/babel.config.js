module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["."],
					alias: {
						"@components": "./components",
						"@context": "./app/context",
						"@assets": "./assets",
					},
				},
			],
		],
	};
};
