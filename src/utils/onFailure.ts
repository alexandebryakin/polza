import { Status } from '../api/graphql.types';
import { deepTransform } from './deepTransform';

type ErrorMessages = string[];
type Errors<ErrorKeys extends string = string> = { [field in ErrorKeys]: ErrorMessages };
type Resp<ErrorKeys extends string = string> = {
  status: Status | null;
  errors?: Errors<ErrorKeys>;
};
// type FnErrorsHandler<ErrorKeys extends string = string> = (errors: Errors<ErrorKeys>) => void;
type FnErrorsFor<ErrorKeys extends string = string> = (field: ErrorKeys) => ErrorMessages;
type FnErrorsHandler<ErrorKeys extends string = string> = (
  errorsFor: FnErrorsFor<ErrorKeys>,
  errors: Errors<ErrorKeys>
) => void;

export function onFailure<ErrorKeys extends string = string>(
  response: Resp<ErrorKeys> | null | undefined,
  errorsHandler: FnErrorsHandler<ErrorKeys>
) {
  if (response?.status !== Status.Failure) return;

  const errs = deepTransform(response.errors || {}) as Errors<ErrorKeys>;

  const errorsFor: FnErrorsFor<ErrorKeys> = (field: ErrorKeys): string[] => {
    return errs[field] || [];
  };

  errorsHandler(errorsFor, errs);
}
