declare module "@nestjs/throttler" {
  import { DynamicModule, ModuleMetadata } from "@nestjs/common";
  import { Provider, Type } from "@nestjs/common/interfaces";

  export interface ThrottlerModuleOptions {
    throttlers: {
      ttl: number;
      limit: number;
    }[];
  }

  export interface ThrottlerOptionsFactory {
    createThrottlerOptions():
      | Promise<ThrottlerModuleOptions>
      | ThrottlerModuleOptions;
  }

  export interface ThrottlerAsyncOptions
    extends Pick<ModuleMetadata, "imports"> {
    useExisting?: Type<ThrottlerOptionsFactory>;
    useClass?: Type<ThrottlerOptionsFactory>;
    useFactory?: (
      ...args: any[]
    ) => Promise<ThrottlerModuleOptions> | ThrottlerModuleOptions;
    inject?: any[];
    extraProviders?: Provider[];
  }

  export class ThrottlerModule {
    static forRoot(options: ThrottlerModuleOptions): DynamicModule;
    static forRootAsync(options: ThrottlerAsyncOptions): DynamicModule;
  }

  export class ThrottlerGuard {}
}
