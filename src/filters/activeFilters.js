/**
 * Filter options list objects to the ones that 
 * are active. Map the active options to their code,
 * which represents the format in which they will be
 * sent as parameters. 
 * 
 * @param {array} option options array
 * @returns comma separated options
 */
export function getActiveFilter(option) {
  const filteredOption = option.filter((option) => option.active);
  const selectedOptions = filteredOption.map((option) => option.code);
  return selectedOptions.join();
}

export function getTraitActive(trait, traitOptions) {
    const filteredOption = traitOptions
    .filter(option => option.name.toLowerCase() === trait.toLowerCase());

    if (filteredOption.length > 0) {
        return filteredOption[0].active;
    }
}
