
export const parseJSON = jsonString => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error(
      'Erreur lors de la conversion de la chaîne JSON :',
      error.message
    );
    return {};
  }
};

export const stringifyJSON = jsonString => {
  try {
    return JSON.stringify(jsonString);
  } catch (error) {
    console.error(
      'Erreur lors de la conversion de la chaîne JSON :',
      error.message
    );
    return {};
  }
};
