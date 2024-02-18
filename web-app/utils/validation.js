exports.emailValidation = (value) => {
    value = value.toLowerCase();
    const pattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(value);
}

exports.nameValidation = (value) => {
    const pattern = /^[a-zA-Z\s]+$/;
    return pattern.test(value);
}

exports.missingFieldValidation = (value) => {
    return value && typeof value === "string";
}
