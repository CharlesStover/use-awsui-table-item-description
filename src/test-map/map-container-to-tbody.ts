const FIRST = 0;

export default function mapContainerToTbody(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  container: HTMLElement,
): HTMLTableSectionElement {
  const tbody: HTMLTableSectionElement | null = container
    .getElementsByTagName('tbody')
    .item(FIRST);

  if (tbody === null) {
    throw new Error('Could not find tbody.');
  }

  return tbody;
}
