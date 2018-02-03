const normalizeName = name => name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

export const isRequired = (value, allValues, props, name) => {
  if (!value) {
    return `${normalizeName(name)} is required`;
  }
}

export const minLength = (length) => {
  return (value, allValues, props, name) => {
    if (value.length < length) {
      return `${normalizeName(name)} is too short. ${length} minimum`;
    }
  }
}

export const isEmail = (value, allValues, props, name) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(value)) {
    return `${normalizeName(name)} is not valid`;
  }
}

export const matchField = (fieldName) => {
  return (value, allValues, props) => {
    return value !== allValues.get(fieldName) ? `Does not match "${normalizeName(fieldName)}"` : null;
  };
}
