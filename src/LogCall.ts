import debug from 'debug';

export const log = debug('CCashClient');

export function LogCall(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    log(`call ${propertyKey}`);
    return original.apply(this, args);
  };
}
