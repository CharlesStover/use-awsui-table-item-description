import DESCRIPTION_ROW_ERROR from '../test-constants/description-row-error';
import mapContainerToTbody from '../test-map/map-container-to-tbody';

export default function mapContainerToDescriptionRow(
  container: HTMLElement,
): HTMLTableRowElement {
  const tbody: HTMLTableSectionElement = mapContainerToTbody(container);

  const tr: HTMLTableRowElement | null = tbody
    .getElementsByTagName('tr')
    .item(1);
  if (tr === null) {
    throw DESCRIPTION_ROW_ERROR;
  }

  return tr;
}
