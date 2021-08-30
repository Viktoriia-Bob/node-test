import { idTypesEnum } from '../enums/id-types.enums';

export interface IUser {
  id: string;
  id_type: idTypesEnum;
  password: string;
}
