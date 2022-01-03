import mapRowToCellClassName from './map-row-to-cell-class-name';

describe('mapRowToCellClassName', (): void => {
  it('should return null if no cells exist', (): void => {
    expect(mapRowToCellClassName(document.createElement('tr'))).toBeNull();
  });
});
