import { RenderHookOptions } from '@testing-library/react-hooks';
import { UseAwsuiTableItemDescriptionProps } from '..';
import TestItem from '../test-types/test-item';

type TestRenderHookOptions = RenderHookOptions<
  UseAwsuiTableItemDescriptionProps<TestItem>
>;

export default TestRenderHookOptions;
