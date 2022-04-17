/**
 * Parameters of get animal query.
 * All lists will be filtered for active = true,
 * mapped to its name and then combined using
 * Array.join method.
 */
export const getSize = () => {
  return [
    {
      name: "small",
      active: false,
      code: "small",
      isSize: true,
    },
    {
      name: "medium",
      active: false,
      code: "medium",
      isSize: true,
    },
    {
      name: "large",
      active: false,
      code: "large",
      isSize: true,
    },
    {
      name: "extra large",
      active: false,
      code: "Extra Large",
      isSize: true,
    },
  ];
}

export const getGender = () => {
  return [
    {
      name: "male",
      active: false,
      code: "male",
      isGender: true,
    },
    {
      name: "female",
      active: false,
      code: "female",
      isGender: true,
    },
    {
      name: "unknown",
      active: false,
      code: "unknown",
      isGender: true,
    },
  ];
}

export const getAge = () => {
  return [
    {
      name: "baby",
      active: false,
      code: "baby",
      isAge: true,
    },
    {
      name: "young",
      active: false,
      code: "young",
      isAge: true,
    },
    {
      name: "adult",
      active: false,
      code: "adult",
      isAge: true,
    },
    {
      name: "senior",
      active: false,
      code: "senior",
      isAge: true,
    },
  ];
}

export const getCoat = () => {
  return [
    {
      name: "short",
      active: false,
      code: "short",
      isCoat: true,
    },
    {
      name: "medium coat",
      active: false,
      code: "medium",
      isCoat: true,
    },
    {
      name: "long",
      active: false,
      code: "long",
      isCoat: true,
    },
    {
      name: "wire",
      active: false,
      code: "wire",
      isCoat: true,
    },
    {
      name: "hairless",
      active: false,
      code: "hairless",
      isCoat: true,
    },
    {
      name: "curly",
      active: false,
      code: "curly",
      isCoat: true,
    },
  ];
}

export const getStatus = () => {
  return [
    {
      name: "adoptable",
      active: false,
      code: "adoptable",
      isStatus: true,
    },
    {
      name: "adopted",
      active: false,
      code: "adopted",
      isStatus: true,
    },
    {
      name: "found",
      active: false,
      code: "found",
      isStatus: true,
    },
  ];
}

export function transformType(data) {
  return data.map((data) => {
    return { ...data, code: data.name, active: false, isType: true };
  });
}

export function transformOrganizations(data) {
  return data.map((data) => {
    return { ...data, code: data.id, active: false, isOrganization: true };
  });
}

export function transformBreeds(data) {
  return data.map((data) => {
    return {
      ...data,
      code: data.name,
      active: false,
      isBreed: true,
      dependsOnType: true,
    };
  });
}

export function getColors(typeName, typeOptions) {
  if (typeName && typeOptions && typeOptions.length > 0) {
    const filteredType = typeOptions.filter((type) => type.name === typeName);
    const type = filteredType[0];
    const transformedColors = type.colors.map((color) => {
      return {
        name: color,
        code: color,
        active: false,
        isColor: true,
        dependsOnType: true,
      };
    });
    return transformedColors;
  }
}
