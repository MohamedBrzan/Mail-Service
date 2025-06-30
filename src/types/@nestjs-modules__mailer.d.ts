declare module "@nestjs-modules/mailer" {
  import {
    DynamicModule,
    ModuleMetadata,
    Provider,
    Type,
  } from "@nestjs/common";

  export interface MailerOptions {
    transport: any;
    defaults?: { from?: string };
    template?: {
      dir: string;
      adapter: any;
      options?: Record<string, any>;
    };
  }

  export interface MailerOptionsFactory {
    createMailerOptions(): Promise<MailerOptions> | MailerOptions;
  }

  export interface MailerAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    useExisting?: Type<MailerOptionsFactory>;
    useClass?: Type<MailerOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<MailerOptions> | MailerOptions;
    inject?: any[];
    extraProviders?: Provider[];
  }

  export class MailerModule {
    static forRoot(options: MailerOptions): DynamicModule;
    static forRootAsync(options: MailerAsyncOptions): DynamicModule;
  }

  export interface SendMailOptions {
    to: string | undefined;
    subject: string;
    template?: string;
    context?: Record<string, any>;
    html?: string;
    text?: string;
    from?: string;
  }

  export class MailerService {
    sendMail(options: SendMailOptions): Promise<any>;
  }
}
