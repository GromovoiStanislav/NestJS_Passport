import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
//import { ConfigService } from '@nestjs/config';
import { basicConstants } from '../constants';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(
    //private readonly configService: ConfigService,
  ) {
    super({
      passReqToCallback: true
    });
  }

  public validate = async (req, username, password): Promise<boolean> => {
    if (
      // this.configService.get<string>('HTTP_BASIC_USER') === username &&
      // this.configService.get<string>('HTTP_BASIC_PASS') === password
      basicConstants.username === username &&
      basicConstants.password === password
    ) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
