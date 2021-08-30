import { idTypesEnum } from '../enums/id-types.enums';

export class UserEntity {
  id: string;
  id_type: idTypesEnum;
  password: string;
}
