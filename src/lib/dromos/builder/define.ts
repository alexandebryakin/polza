import { Config, Notation } from './builder';
import { kebabize } from './kebabize';

type ICallable = (id?: ID) => string;
type ICallableResult = ICallable | string;
export type CallableFn = {
  (id?: ID): CallableFn | ICallableResult;
  [key: string]: CallableFn | ICallableResult;
};

export type RouteBuilder<DefineRoutesResult> = {
  structs: Struct<DefineRoutesResult>[];
  define: FnResourcesDefiner<DefineRoutesResult>;
};

export type ID = string | number;

type FnDefiner = <DefineRoutesResult>(root: RouteBuilder<DefineRoutesResult>) => void;

type ResourcesOptions = {
  notation?: Notation;
};
type Struct<DefineRoutesResult> = {
  name: string;
  options: ResourcesOptions;
  subbuilder: RouteBuilder<DefineRoutesResult> | null;
};

type FnSubroutesBuilderFn<DefineRoutesResult> = (
  subroutesBuilder: (builder: RouteBuilder<DefineRoutesResult>) => void
) => void;
type FnResourcesDefinerResult<DefineRoutesResult> = {
  subroutes: FnSubroutesBuilderFn<DefineRoutesResult>;
};
type FnResourcesDefiner<DefineRoutesResult> = (
  name: string,
  options?: ResourcesOptions
) => FnResourcesDefinerResult<DefineRoutesResult>;

const nonEmpty = (val: any) => !!val;

const TO_STRING_ALIAS = '_';

const _makeStringifiable = (f: ICallable): CallableFn => {
  const toString = () => f();
  // @ts-ignore
  const result: CallableFn = f;
  result.toString = toString;
  result[TO_STRING_ALIAS] = toString();
  return result;
};

const _transformName = (name: string, options: ResourcesOptions, config: Config) => {
  // const defaultNotation: Notation = 'camelCase';

  const isKebab = options.notation === 'kebab-case' || config.notation === 'kebab-case';

  return isKebab ? kebabize(name) : name;
};

const _buildSubroute = <DefineRoutesResult>(
  name: Struct<DefineRoutesResult>['name'],
  options: Struct<DefineRoutesResult>['options'],
  subbuilder: Struct<DefineRoutesResult>['subbuilder'],
  config: Config,
  prefix = ''
): CallableFn => {
  const result = (id?: string) => {
    const f = _makeStringifiable(() => {
      return [prefix, _transformName(name, options, config), id].filter(nonEmpty).join('/');
    });

    (subbuilder?.structs || []).forEach((struct) => {
      const rootPrefix = f().toString();

      const sub: CallableFn = _buildSubroute(struct.name, struct.options, struct.subbuilder, config, rootPrefix);

      f[struct.name] = sub;
    });

    return f;
  };

  return result as CallableFn;
};

const _convertStructsToRoutes = <DefineRoutesResult>(
  structs: Struct<DefineRoutesResult>[],
  config: Config
): DefineRoutesResult => {
  const result: { [key: string]: CallableFn } = {};
  structs.forEach((struct) => {
    result[struct.name] = _buildSubroute(struct.name, struct.options, struct.subbuilder, config);
  });

  return result as unknown as DefineRoutesResult;
};

const _getBuilder = <DefineRoutesResult>(): RouteBuilder<DefineRoutesResult> => {
  const structs: Struct<DefineRoutesResult>[] = [];

  const define: FnResourcesDefiner<DefineRoutesResult> = (name, options = {}) => {
    const struct: Struct<DefineRoutesResult> = {
      name,
      options,
      subbuilder: null,
    };
    structs.push(struct);

    const result: FnResourcesDefinerResult<DefineRoutesResult> = {
      subroutes: (subroutesBuilder) => {
        const subbuilder = _getBuilder<DefineRoutesResult>();
        subroutesBuilder(subbuilder);
        struct.subbuilder = subbuilder;
      },
    };

    return result;
  };

  return {
    define,
    structs,
  };
};

export const defaultConfig: Config = {
  notation: 'camelCase',
};

export function define<DefineRoutesResult>(definer: FnDefiner, config: Config = defaultConfig): DefineRoutesResult {
  const builder = _getBuilder<DefineRoutesResult>();

  definer(builder);

  return _convertStructsToRoutes<DefineRoutesResult>(builder.structs, config);
}
