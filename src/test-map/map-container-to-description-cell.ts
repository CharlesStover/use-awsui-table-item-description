import DESCRIPTION_CELL_ERROR from '../test-constants/description-cell-error';
import mapContainerToTbody from '../test-map/map-container-to-tbody';

const SECOND = 1;

export default function mapContainerToDescriptionCell(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  container: HTMLElement,
): HTMLTableCellElement {
  const tbody: HTMLTableSectionElement = mapContainerToTbody(container);

  const td: HTMLTableCellElement | null = tbody
    .getElementsByTagName('td')
    .item(SECOND);
  if (td === null) {
    throw DESCRIPTION_CELL_ERROR;
  }

  return td;
}
