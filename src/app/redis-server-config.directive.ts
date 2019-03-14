import { Directive } from '@angular/core';
import { AbstractControl, Validator, ValidatorFn, NG_VALIDATORS } from '@angular/forms';

import { AppElectronService } from './app-electron.service';
import { Config } from '../../electron/config';

export function nameInUseValidator(config: Config): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return config.redisConfig.find(redisConfig => redisConfig.name === control.value)
      ? { 'nameInUse': { value: control.value } }
      : null;
  };
}

@Directive({
  selector: '[appRedisServerConfig]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RedisServerConfigDirective, multi: true }]
})
export class RedisServerConfigDirective implements Validator {

  //#region Lifecycle

  constructor(private electron: AppElectronService) {
  }

  //#endregion

  validate(control: AbstractControl): { [key: string]: any } | null {
    return nameInUseValidator(this.electron.config)(control);
  }

}
