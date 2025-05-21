export async function request(path = "", body = {}) {
	const result = { success: false, message: "App fetch failed" };

	try {
		const response = await fetch("/api" + path, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});

		if (response.status === 200 && response.ok) {
			return await response.json();
		}
	} catch (error) {
		result.error = error;
	}

	return result;
}

export function formatMoney(value = 0, format = "") {
	return format.format({ value });
}

export function getFormFieldData(data = {}) {
	return Object.entries(data).reduce(function (accumulator, entry) {
		const [key, value] = entry;

		if (value === null || value === undefined) {
			accumulator[key] = value;
		} else if (value.constructor === Object) {
			accumulator[key] = getFormFieldData(value);
		} else if (value.constructor === Array) {
			accumulator[key] = value.map(getFormFieldData);
		} else if (value.constructor === String) {
			accumulator[key] = value.trim();
		} else {
			accumulator[key] = value;
		}

		return accumulator;
	}, {});
}

export function validateFormField(data = {}) {
	return Object.entries(data).every(function (entry) {
		const [key, value] = entry;

		if (value === null || value === undefined) {
			return false;
		} else if (value.constructor === Object) {
			return validateFormField(value);
		} else if (value.constructor === Array) {
			return value.every(validateFormField);
		} else if (value.constructor === String) {
			if (["placeholder", "helpText", "value"].includes(key)) {
				return true;
			} else if (value.length === 0) {
				return false;
			}
		}

		return true;
	}, {});
}

export function getFormFieldErrors(data = {}) {
	return Object.entries(data).reduce(function (accumulator, entry) {
		const [key, value] = entry;

		if (value === null || value === undefined) {
			accumulator[key] = "invalid";
		} else if (value.constructor === Object) {
			accumulator[key] = getFormFieldErrors(value);
		} else if (value.constructor === Array) {
			accumulator[key] = value.map(getFormFieldErrors);
		} else if (value.constructor === String) {
			if (["placeholder", "helpText", "value"].includes(key)) {
				accumulator[key] = "";
			} else if (value.length === 0) {
				accumulator[key] = "empty";
			} else {
				accumulator[key] = "";
			}
		} else {
			accumulator[key] = "";
		}

		return accumulator;
	}, {});
}
