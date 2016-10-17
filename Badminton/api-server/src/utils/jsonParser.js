
var JsonParser = {
	jsonSchemaToMongoose: function(schema) {
		var mongooseSchema = {};
		if (schema.schema && schema.schema.properties) {
			for (var k in schema.schema.properties) {
				var type = String, pattern = "";
				mongooseSchema[k] = {"type": type};
				if (schema.schema.required && schema.schema.required.indexOf(k) !== -1) {
					mongooseSchema[k].required = [true]
				}
				if (schema.schema.properties[k].format) {
					switch (schema.schema.properties[k].format) {
						case "email":
							pattern = "^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$";
							break;
						case "phoneNumber":
							pattern = "^0[1-9]([-. ]?[0-9]{2}){4}$";
							break;
					}
				} else {
					pattern = schema.schema.properties[k].pattern;
				}
				if (pattern) {
					mongooseSchema[k].validate = {
						validator: (function(pattern, k) {
							return function(v) {
								try {
									var reg = new RegExp(pattern);
									return reg.test(v);
								} catch (e) {
									return false;
								}
							}
						})(pattern, k)
					}
				}
			}
		}
		return mongooseSchema;
	}
}
module.exports = JsonParser;