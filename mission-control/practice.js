// Predefined examples run actual JavaScript. No player-supplied code is evaluated.
export const acceptsShipId = value => Number.isInteger(value) && value >= 0;
export function validationExamples() {
  return [0,7,-1,2.5,'',null].map(value => ({
    input: JSON.stringify(value),
    before: Boolean(value),
    after: acceptsShipId(value)
  }));
}
export function completionRate(completed, started) {
  if (!Number.isInteger(completed) || !Number.isInteger(started) || completed < 0 || started <= 0 || completed > started) return null;
  return completed / started * 100;
}
