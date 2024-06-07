import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    handleRequest(err, user, info) {
        if (err || !user) {
        throw err || new Error(info.message);
        }
        return user;
    }
    
    canActivate(context) {
        return super.canActivate(context);
    }
    
    getRequest(context) {
        return super.getRequest(context);
    }
}
