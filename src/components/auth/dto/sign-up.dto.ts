import { IsNotEmpty, IsString, Matches } from 'class-validator';

export default class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @Matches(
    /(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})|([+]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4}))/,
    { message: 'id must be a phone number or email' },
  )
  id: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  password: string;
}
