import mapContainerToTbody from '../test-map/map-container-to-tbody';

export default function mapContainerToDescriptionCell(
  container: HTMLElement,
): HTMLTableCellElement {
  const tbody: HTMLTableSectionElement = mapContainerToTbody(container);

  const td: HTMLTableCellElement | null = tbody
    .getElementsByTagName('td')
    .item(0);
  if (td === null) {
    throw new Error('Could not find item cell.');
  }

  return td;
}
