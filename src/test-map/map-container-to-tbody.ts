export default function mapContainerToTbody(
  container: HTMLElement,
): HTMLTableSectionElement {
  const tbody: HTMLTableSectionElement | null = container
    .getElementsByTagName('tbody')
    .item(0);

  if (tbody === null) {
    throw new Error('Could not find tbody.');
  }

  return tbody;
}
